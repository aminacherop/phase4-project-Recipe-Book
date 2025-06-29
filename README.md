# Recipe Book Application

A full-stack web application for discovering, creating, and managing recipes with social features.

## Features

- 👤 **User Authentication** - Sign up, login, logout
- 📝 **Recipe Management** - Create, edit, delete recipes
- ❤️ **Favorites** - Save recipes you love
- 💬 **Comments & Ratings** - Rate and review recipes
- 🌙 **Dark/Light Theme** - Toggle between themes
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

**Frontend:** React, React Router, Vite, Formik  
**Backend:** Flask, SQLAlchemy, Flask-Migrate  
**Database:** SQLite

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+

### Installation

1. **Clone and setup backend**
   ```bash
   git clone <https://github.com/aminacherop/phase4-project-Recipe-Book>
   cd recipe-book/server
   python -m venv venv
   source venv/bin/activate  
   Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Setup database**
   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   python seed.py
   ```

3. **Setup frontend**
   ```bash
   cd ../client
   npm install
   ```

### Run the Application

1. **Start backend** (in `/server`)
   ```bash
   python app.py
   # Runs on http://localhost:5000
   ```

2. **Start frontend** (in `/client`)
   ```bash
   npm run dev
   # Runs on http://localhost:5173
   ```

## Test Accounts

- **Username:** `amina` **Password:** `123456`
- **Username:** `chef_mike` **Password:** `password123`

## API Endpoints

### Authentication
- `POST /signup` - Create account
- `POST /login` - Sign in
- `DELETE /logout` - Sign out
- `GET /check_session` - Check login status

### Recipes
- `GET /recipes` - Get all recipes
- `GET /recipes/{id}` - Get recipe details
- `POST /recipes` 🔒 - Create recipe
- `PATCH /recipes/{id}` 🔒 - Update recipe
- `DELETE /recipes/{id}` 🔒 - Delete recipe

### Favorites
- `POST /favorite_recipes` 🔒 - Add to favorites
- `DELETE /favorite_recipes/{id}` 🔒 - Remove from favorites
- `GET /users/{user_id}/favorite_recipes` - Get user favorites

### Comments
- `POST /comments` 🔒 - Add comment/rating

🔒 = Requires authentication

## Database Schema

- **Users** - id, username, email, password_hash
- **Recipes** - id, name, description, ingredients, instructions, prep_time, cook_time, image_url, user_id, category_id
- **Comments** - id, text, rating, created_at, user_id, recipe_id
- **FavoriteRecipes** - id, user_id, recipe_id
- **Categories** - id, name

## License

MIT License - feel free to use and modify

