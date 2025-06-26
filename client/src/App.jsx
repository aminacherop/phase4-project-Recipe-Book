import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import EditRecipeForm from './components/EditRecipeForm';
import CreateRecipeForm from './components/CreateRecipeForm';
import AuthPage from './components/AuthPage';
import FavoriteRecipesList from './components/FavoriteRecipesList';
// import SignupForm from './components/SignupForm';
// import LoginForm from './components/LoginForm';
import { useTheme } from './ThemeContext';

// Placeholder components for missing pages
const SignupForm = () => <div style={{padding: '2rem'}}><h2>Signup Page (Coming Soon)</h2></div>;
const LoginForm = () => <div style={{padding: '2rem'}}><h2>Login Page (Coming Soon)</h2></div>;

function App() {
  const { theme } = useTheme();
  const appBg = {
    minHeight: '100vh',
    width: '100vw',
    background: theme === 'dark' ? '#181926' : '#f8f8fa',
    transition: 'background 0.3s',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  };
  const contentStyle = {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    alignItems: 'stretch',
  };
  return (
    <div style={appBg}>
      <NavBar />
      <div style={contentStyle}>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
          <Route path="/recipes/new" element={<CreateRecipeForm />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/my-favorites" element={<FavoriteRecipesList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
