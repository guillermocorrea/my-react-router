# my-react-router

Sample custom react router in typescript.

## Install

```bash
npm install my-react-router
```

## Usage

```tsx
import { Router, Route, Link } from "my-react-router";
import React from "react";
import type { RoutedPageProps } from "my-react-router/lib/Router";

function Products() {
  return (
    <div>
      <h1>Products</h1>
      <Link href="/products/1">Product 1</Link>
    </div>
  );
}

const ProductDetail: React.FunctionComponent<RoutedPageProps> = ({
  routeParams: { id }
}) => {
  return <h1>Product {id}</h1>;
};

export default function App() {
  return (
    <div>
      <h1>Hello my-react-router</h1>
      <nav>
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          <Link href="/about">About</Link>
        </div>
        <div>
          <Link href="/products">Products</Link>
        </div>
      </nav>
      <Router>
        <Route path="/" component={() => <h2>Home</h2>} />
        <Route path="/about" component={() => <h2>About</h2>} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetail} />
      </Router>
    </div>
  );
}

```

## Online demo

https://codesandbox.io/s/my-react-router-demo-js-4j3rdl?file=/src/App.tsx