
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/Home'
import AboutPage from './pages/About'
import SignupPage from './pages/Signup';
import TrackerPage from './components/NewExpenseTracker'
import RootLayoutWrapper from './pages/RootLayoutWrapper'
import ExpenseRecord from './pages/ExpenseRecord';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutWrapper />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/tracker', element: <TrackerPage /> },
      { path: '/expensehistory', element: <ExpenseRecord/>,}
    ]
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
