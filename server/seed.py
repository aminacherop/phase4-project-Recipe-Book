from app import app
from extensions import db
from models import User, Recipe, Category

with app.app_context():
    db.drop_all()
    db.create_all()

    cat1 = Category(name="Dessert")
    cat2 = Category(name="Vegan")

    user1 = User(username="amina", email="aminacherop20@gmail.com")
    user1.set_password("123456")

    recipe1 = Recipe(
        name="Chocolate Cake",
        description="A rich chocolate dessert.",
        ingredients="Flour, Sugar, Cocoa, Eggs",
        instructions="Mix and bake.",
        prep_time=15,
        cook_time=30,
        image_url="https://inbloombakery.com/wp-content/uploads/2022/04/chocolate-drip-cake-featured-image.jpg",
        user=user1,
        category=cat1
    )

    db.session.add_all([cat1, cat2, user1, recipe1])
    db.session.commit()
