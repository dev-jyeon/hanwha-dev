import config from './routes.prod.json';
import dev_config from './routes.dev.json';
import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const mode = import.meta.env.VITE_APP_ENV;
const modules = import.meta.glob('/src/pages/**/*.tsx');

interface RouteConfig {
  url: string;
  path: string;
  asFolder?: boolean;
  children?: RouteConfig[];
}

const configs: Record<string, RouteConfig[]> = {
  _local: [...config, ...dev_config],
};

const convertRoutes = (routes: RouteConfig[], parentRouteUrl = '/'): RouteObject[] =>
  routes.flatMap((route) => {
    const _route_url = `${parentRouteUrl}${route.url}`;
    let _file_path = `/src/app${route.path}.tsx`;
    if (route.asFolder) {
      _file_path = _file_path.replace(/\.tsx$/, 'index.tsx');
    }
    const importer = modules[_file_path];
    if (!importer) {
      console.error('모듈을 못찾겠음');
      return [];
    }

    const Component = lazy(importer as any);
    const _route = { path: _route_url, element: <Component /> };
    const _children = route.children ? convertRoutes(route.children, _route_url) : [];

    return [_route, ..._children];
  });
