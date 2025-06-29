#!/usr/bin/env python3
"""
Simple run script for Recipe Book backend
This will set up everything and start the server
"""

import os
import sys

def main():
    """Main function to run the Recipe Book backend"""
    
    print("🍳 Recipe Book Backend")
    print("=" * 30)
    
    db_path = os.path.join(os.path.dirname(__file__), 'instance', 'recipe_book.db')
    
    if not os.path.exists(db_path):
        print("📋 Database not found. Setting up...")
        
        from setup import setup_database
        setup_database()
        
        print("\n🌱 Seeding database with sample data...")
        exec(open('seed.py').read())
    
    else:
        print("📋 Database found. Starting server...")
    
    print("\n🚀 Starting Flask server...")
    print("📍 Server will be available at: http://localhost:5000")
    print("🛑 Press Ctrl+C to stop the server\n")
    
    from app import app
    app.run(debug=True, host='0.0.0.0', port=5000)

if __name__ == "__main__":
    main()
