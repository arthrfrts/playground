import os
import re
import sys
import subprocess
import json
from github import Github
from datetime import datetime
from slugify import slugify

sys.path.append('./reader')

def extract_url(body):
    url_pattern = re.compile(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
    urls = url_pattern.findall(body)
    return urls[0] if urls else None

def create_filename(title):
    today = datetime.now().strftime('%Y-%m-%d')
    slug = slugify(title)
    return f"{today}-{slug}.md"

def parse_article(url):
    parser_result = subprocess.run(['postlight-parser', url],
                                   capture_output=True, text=True)
    print("postlight-parser stdout:")
    print(parser_result.stdout)
    print("postlight-parser stderr:")
    print(parser_result.stderr)
    if parser_result.returncode != 0:
        print(f"postlight-parser exited with code {parser_result.returncode}")
        return None

    parser_data = json.loads(parser_result.stdout)

    reader_result = subprocess.run(['python', './reader/reader.py', '-', '--format=md'],
                                   input=parser_result.stdout,
                                   capture_output=True, text=True)
    print("reader.py stdout:")
    print(reader_result.stdout)
    print("reader.py stderr:")
    print(reader_result.stderr)
    if reader_result.returncode != 0:
        print(f"reader.py exited with code {reader_result.returncode}")
        return None

    title = parser_data.get('title', '')
    author = parser_data.get('author', '')
    date_published = parser_data.get('date_published')


    if date_published is None:
        date = datetime.now().strftime('%Y-%m-%d')
    else:
        try:
            parsed_date = datetime.fromisoformat(date_published.replace('Z', '+00:00'))
            date = parsed_date.strftime('%Y-%m-%d')
        except ValueError:
            date = datetime.now().strftime('%Y-%m-%d')

    url = parser_data.get('url', '')

    front_matter = f"""---
title: {title}
author: {author}
date: {date}
canonical_url: {url}
---

"""

    content = reader_result.stdout

    content = re.sub(r'^(date|author).*\n|^#.*\n', '', content, flags=re.MULTILINE)

    full_content = front_matter + content

    return {'content': full_content, 'title': title}


def main():
    github_token = os.environ['GITHUB_TOKEN']
    repo_name = os.environ['GITHUB_REPOSITORY']

    with open(os.environ['GITHUB_EVENT_PATH'], 'r') as event_file:
        event = json.load(event_file)

    issue_number = event['issue']['number']
    issue_body = event['issue']['body']

    g = Github(github_token)
    repo = g.get_repo(repo_name)

    url = extract_url(issue_body)
    if not url:
        print("No URL found in the issue body.")
        sys.exit(1)

    article_data = parse_article(url)
    if not article_data:
        print("Failed to parse article")
        sys.exit(1)

    markdown_content = article_data['content']
    title = article_data['title']
    filename = create_filename(title)
    filepath = os.path.join('_reading-list', filename)  # Novo caminho do arquivo

    branch_name = f"article/{filename.replace('.md', '')}"
    base_branch = repo.default_branch
    try:
        repo.create_git_ref(f"refs/heads/{branch_name}", repo.get_branch(base_branch).commit.sha)

        try:
            repo.get_contents("_reading-list", ref=branch_name)
        except:
            repo.create_file("_reading-list/.gitkeep", "Create _reading-list folder", "", branch=branch_name)

        repo.create_file(
            filepath,
            f"Add article: {title}",
            markdown_content,
            branch=branch_name
        )

        pr = repo.create_pull(
            title=f"Add article: {title}",
            body=f"Closes #{issue_number}",
            head=branch_name,
            base=base_branch
        )

        print(f"Pull request created: {pr.html_url}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
