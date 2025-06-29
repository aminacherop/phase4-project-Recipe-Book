
import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiClient } from '../utils/api';

const AppContext = createContext();

export function AppProvider({ children }) {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  
  useEffect(() => {
    initializeApp();
  }, []);


  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const initializeApp = async () => {
    try {
      setLoading(true);
      setError(null);
      
      
      const authResponse = await apiClient.checkSession();
      if (authResponse.data?.logged_in && authResponse.data?.user) {
        setUser(authResponse.data.user);
        setIsAuthenticated(true);
      
        await loadUserData(authResponse.data.user.id);
      }
      
      
      await Promise.all([
        loadRecipes(),
        loadCategories()
      ]);
      
    } catch (err) {
      console.error('Failed to initialize app:', err);
      setError('Failed to load application data');
    } finally {
      setLoading(false);
    }
  };

  const loadRecipes = async () => {
    try {
      const response = await apiClient.getRecipes();
      setRecipes(response.data || []);
    } catch (err) {
      console.error('Failed to load recipes:', err);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await apiClient.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadUserData = async (userId) => {
    try {
      const response = await apiClient.getUserFavorites(userId);
      setFavorites(response.data || []);
    } catch (err) {
      console.error('Failed to load user favorites:', err);
    }
  };


  const login = async (credentials) => {
    try {
      const response = await apiClient.login(credentials);
      if (response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        await loadUserData(response.data.user.id);
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await apiClient.signup(userData);
      if (response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        await loadUserData(response.data.user.id);
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
      setUser(null);
      setIsAuthenticated(false);
      setFavorites([]);
      return { success: true };
    } catch (err) {
      console.error('Logout error:', err);
    
      setUser(null);
      setIsAuthenticated(false);
      setFavorites([]);
      return { success: true };
    }
  };

  const addRecipe = async (recipeData) => {
    try {
      const response = await apiClient.createRecipe(recipeData);
      if (response.data) {
        await loadRecipes(); 
        return { success: true, recipe: response.data };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateRecipe = async (id, recipeData) => {
    try {
      const response = await apiClient.updateRecipe(id, recipeData);
      if (response.data) {
        await loadRecipes(); 
        return { success: true, recipe: response.data };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await apiClient.deleteRecipe(id);
      await loadRecipes(); 
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };


  const toggleFavorite = async (recipeId) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please log in to favorite recipes' };
    }

    const isFavorited = favorites.some(fav => fav.recipe_id === recipeId);
    
    
    if (isFavorited) {
      setFavorites(prev => prev.filter(fav => fav.recipe_id !== recipeId));
    } else {
      setFavorites(prev => [...prev, { recipe_id: recipeId, user_id: user.id }]);
    }

    try {
      if (isFavorited) {
        const favorite = favorites.find(fav => fav.recipe_id === recipeId);
        if (favorite) {
          await apiClient.removeFavorite(favorite.id);
        }
      } else {
        await apiClient.addFavorite(recipeId);
      }
      
      
      await loadUserData(user.id);
      return { success: true };
    } catch (err) {
      
      if (isFavorited) {
        setFavorites(prev => [...prev, { recipe_id: recipeId, user_id: user.id }]);
      } else {
        setFavorites(prev => prev.filter(fav => fav.recipe_id !== recipeId));
      }
      return { success: false, error: err.message };
    }
  };


  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isRecipeFavorited = (recipeId) => {
    return favorites.some(fav => fav.recipe_id === recipeId);
  };

  const getFavoriteRecipes = () => {
    return recipes.filter(recipe => isRecipeFavorited(recipe.id));
  };

  const getUserRecipes = () => {
    if (!user) return [];
    return recipes.filter(recipe => recipe.user_id === user.id);
  };

  const contextValue = {
    
    user,
    isAuthenticated,
    recipes,
    favorites,
    categories,
    loading,
    error,
    theme,
    
  
    login,
    signup,
    logout,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    toggleTheme,
    
  
    isRecipeFavorited,
    getFavoriteRecipes,
    getUserRecipes,
    refreshData: initializeApp
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
