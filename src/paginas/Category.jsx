import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { fetchData } from '../api/api'
import '../assets/css/blog.css'
import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList/PostList'
import ChildCategory from './ChildCategory'

const Category = () => {
  const { id } = useParams();
  const { url, path } = useRouteMatch();
  const [childCategories, setChildCategories] = useState([]);

  useEffect(() => {
    fetchData(`/categorias/${id}`, (category) => {
      setChildCategories(category.subcategorias);
    });
  }, [id]);

  return (
    <>
      <div className="container">
        <h2 className="titulo-pagina">Pet Notícias</h2>
      </div>

      <CategoryList />
      
      <ul className="lista-categorias container flex">
        {
          childCategories.map(childCategory => (
            <li className={`lista-categorias__categoria lista-categorias__categoria--${id}`} key={childCategory}>
              <Link to={`${url}/${childCategory}`}>
                {childCategory}
              </Link>
            </li>
          ))
        }
        
      </ul>
      <Switch>
        <Route exact path={`${path}/`}>
          <PostList url={`/posts?categoria=${id}`} />
        </Route>
        <Route path={`${path}/:subcategoria`}>
          <ChildCategory />
        </Route>
      </Switch>
    </>
  );
}

export default Category;