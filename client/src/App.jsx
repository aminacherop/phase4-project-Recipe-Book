import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import EditRecipeForm from './components/EditRecipeForm';
// import CreateRecipeForm from './components/CreateRecipeForm';
// import SignupForm from './components/SignupForm';
// import LoginForm from './components/LoginForm';
// import FavoriteRecipesList from './components/FavoriteRecipesList';

function App() {
  return (
    <>
     <div>
      <h1>Hello from App!</h1>
    </div>
    
      <NavBar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
        {/* <Route path="/recipes/new" element={<CreateRecipeForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/my-favorites" element={<FavoriteRecipesList />} />  */}
      </Routes>
    </>
    
  );
}

export default App;
