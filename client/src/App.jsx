
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import SignupPage from './pages/Signup';
import TrackerPage from './components/NewExpensePost'
import RootLayoutWrapper from './pages/RootLayoutWrapper'
import ExpenseRecord from './pages/ExpenseRecord';
import ExpensePostDetails from './pages/ExpensePostDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayoutWrapper />} >
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/tracker" element={<TrackerPage />}/>
        <Route path="/expensehistory" element={<ExpenseRecord />}>
          <Route path="/expensehistory/:expensePostId" element={<ExpensePostDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
