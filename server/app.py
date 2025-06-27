from flask import Flask, request, jsonify, session
from flask_cors import CORS
<<<<<<< HEAD
from .extensions import db, migrate, bcrypt
from .config import Config
from .models import Recipe, User, Category, Comment, FavoriteRecipe
=======
from extensions import db, migrate, bcrypt
from config import Config
from models import Recipe, User, Category, Comment, FavoriteRecipe
from functools import wraps
>>>>>>> main

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
<<<<<<< HEAD
    # Add secret key
    app.secret_key = 'your-secret-key-here-change-in-production'

    CORS(app)
=======
    # Initialize extensions
    CORS(app, supports_credentials=True)
>>>>>>> main
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

<<<<<<< HEAD
    # Recipe Routes

=======
    # Helper functions
    def success_response(data=None, message=None, status=200):
        response = {}
        if data is not None:
            response['data'] = data
        if message:
            response['message'] = message
        return jsonify(response), status

    def error_response(error, status=400):
        return jsonify({'error': error}), status

    # Authentication decorator
    def require_auth(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user_id' not in session:
                return error_response('Authentication required', 401)
            return f(*args, **kwargs)
        return decorated_function

    # AUTH ROUTES
    @app.route('/signup', methods=['POST'])
    def signup():
        try:
            data = request.get_json()
            if not data:
                return error_response('No data provided')

            for field in ['username', 'email', 'password']:
                if not data.get(field):
                    return error_response(f'{field} is required')

            if User.query.filter_by(username=data['username']).first():
                return error_response('Username already exists')
            if User.query.filter_by(email=data['email']).first():
                return error_response('Email already exists')

            user = User(username=data['username'], email=data['email'])
            user.set_password(data['password'])
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return success_response(
                data={'user': user.to_dict(only=('id', 'username', 'email'))},
                message='User created successfully',
                status=201
            )
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), 500)

    @app.route('/login', methods=['POST'])
    def login():
        try:
            data = request.get_json()
            if not data:
                return error_response('No data provided')

            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return error_response('Username and password are required')

            user = User.query.filter_by(username=username).first()
            if not user or not user.check_password(password):
                return error_response('Invalid username or password', 401)

            session['user_id'] = user.id

            return success_response(
                data={'user': user.to_dict(only=('id', 'username', 'email'))},
                message='Login successful'
            )
        except Exception as e:
            return error_response(str(e), 500)

    @app.route('/logout', methods=['DELETE'])
    def logout():
        try:
            if 'user_id' in session:
                session.pop('user_id')
                return success_response(message='Logout successful')
            return error_response('Not logged in', 401)
        except Exception as e:
            return error_response(str(e), 500)

    @app.route('/check_session', methods=['GET'])
    def check_session():
        try:
            user_id = session.get('user_id')
            if user_id:
                user = User.query.get(user_id)
                if user:
                    return success_response(data={
                        'logged_in': True,
                        'user': user.to_dict(only=('id', 'username', 'email'))
                    })
                session.pop('user_id', None)
            
            return success_response(data={'logged_in': False})
        except Exception as e:
            return error_response(str(e), 500)

    # RECIPE ROUTES
>>>>>>> main
    @app.route('/recipes', methods=['GET'])
    def get_recipes():
        try:
            recipes = Recipe.query.all()
<<<<<<< HEAD
            # Use the built-in to_dict() from SerializerMixin
            return jsonify([recipe.to_dict(only=('id', 'name', 'description', 'ingredients', 'instructions', 'prep_time', 'cook_time', 'image_url', 'user_id', 'category_id')) for recipe in recipes]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/recipes/<int:id>', methods=['GET'])
    def get_recipe(id):
        try:
            recipe = Recipe.query.get(id)
            if not recipe:
                return jsonify({'error': 'Recipe not found'}), 404
            # Include more details for single recipe view
            return jsonify(recipe.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    
    @app.route('/users/<int:user_id>/recipes', methods=['GET'])
    def get_user_recipes(user_id):
        try:
            user = User.query.get(user_id)
            if not user:
               return jsonify({'error': 'User not found'}), 404

            recipes = Recipe.query.filter_by(user_id=user_id).all()
            return jsonify([recipe.to_dict() for recipe in recipes]), 200

        except Exception as e:
           return jsonify({'error': str(e)}), 500

        

    @app.route('/recipes/<int:id>', methods=['PATCH'])
    def update_recipe(id):
        try:
            recipe = Recipe.query.get(id)
            if not recipe:
                return jsonify({'error': 'Recipe not found'}), 404

            data = request.get_json()
            if not data:
                return jsonify({'error': 'No data provided'}), 400

            # Update fields
            for field in ['name', 'description', 'ingredients', 'instructions', 'prep_time', 'cook_time', 'image_url']:
                if field in data:
                    setattr(recipe, field, data[field])

            if 'category_id' in data:
                category = Category.query.get(data['category_id'])
                if not category:
                    return jsonify({'error': 'Category not found'}), 400
                recipe.category_id = data['category_id']

            db.session.commit()
            return jsonify(recipe.to_dict()), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @app.route('/recipes/<int:id>', methods=['DELETE'])
    def delete_recipe(id):
        try:
            recipe = Recipe.query.get(id)
            if not recipe:
                return jsonify({'error': 'Recipe not found'}), 404

            db.session.delete(recipe)
            db.session.commit()
            return jsonify({'message': 'Recipe deleted successfully'}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @app.route('/recipes', methods=['POST'])
    def create_recipe():
        try:
            if 'user_id' not in session:
                return jsonify({'error': 'Authentication required'}), 401

            data = request.get_json()
            if not data or not data.get('name'):
                return jsonify({'error': 'Recipe name is required'}), 400

            if 'category_id' in data:
                category = Category.query.get(data['category_id'])
                if not category:
                    return jsonify({'error': 'Category not found'}), 400
=======
            recipes_data = []
            
            for recipe in recipes:
                recipe_dict = recipe.to_dict(only=(
                    'id', 'name', 'description', 'ingredients', 'instructions', 
                    'prep_time', 'cook_time', 'image_url', 'user_id', 'category_id'
                ))
                recipes_data.append(recipe_dict)
            
            return success_response(data=recipes_data)
        except Exception as e:
            return error_response(str(e), 500)

    @app.route('/recipes/<int:recipe_id>', methods=['GET'])
    def get_recipe(recipe_id):
        try:
            recipe = Recipe.query.get(recipe_id)
            if not recipe:
                return error_response('Recipe not found', 404)
            
            recipe_data = recipe.to_dict()
            return success_response(data=recipe_data)
        except Exception as e:
            return error_response(str(e), 500)

    @app.route('/recipes', methods=['POST'])
    @require_auth
    def create_recipe():
        try:
            data = request.get_json()
            if not data:
                return error_response('No data provided')

            if not data.get('name'):
                return error_response('Recipe name is required')

            if 'category_id' in data and data['category_id']:
                category = Category.query.get(data['category_id'])
                if not category:
                    return error_response('Category not found')
>>>>>>> main

            recipe = Recipe(
                name=data['name'],
                description=data.get('description', ''),
                ingredients=data.get('ingredients', ''),
                instructions=data.get('instructions', ''),
                prep_time=data.get('prep_time'),
                cook_time=data.get('cook_time'),
                image_url=data.get('image_url', ''),
                user_id=session['user_id'],
                category_id=data.get('category_id')
            )

            db.session.add(recipe)
            db.session.commit()
<<<<<<< HEAD
            return jsonify(recipe.to_dict()), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    # Auth Routes

    @app.route('/signup', methods=['POST'])
    def signup():
        try:
            data = request.get_json()
            if not data:
                return jsonify({'error': 'No data provided'}), 400

            for field in ['username', 'email', 'password']:
                if not data.get(field):
                    return jsonify({'error': f'{field} is required'}), 400

            if User.query.filter_by(username=data['username']).first():
                return jsonify({'error': 'Username already exists'}), 400
            if User.query.filter_by(email=data['email']).first():
                return jsonify({'error': 'Email already exists'}), 400

            user = User(
                username=data['username'],
                email=data['email']
            )
            user.set_password(data['password'])

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return jsonify({
                'message': 'User created successfully',
                'user': user.to_dict(only=('id', 'username', 'email'))
            }), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @app.route('/login', methods=['POST'])
    def login():
        try:
            data = request.get_json()
            if not data:
                return jsonify({'error': 'No data provided'}), 400

            user = User.query.filter_by(username=data['username']).first()
            if not user or not user.check_password(data['password']):
                return jsonify({'error': 'Invalid username or password'}), 401

            session['user_id'] = user.id

            return jsonify({
                'message': 'Login successful',
                'user': user.to_dict(only=('id', 'username', 'email'))
            }), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/logout', methods=['DELETE'])
    def logout():
        try:
            if 'user_id' in session:
                session.pop('user_id')
                return jsonify({'message': 'Logout successful'}), 200
            return jsonify({'error': 'Not logged in'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/check_session', methods=['GET'])
    def check_session():
        try:
            user_id = session.get('user_id')
            if user_id:
                user = User.query.get(user_id)
                if user:
                    return jsonify({
                        'logged_in': True,
                        'user': user.to_dict(only=('id', 'username', 'email'))
                    }), 200
                session.pop('user_id', None)
            return jsonify({'logged_in': False}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Comment Routes 

    @app.route('/comments', methods=['POST'])
    def create_comment():
        try:
            if 'user_id' not in session:
                return jsonify({'error': 'Authentication required'}), 401

            data = request.get_json()
            if not data:
                return jsonify({'error': 'No data provided'}), 400

            for field in ['text', 'recipe_id']:
                if not data.get(field):
                    return jsonify({'error': f'{field} is required'}), 400

            recipe = Recipe.query.get(data['recipe_id'])
            if not recipe:
                return jsonify({'error': 'Recipe not found'}), 404

            rating = data.get('rating')
            if rating is not None and (not isinstance(rating, int) or not (1 <= rating <= 5)):
                return jsonify({'error': 'Rating must be an integer between 1 and 5'}), 400
=======

            return success_response(
                data=recipe.to_dict(),
                message='Recipe created successfully',
                status=201
            )
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), 500)

    @app.route('/recipes/<int:recipe_id>', methods=['PATCH'])
    @require_auth
    def update_recipe(recipe_id):
        try:
            recipe = Recipe.query.get(recipe_id)
            if not recipe:
                return error_response('Recipe not found', 404)

            if recipe.user_id != session['user_id']:
                return error_response('You can only edit your own recipes', 403)

            data = request.get_json()
            if not data:
                return error_response('No data provided')

            updateable_fields = ['name', 'description', 'ingredients', 'instructions', 
                               'prep_time', 'cook_time', 'image_url', 'category_id']
            
            for field in updateable_fields:
                if field in data:
                    setattr(recipe, field, data[field])

            db.session.commit()
            return success_response(
                data=recipe.to_dict(),
                message='Recipe updated successfully'
            )
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), 500)

    @app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
    @require_auth
    def delete_recipe(recipe_id):
        try:
            recipe = Recipe.query.get(recipe_id)
            if not recipe:
                return error_response('Recipe not found', 404)

            if recipe.user_id != session['user_id']:
                return error_response('You can only delete your own recipes', 403)

            db.session.delete(recipe)
            db.session.commit()
            
            return success_response(message='Recipe deleted successfully')
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), 500)

    @app.route('/users/<int:user_id>/recipes', methods=['GET'])
    def get_user_recipes(user_id):
        try:
            user = User.query.get(user_id)
            if not user:
                return error_response('User not found', 404)

            recipes = Recipe.query.filter_by(user_id=user_id).all()
            recipes_data = [recipe.to_dict(only=(
                'id', 'name', 'description', 'prep_time', 'cook_time', 'image_url'
            )) for recipe in recipes]
            
            return success_response(data=recipes_data)
        except Exception as e:
            return error_response(str(e), 500)

    # FAVORITE ROUTES
    @app.route('/favorite_recipes', methods=['POST'])
    @require_auth
    def create_favorite():
        try:
            data = request.get_json()
            if not data or not data.get('recipe_id'):
                return error_response('recipe_id is required')

            recipe_id = data['recipe_id']
            user_id = session['user_id']

            recipe = Recipe.query.get(recipe_id)
            if not recipe:
                return error_response('Recipe not found', 404)

            existing = FavoriteRecipe.query.filter_by(
                user_id=user_id, recipe_id=recipe_id
            ).first()
            
            if existing:
                return error_response('Recipe already favorited')

            favorite = FavoriteRecipe(user_id=user_id, recipe_id=recipe_id)
            db.session.add(favorite)
            db.session.commit()

            return success_response(
                data=favorite.to_dict(),
                message='Recipe added to favorites',
                status=201
            )
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), 500)

    @app.route('/favorite_recipes/<int:favorite_id>', methods=['DELETE'])
    @require_auth
    def delete_favorite(favorite_id):
        try:
            favorite = FavoriteRecipe.query.get(favorite_id)
            if not favorite:
                return error_response('Favorite not found', 404)

            if favorite.user_id != session['user_id']:
                return error_response('Unauthorized', 403)

            db.session.delete(favorite)
            db.session.commit()
            
            return success_response(message='Favorite removed successfully')
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), 500)

    @app.route('/users/<int:user_id>/favorite_recipes', methods=['GET'])
    def get_user_favorites(user_id):
        try:
            user = User.query.get(user_id)
            if not user:
                return error_response('User not found', 404)

            favorites = FavoriteRecipe.query.filter_by(user_id=user_id).all()
            favorites_data = [favorite.to_dict() for favorite in favorites]
            
            return success_response(data=favorites_data)
        except Exception as e:
            return error_response(str(e), 500)

    # COMMENT ROUTES
    @app.route('/comments', methods=['POST'])
    @require_auth
    def create_comment():
        try:
            data = request.get_json()
            if not data:
                return error_response('No data provided')

            if not data.get('text'):
                return error_response('Comment text is required')
            if not data.get('recipe_id'):
                return error_response('recipe_id is required')

            recipe = Recipe.query.get(data['recipe_id'])
            if not recipe:
                return error_response('Recipe not found', 404)

            rating = data.get('rating')
            if rating is not None:
                if not isinstance(rating, int) or not (1 <= rating <= 5):
                    return error_response('Rating must be an integer between 1 and 5')
>>>>>>> main

            comment = Comment(
                text=data['text'],
                rating=rating,
                user_id=session['user_id'],
                recipe_id=data['recipe_id']
            )

            db.session.add(comment)
            db.session.commit()
<<<<<<< HEAD
            return jsonify(comment.to_dict()), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    # Favorite Recipes 

    @app.route('/favorite_recipes', methods=['POST'])
    def create_favorite():
        try:
            if 'user_id' not in session:
                return jsonify({'error': 'Authentication required'}), 401

            data = request.get_json()
            if not data.get('recipe_id'):
                return jsonify({'error': 'recipe_id is required'}), 400

            recipe = Recipe.query.get(data['recipe_id'])
            if not recipe:
                return jsonify({'error': 'Recipe not found'}), 404

            existing = FavoriteRecipe.query.filter_by(
                user_id=session['user_id'],
                recipe_id=data['recipe_id']
            ).first()
            if existing:
                return jsonify({'error': 'Recipe already favorited'}), 400

            favorite = FavoriteRecipe(
                user_id=session['user_id'],
                recipe_id=data['recipe_id']
            )
            db.session.add(favorite)
            db.session.commit()
            return jsonify(favorite.to_dict()), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @app.route('/favorite_recipes/<int:id>', methods=['DELETE'])
    def delete_favorite(id):
        try:
            if 'user_id' not in session:
                return jsonify({'error': 'Authentication required'}), 401

            favorite = FavoriteRecipe.query.get(id)
            if not favorite:
                return jsonify({'error': 'Favorite not found'}), 404

            if favorite.user_id != session['user_id']:
                return jsonify({'error': 'Unauthorized'}), 403

            db.session.delete(favorite)
            db.session.commit()
            return jsonify({'message': 'Favorite removed successfully'}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @app.route('/users/<int:user_id>/favorite_recipes', methods=['GET'])
    def get_user_favorites(user_id):
        try:
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404

            favorites = FavoriteRecipe.query.filter_by(user_id=user_id).all()
            return jsonify([favorite.to_dict() for favorite in favorites]), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
=======

            return success_response(
                data=comment.to_dict(),
                message='Comment added successfully',
                status=201
            )
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), 500)

    # CATEGORY ROUTES
    @app.route('/categories', methods=['GET'])
    def get_categories():
        try:
            categories = Category.query.all()
            categories_data = [cat.to_dict(only=('id', 'name')) for cat in categories]
            return success_response(data=categories_data)
        except Exception as e:
            return error_response(str(e), 500)

    return app

# Create app instance
app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
>>>>>>> main
