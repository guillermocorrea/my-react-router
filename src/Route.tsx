import { RoutedPageProps } from './Router';

export type RouteProps = {
  path: string;
  component: React.FunctionComponent<RoutedPageProps>;
};

export const Route = (_props: RouteProps) => {
  return null;
}
