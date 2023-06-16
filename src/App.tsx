import {
  Suspense,
  ComponentType,
  LazyExoticComponent,
  lazy,
  useEffect,
} from 'react';
import './App.css';
import { Router } from './Router';
import { Route } from './Route';
import React from 'react';

function lazyLoadWithPrefetch<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  const Component = lazy(factory) as LazyExoticComponent<T> & {
    preload: () => void;
  };
  Component.preload = factory;
  return Component;
}

const About = lazyLoadWithPrefetch(() =>
  import('./pages/About').then((module) => ({
    default: module.default,
  }))
);

const Home = lazyLoadWithPrefetch(() => import('./pages/Home'));
const NotFound = lazyLoadWithPrefetch(() => import('./pages/NotFound'));
const Search = lazyLoadWithPrefetch(() => import('./pages/Search'));

const paths = [
  { path: '/', component: Home },
  { path: '/:lang/about', component: About },
  {
    path: '/search/:query',
    component: Search,
  },
];

function App() {
  useEffect(() => {
    Home.preload();
    Search.preload();
    NotFound.preload();
    About.preload();
  }, []);

  return (
    <main>
      <Suspense fallback={<div>Loading...........................</div>}>
        <Router paths={paths} defaultComponent={<NotFound />}>
          <Route path="/about" component={About} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
