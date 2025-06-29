import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from extensions import db
from models import User, Recipe, Category, Comment, FavoriteRecipe

app = create_app()

with app.app_context():
    print("Dropping existing tables...")
    db.drop_all()
    
    print("Creating new tables...")
    db.create_all()

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

    breakfast_cat = Category.query.filter_by(name="Breakfast").first()
    dessert_cat = Category.query.filter_by(name="Dessert").first()
    dinner_cat = Category.query.filter_by(name="Dinner").first()
    vegan_cat = Category.query.filter_by(name="Vegan").first()
    salad_cat = Category.query.filter_by(name="Salad").first()

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
