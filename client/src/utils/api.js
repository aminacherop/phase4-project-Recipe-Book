// src/utils/api.js
const API_BASE = 'http://localhost:5000';

class APIClient {
  async request(endpoint, options = {}) {
    const config = {
      credentials: 'include', // Important for session cookies
      headers: { 
        'Content-Type': 'application/json',
        ...options.headers 
      },
      ...options
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // HTTP Methods
  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  patch(endpoint, body) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // Auth endpoints
  signup(userData) {
    return this.post('/signup', userData);
  }

  login(credentials) {
    return this.post('/login', credentials);
  }

  logout() {
    return this.delete('/logout');
  }

  checkSession() {
    return this.get('/check_session');
  }

  // Recipe endpoints
  getRecipes() {
    return this.get('/recipes');
  }

  getRecipe(id) {
    return this.get(`/recipes/${id}`);
  }

  createRecipe(recipeData) {
    return this.post('/recipes', recipeData);
  }

  updateRecipe(id, recipeData) {
    return this.patch(`/recipes/${id}`, recipeData);
  }

  deleteRecipe(id) {
    return this.delete(`/recipes/${id}`);
  }

  getUserRecipes(userId) {
    return this.get(`/users/${userId}/recipes`);
  }

  // Favorite endpoints
  addFavorite(recipeId) {
    return this.post('/favorite_recipes', { recipe_id: recipeId });
  }

  removeFavorite(favoriteId) {
    return this.delete(`/favorite_recipes/${favoriteId}`);
  }

  getUserFavorites(userId) {
    return this.get(`/users/${userId}/favorite_recipes`);
  }

  // Comment endpoints
  addComment(commentData) {
    return this.post('/comments', commentData);
  }

  // Category endpoints
  getCategories() {
    return this.get('/categories');
  }
}

export const apiClient = new APIClient();
export default apiClient;
