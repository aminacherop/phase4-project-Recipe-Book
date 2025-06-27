import os
from app import create_app
from extensions import db

app = create_app()

print("Current working directory:", os.getcwd())
print("Database URI:", app.config['SQLALCHEMY_DATABASE_URI'])

# Test if we can create the database
with app.app_context():
    try:
        db.create_all()
        print("Database created successfully!")
    except Exception as e:
        print("Error creating database:", str(e))