import React, { useState, useEffect, ReactNode } from 'react';
import { match } from 'path-to-regexp';
import { EVENTS } from './constants';
import { getCurrentPath } from './utils';

type RouteParams = Record<string, string>;
export type RoutedPageProps = { routeParams: RouteParams };

type Props = {
  paths?: {
    path: string;
    component: React.FunctionComponent<RoutedPageProps>;
  }[];
  defaultComponent?: ReactNode;
};

export const Router = ({
  children,
  paths,
  defaultComponent,
}: React.PropsWithChildren<Props>) => {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onNavigation = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onNavigation);
    window.addEventListener(EVENTS.POPSTATE, onNavigation);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onNavigation);
      window.removeEventListener(EVENTS.POPSTATE, onNavigation);
    };
  }, []);

  if (!paths && !children) throw new Error('No paths or children provided');

  let routeParams: RouteParams = {};

  const pathsFromChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<RoutedPageProps>(child)) return null;
    return child.props;
  })?.filter(Boolean) as unknown as Props['paths'] | undefined;

  const allPaths =
    (pathsFromChildren ? [...(paths ?? []), ...pathsFromChildren] : paths) ??
    [];

  const Page = allPaths.find(({ path }) => {
    if (path === currentPath) return true;

    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matchResult = matcherUrl(currentPath);
    if (!matchResult) return false;
    routeParams = matchResult.params as Record<string, string>;
    return true;
  })?.component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : defaultComponent ? (
    <> {defaultComponent}</>
  ) : null;
}
