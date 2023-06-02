import { RoutedPageProps } from '../Router';

export default function Search({ routeParams: { query } }: RoutedPageProps) {
  return (
    <>
      <h1>Search</h1>
      <p>Search results for: {query}</p>
    </>
  );
}
