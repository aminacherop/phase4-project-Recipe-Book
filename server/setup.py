#!/usr/bin/env python3
"""
Simple setup script for Recipe Book backend
Run this to initialize the database and seed it with sample data
"""

import os
import sys
from app import create_app
from extensions import db

def setup_database():
    """Initialize the database and create instance folder"""
    
    print("🚀 Setting up Recipe Book Database...")
    print("-" * 40)
    
    # Create app
    app = create_app()
    
    with app.app_context():
        # Create instance folder if it doesn't exist
        instance_path = os.path.join(os.path.dirname(__file__), 'instance')
        if not os.path.exists(instance_path):
            os.makedirs(instance_path)
            print("📁 Created instance folder")
        
        # Create all database tables
        print("📋 Creating database tables...")
        db.create_all()
        print("✅ Database tables created successfully")
        
        print("\n🎯 Next steps:")
        print("1. Run: python seed.py (to add sample data)")
        print("2. Run: python app.py (to start the server)")
        print("\n💡 The server will run on http://localhost:5000")

if __name__ == "__main__":
    setup_database()
