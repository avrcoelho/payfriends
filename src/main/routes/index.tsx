import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactDomRoutes,
} from 'react-router-dom';

import { RoutePaths } from '@/presentation/constants/RoutePaths';
import { Route as CustomRoute } from './Route';
import { MakeSignIn } from '../factories/pages/SignIn';

export const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ReactDomRoutes>
        <Route
          path={RoutePaths.SignIn}
          element={<CustomRoute element={<MakeSignIn />} />}
        />
        <Route path="*" element={<Navigate replace to={RoutePaths.SignIn} />} />
      </ReactDomRoutes>
    </BrowserRouter>
  );
};
