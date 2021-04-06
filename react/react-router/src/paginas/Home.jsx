import React from 'react'
import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList/PostList'

const Home = () => {

  return (
    <main>
      <div className="container">
        <h2 className="titulo-pagina">Pet notícias</h2>
      </div>

    <CategoryList />
    <PostList url={'/posts'} />
    </main>
  )
}

export default Home
