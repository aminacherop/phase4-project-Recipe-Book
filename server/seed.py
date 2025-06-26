import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app import create_app
from extensions import db
from models import User, Recipe, Category, Comment, FavoriteRecipe

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Categories
    cat1 = Category(name="Dessert")
    cat2 = Category(name="Vegan")
    cat3 = Category(name="Main Course")
    cat4 = Category(name="Appetizer")
    cat5 = Category(name="Breakfast")
    cat6 = Category(name="Salad")

    # Users
    user1 = User(username="amina", email="aminacherop20@gmail.com")
    user1.set_password("123456")
    
    user2 = User(username="chef_mike", email="mike@recipes.com")
    user2.set_password("password123")
    
    user3 = User(username="foodie_sarah", email="sarah@foodlover.com")
    user3.set_password("cooking123")
    
    user4 = User(username="healthy_jen", email="jen@healthyfood.com")
    user4.set_password("wellness123")

    # Recipes
    recipe1 = Recipe(
        name="Chocolate Cake",
        description="A rich chocolate dessert.",
        ingredients="Flour, Sugar, Cocoa, Eggs, Butter, Baking powder",
        instructions="1. Preheat oven to 350°F. 2. Mix dry ingredients. 3. Add wet ingredients. 4. Bake for 30 minutes.",
        prep_time=15,
        cook_time=30,
        image_url="https://inbloombakery.com/wp-content/uploads/2022/04/chocolate-drip-cake-featured-image.jpg",
        user=user1,
        category=cat1
    )

    recipe2 = Recipe(
        name="Quinoa Buddha Bowl",
        description="Nutritious vegan bowl packed with protein and vitamins.",
        ingredients="Quinoa, Chickpeas, Avocado, Sweet potato, Spinach, Tahini",
        instructions="1. Cook quinoa. 2. Roast sweet potatoes. 3. Prepare tahini dressing. 4. Assemble bowl.",
        prep_time=20,
        cook_time=25,
        image_url="https://example.com/buddha-bowl.jpg",
        user=user4,
        category=cat2
    )

    recipe3 = Recipe(
        name="Chicken Parmesan",
        description="Crispy breaded chicken with marinara and cheese.",
        ingredients="Chicken breast, Breadcrumbs, Parmesan cheese, Mozzarella, Marinara sauce, Eggs",
        instructions="1. Bread chicken. 2. Fry until golden. 3. Top with sauce and cheese. 4. Bake until cheese melts.",
        prep_time=30,
        cook_time=40,
        image_url="https://example.com/chicken-parm.jpg",
        user=user2,
        category=cat3
    )

    recipe4 = Recipe(
        name="Spinach Artichoke Dip",
        description="Creamy, cheesy dip perfect for parties.",
        ingredients="Spinach, Artichoke hearts, Cream cheese, Sour cream, Mozzarella, Garlic",
        instructions="1. Mix all ingredients. 2. Transfer to baking dish. 3. Bake until bubbly.",
        prep_time=10,
        cook_time=20,
        image_url="https://example.com/spinach-dip.jpg",
        user=user3,
        category=cat4
    )

    recipe5 = Recipe(
        name="Overnight Oats",
        description="Easy make-ahead breakfast.",
        ingredients="Rolled oats, Chia seeds, Almond milk, Vanilla, Berries, Honey",
        instructions="1. Mix oats, chia, milk, and vanilla. 2. Refrigerate overnight. 3. Top with berries and honey.",
        prep_time=5,
        cook_time=0,
        image_url="https://example.com/overnight-oats.jpg",
        user=user4,
        category=cat5
    )

    recipe6 = Recipe(
        name="Mediterranean Salad",
        description="Fresh salad with Mediterranean flavors.",
        ingredients="Cucumber, Tomatoes, Red onion, Olives, Feta cheese, Olive oil, Lemon",
        instructions="1. Chop vegetables. 2. Combine in bowl. 3. Add feta and olives. 4. Dress with oil and lemon.",
        prep_time=15,
        cook_time=0,
        image_url="https://example.com/med-salad.jpg",
        user=user3,
        category=cat6
    )

    recipe7 = Recipe(
        name="Vegan Lentil Curry",
        description="Spicy and warming plant-based curry.",
        ingredients="Red lentils, Coconut milk, Onion, Garlic, Ginger, Curry powder, Tomatoes",
        instructions="1. Sauté onions, garlic, ginger. 2. Add spices. 3. Add lentils and coconut milk. 4. Simmer until thick.",
        prep_time=15,
        cook_time=25,
        image_url="https://example.com/lentil-curry.jpg",
        user=user4,
        category=cat2
    )

    recipe8 = Recipe(
        name="Vanilla Panna Cotta",
        description="Silky smooth Italian dessert.",
        ingredients="Heavy cream, Sugar, Gelatin, Vanilla extract, Berry sauce",
        instructions="1. Heat cream and sugar. 2. Add gelatin. 3. Add vanilla. 4. Pour into molds and chill.",
        prep_time=20,
        cook_time=10,
        image_url="https://example.com/panna-cotta.jpg",
        user=user2,
        category=cat1
    )

    
    db.session.add_all([cat1, cat2, cat3, cat4, cat5, cat6])
    db.session.add_all([user1, user2, user3, user4])
    db.session.add_all([recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8])
    
    
    db.session.commit()

    # Comments
    comment1 = Comment(
        text="This chocolate cake is absolutely divine! Perfect for special occasions.",
        rating=5,
        user_id=user2.id,
        recipe_id=recipe1.id
    )

    comment2 = Comment(
        text="Great healthy option, very filling and tasty.",
        rating=4,
        user_id=user1.id,
        recipe_id=recipe2.id
    )

    comment3 = Comment(
        text="Classic comfort food done right!",
        rating=5,
        user_id=user4.id,
        recipe_id=recipe3.id
    )

    comment4 = Comment(
        text="Perfect for parties, everyone loved it.",
        rating=4,
        user_id=user1.id,
        recipe_id=recipe4.id
    )

    comment5 = Comment(
        text="So convenient for busy mornings!",
        rating=5,
        user_id=user2.id,
        recipe_id=recipe5.id
    )

    comment6 = Comment(
        text="Fresh and light, perfect for summer.",
        rating=4,
        user_id=user4.id,
        recipe_id=recipe6.id
    )

    # Favorite Recipes
    fav1 = FavoriteRecipe(user_id=user1.id, recipe_id=recipe2.id) 
    fav2 = FavoriteRecipe(user_id=user1.id, recipe_id=recipe5.id) 
    fav3 = FavoriteRecipe(user_id=user2.id, recipe_id=recipe1.id)  
    fav4 = FavoriteRecipe(user_id=user2.id, recipe_id=recipe6.id)  
    fav5 = FavoriteRecipe(user_id=user3.id, recipe_id=recipe3.id)  
    fav6 = FavoriteRecipe(user_id=user3.id, recipe_id=recipe7.id)  
    fav7 = FavoriteRecipe(user_id=user4.id, recipe_id=recipe2.id)  
    fav8 = FavoriteRecipe(user_id=user4.id, recipe_id=recipe7.id)  

    # Add comments and favorites
    db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6])
    db.session.add_all([fav1, fav2, fav3, fav4, fav5, fav6, fav7, fav8])
    
    db.session.commit()

    print("Database seeded successfully!")
    print(f"Created {Category.query.count()} categories")
    print(f"Created {User.query.count()} users")
    print(f"Created {Recipe.query.count()} recipes")
    print(f"Created {Comment.query.count()} comments")
    print(f"Created {FavoriteRecipe.query.count()} favorites")