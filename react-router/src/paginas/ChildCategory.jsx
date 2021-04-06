import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList/PostList';

const ChildCategory = () => {
  const { subcategoria } = useParams();
  return (
    <PostList url={`/posts?subcategoria=${subcategoria}`} />
  );
}

export default ChildCategory;