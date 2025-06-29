from flask import Flask, request, jsonify, session
from flask_cors import CORS
from extensions import db, migrate, bcrypt
from config import Config
from models import Recipe, User, Category, Comment, FavoriteRecipe
from functools import wraps

def create_app():  
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, supports_credentials=True)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    def success_response(data=None, message=None, status=200):
        response = {}
        if data is not None:
            response['data'] = data
        if message:
            response['message'] = message
        return jsonify(response), status

    def error_response(error, status=400):
        return jsonify({'error': error}), status

    def require_auth(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user_id' not in session:
                return error_response('Authentication required', 401)
            return f(*args, **kwargs)
        return decorated_function

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

    @app.route('/recipes', methods=['GET'])
    def get_recipes():
        try:
            recipes = Recipe.query.all()
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

            comment = Comment(
                text=data['text'],
                rating=rating,
                user_id=session['user_id'],
                recipe_id=data['recipe_id']
            )

            db.session.add(comment)
            db.session.commit()

            return success_response(
                data=comment.to_dict(),
                message='Comment added successfully',
                status=201
            )
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), 500)

    @app.route('/categories', methods=['GET'])
    def get_categories():
        try:
            categories = Category.query.all()
            categories_data = [cat.to_dict(only=('id', 'name')) for cat in categories]
            return success_response(data=categories_data)
        except Exception as e:
            return error_response(str(e), 500)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
