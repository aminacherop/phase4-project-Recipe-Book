<<<<<<< HEAD
from .extensions import db, bcrypt
=======
from extensions import db, bcrypt
>>>>>>> main
from sqlalchemy_serializer import SerializerMixin


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize rules to prevent recursion
    serialize_rules = (
        '-password_hash',  
        '-recipes.user',  
        '-comments.user',  
        '-favorites.user', 
        '-recipes.comments.recipe',  
        '-recipes.favorites.recipe',  
    )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)

    recipes = db.relationship("Recipe", backref="user", cascade="all, delete")
    comments = db.relationship("Comment", backref="user", cascade="all, delete")
    favorites = db.relationship("FavoriteRecipe", backref="user", cascade="all, delete")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

<<<<<<< HEAD

=======
>>>>>>> main
    serialize_rules = (
        '-recipes.category',        
        '-recipes.user.recipes',  
        '-recipes.comments.recipe', 
        '-recipes.favorites.recipe', 
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)

    recipes = db.relationship("Recipe", backref="category", cascade="all, delete")


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    serialize_rules = (
        '-user.recipes',          
        '-user.comments',          
        '-user.favorites',         
        '-user.password_hash',     
        '-category.recipes',       
        '-comments.recipe',        
        '-comments.user.recipes',  
        '-comments.user.comments', 
        '-comments.user.favorites', 
        '-favorites.recipe',       
        '-favorites.user.recipes',
        '-favorites.user.comments', 
        '-favorites.user.favorites', 
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    ingredients = db.Column(db.Text)
    instructions = db.Column(db.Text)
    prep_time = db.Column(db.Integer)
    cook_time = db.Column(db.Integer)
    image_url = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    comments = db.relationship("Comment", backref="recipe", cascade="all, delete")
    favorites = db.relationship("FavoriteRecipe", backref="recipe", cascade="all, delete")


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

<<<<<<< HEAD
    
=======
>>>>>>> main
    serialize_rules = (
        '-user.comments',          
        '-user.recipes',           
        '-user.favorites',         
        '-user.password_hash',     
        '-recipe.comments',     
        '-recipe.favorites',       
        '-recipe.user.recipes',    
        '-recipe.user.comments',   
        '-recipe.user.favorites',  
    )

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    rating = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)


class FavoriteRecipe(db.Model, SerializerMixin):
    __tablename__ = 'favorite_recipes'

<<<<<<< HEAD
    
=======
>>>>>>> main
    serialize_rules = (
        '-user.favorites',     
        '-user.recipes',         
        '-user.comments',          
        '-user.password_hash',     
        '-recipe.favorites',       
        '-recipe.comments',        
        '-recipe.user.recipes',    
        '-recipe.user.comments',   
        '-recipe.user.favorites',  
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

<<<<<<< HEAD
    __table_args__ = (db.UniqueConstraint('user_id', 'recipe_id'),)
=======
    __table_args__ = (db.UniqueConstraint('user_id', 'recipe_id'),)
>>>>>>> main
