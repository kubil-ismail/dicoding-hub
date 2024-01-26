import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './theme';
import {
  Dashboard,
  ThreadDetail,
  Login,
  Register,
  NotFound,
  Default,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/dashboard/:id',
    element: <ThreadDetail />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Default />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
