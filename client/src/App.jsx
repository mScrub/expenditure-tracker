
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/Home'
import AboutPage from './pages/About'
import SignupPage from './pages/Signup';
import TrackerPage from './components/ExpenseTracker'
import RootLayoutWrapper from './pages/RootLayoutWrapper'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutWrapper />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/tracker', element: <TrackerPage /> }]
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
