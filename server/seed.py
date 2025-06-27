import sys
import os
<<<<<<< HEAD
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
=======

# Add the server directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

>>>>>>> main
from app import create_app
from extensions import db
from models import User, Recipe, Category, Comment, FavoriteRecipe

<<<<<<< HEAD
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
=======
# Create app and setup database
app = create_app()

with app.app_context():
    # Drop all tables and recreate
    print("Dropping existing tables...")
    db.drop_all()
    
    print("Creating new tables...")
    db.create_all()

    # Create categories first
    print("Creating categories...")
    categories = [
        Category(name="Breakfast"),
        Category(name="Lunch"), 
        Category(name="Dinner"),
        Category(name="Dessert"),
        Category(name="Snack"),
        Category(name="Appetizer"),
        Category(name="Salad"),
        Category(name="Vegan"),
        Category(name="Vegetarian"),
        Category(name="Main Course")
    ]
    
    for category in categories:
        db.session.add(category)
    db.session.commit()

    # Create users
    print("Creating users...")
    users = []
    
    user1 = User(username="amina", email="amina@example.com")
    user1.set_password("123456")
    users.append(user1)
    
    user2 = User(username="chef_mike", email="mike@recipes.com")
    user2.set_password("password123")
    users.append(user2)
    
    user3 = User(username="foodie_sarah", email="sarah@foodlover.com")
    user3.set_password("cooking123")
    users.append(user3)
    
    user4 = User(username="healthy_jen", email="jen@healthyfood.com")
    user4.set_password("wellness123")
    users.append(user4)

    for user in users:
        db.session.add(user)
    db.session.commit()

    # Get category IDs for recipes
    breakfast_cat = Category.query.filter_by(name="Breakfast").first()
    dessert_cat = Category.query.filter_by(name="Dessert").first()
    dinner_cat = Category.query.filter_by(name="Dinner").first()
    vegan_cat = Category.query.filter_by(name="Vegan").first()
    salad_cat = Category.query.filter_by(name="Salad").first()

    # Create recipes
    print("Creating recipes...")
    recipes = [
        Recipe(
            name="Chocolate Chip Pancakes",
            description="Fluffy pancakes with chocolate chips, perfect for weekend mornings",
            ingredients="2 cups flour, 2 eggs, 1 cup milk, 1/2 cup chocolate chips, 2 tbsp sugar, 1 tsp baking powder, 1/2 tsp salt, 2 tbsp melted butter",
            instructions="1. Mix dry ingredients in a bowl. 2. Whisk eggs, milk, and melted butter in another bowl. 3. Combine wet and dry ingredients. 4. Fold in chocolate chips. 5. Cook on griddle until golden brown.",
            prep_time=10,
            cook_time=15,
            image_url="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500",
            user_id=user1.id,
            category_id=breakfast_cat.id
        ),
        Recipe(
            name="Classic Chocolate Cake",
            description="Rich, moist chocolate cake that's perfect for any celebration",
            ingredients="2 cups flour, 2 cups sugar, 3/4 cup cocoa powder, 2 eggs, 1 cup buttermilk, 1/2 cup oil, 2 tsp vanilla, 1 tsp baking soda",
            instructions="1. Preheat oven to 350°F. 2. Mix dry ingredients. 3. Combine wet ingredients. 4. Mix wet and dry until smooth. 5. Pour into greased pans. 6. Bake 30-35 minutes.",
            prep_time=20,
            cook_time=35,
            image_url="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
            user_id=user2.id,
            category_id=dessert_cat.id
        ),
        Recipe(
            name="Grilled Chicken Teriyaki",
            description="Tender grilled chicken with homemade teriyaki sauce",
            ingredients="4 chicken breasts, 1/4 cup soy sauce, 2 tbsp honey, 1 tbsp rice vinegar, 2 cloves garlic, 1 tsp ginger, 1 tbsp cornstarch",
            instructions="1. Marinate chicken in half the teriyaki sauce. 2. Grill chicken 6-8 minutes per side. 3. Heat remaining sauce in pan. 4. Thicken with cornstarch mixture. 5. Serve chicken with sauce.",
            prep_time=15,
            cook_time=20,
            image_url="https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500",
            user_id=user3.id,
            category_id=dinner_cat.id
        ),
        Recipe(
            name="Mediterranean Quinoa Bowl",
            description="Healthy vegan bowl packed with Mediterranean flavors",
            ingredients="1 cup quinoa, 1 cucumber, 2 tomatoes, 1/2 red onion, 1/4 cup olives, 1/4 cup tahini, 2 tbsp lemon juice, olive oil, fresh herbs",
            instructions="1. Cook quinoa according to package directions. 2. Dice vegetables. 3. Make dressing with tahini, lemon juice, and olive oil. 4. Combine all ingredients in bowl. 5. Garnish with fresh herbs.",
            prep_time=20,
            cook_time=15,
            image_url="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
            user_id=user4.id,
            category_id=vegan_cat.id
        ),
        Recipe(
            name="Caesar Salad",
            description="Classic caesar salad with homemade dressing and croutons",
            ingredients="1 head romaine lettuce, 1/2 cup parmesan cheese, 1/4 cup caesar dressing, 1 cup croutons, 2 anchovy fillets, 1 clove garlic, lemon juice",
            instructions="1. Wash and chop romaine lettuce. 2. Make dressing with anchovies, garlic, and lemon. 3. Toss lettuce with dressing. 4. Top with parmesan and croutons. 5. Serve immediately.",
            prep_time=15,
            cook_time=0,
            image_url="https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500",
            user_id=user1.id,
            category_id=salad_cat.id
        ),
        Recipe(
            name="Beef Tacos",
            description="Flavorful ground beef tacos with fresh toppings",
            ingredients="1 lb ground beef, 8 taco shells, 1 packet taco seasoning, lettuce, tomatoes, cheese, sour cream, salsa",
            instructions="1. Brown ground beef in skillet. 2. Add taco seasoning and water. 3. Simmer 10 minutes. 4. Warm taco shells. 5. Fill shells with beef and toppings.",
            prep_time=10,
            cook_time=15,
            image_url="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
            user_id=user2.id,
            category_id=dinner_cat.id
        ),
        Recipe(
            name="Banana Smoothie",
            description="Creamy banana smoothie perfect for breakfast or snack",
            ingredients="2 bananas, 1 cup milk, 1 tbsp honey, 1/2 tsp vanilla, ice cubes, pinch of cinnamon",
            instructions="1. Peel and slice bananas. 2. Add all ingredients to blender. 3. Blend until smooth. 4. Add ice if desired thickness. 5. Serve immediately.",
            prep_time=5,
            cook_time=0,
            image_url="https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500",
            user_id=user4.id,
            category_id=breakfast_cat.id
        ),
        Recipe(
            name="Vanilla Cupcakes",
            description="Light and fluffy vanilla cupcakes with buttercream frosting",
            ingredients="2 cups flour, 1.5 cups sugar, 1/2 cup butter, 2 eggs, 1 cup milk, 2 tsp vanilla, 2 tsp baking powder, 1/2 tsp salt",
            instructions="1. Preheat oven to 350°F. 2. Cream butter and sugar. 3. Add eggs and vanilla. 4. Alternate flour mixture and milk. 5. Fill cupcake liners. 6. Bake 18-20 minutes.",
            prep_time=25,
            cook_time=20,
            image_url="https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=500",
            user_id=user3.id,
            category_id=dessert_cat.id
        )
    ]

    for recipe in recipes:
        db.session.add(recipe)
    db.session.commit()

    # Create some comments
    print("Creating comments...")
    comments = [
        Comment(
            text="These pancakes are amazing! My kids loved them.",
            rating=5,
            user_id=user2.id,
            recipe_id=recipes[0].id
        ),
        Comment(
            text="Perfect chocolate cake recipe. Very moist and delicious.",
            rating=5,
            user_id=user1.id,
            recipe_id=recipes[1].id
        ),
        Comment(
            text="Great healthy option, very filling and tasty.",
            rating=4,
            user_id=user3.id,
            recipe_id=recipes[3].id
        ),
        Comment(
            text="Best caesar salad I've ever made!",
            rating=5,
            user_id=user4.id,
            recipe_id=recipes[4].id
        ),
        Comment(
            text="Quick and easy weeknight dinner. Family approved!",
            rating=4,
            user_id=user1.id,
            recipe_id=recipes[5].id
        )
    ]

    for comment in comments:
        db.session.add(comment)
    db.session.commit()

    # Create some favorite recipes
    print("Creating favorite recipes...")
    favorites = [
        FavoriteRecipe(user_id=user1.id, recipe_id=recipes[1].id),  # amina likes chocolate cake
        FavoriteRecipe(user_id=user1.id, recipe_id=recipes[3].id),  # amina likes quinoa bowl
        FavoriteRecipe(user_id=user2.id, recipe_id=recipes[0].id),  # chef_mike likes pancakes
        FavoriteRecipe(user_id=user2.id, recipe_id=recipes[4].id),  # chef_mike likes caesar salad
        FavoriteRecipe(user_id=user3.id, recipe_id=recipes[2].id),  # foodie_sarah likes chicken teriyaki
        FavoriteRecipe(user_id=user3.id, recipe_id=recipes[6].id),  # foodie_sarah likes banana smoothie
        FavoriteRecipe(user_id=user4.id, recipe_id=recipes[3].id),  # healthy_jen likes quinoa bowl
        FavoriteRecipe(user_id=user4.id, recipe_id=recipes[6].id),  # healthy_jen likes banana smoothie
    ]

    for favorite in favorites:
        db.session.add(favorite)
    db.session.commit()

    # Print summary
    print("\n" + "="*50)
    print("DATABASE SEEDED SUCCESSFULLY!")
    print("="*50)
    print(f"✅ Created {Category.query.count()} categories")
    print(f"✅ Created {User.query.count()} users")
    print(f"✅ Created {Recipe.query.count()} recipes")
    print(f"✅ Created {Comment.query.count()} comments")
    print(f"✅ Created {FavoriteRecipe.query.count()} favorites")
    print("\n📋 Test User Credentials:")
    print("   Username: amina     | Password: 123456")
    print("   Username: chef_mike | Password: password123")
    print("   Username: foodie_sarah | Password: cooking123")
    print("   Username: healthy_jen  | Password: wellness123")
    print("\n🚀 Start the server with: python app.py")
    print("="*50)
>>>>>>> main
