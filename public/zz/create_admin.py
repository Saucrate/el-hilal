from app import app, db, User

def create_admin():
    with app.app_context():
        # Check if admin already exists
        if User.query.filter_by(username='admin').first():
            print("Admin user already exists!")
            return
        
        # Create new admin user
        admin = User(username='admin')
        admin.set_password('admin123')  # You can change this password
        db.session.add(admin)
        db.session.commit()
        print("Admin user created successfully!")

if __name__ == '__main__':
    create_admin() 