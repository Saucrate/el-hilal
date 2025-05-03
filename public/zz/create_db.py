from app import app, db, User, Matiere, Enseignant

def create_database():
    with app.app_context():
        # Drop all existing tables
        db.drop_all()
        
        # Create all tables with the current schema
        db.create_all()
        
        # Create admin user
        admin = User(username='admin')
        admin.set_password('admin123')
        db.session.add(admin)
        
        # Create some sample data
        matiere1 = Matiere(nom='Mathématiques', description='Cours de mathématiques avancées')
        matiere2 = Matiere(nom='Physique', description='Cours de physique fondamentale')
        
        db.session.add(matiere1)
        db.session.add(matiere2)
        
        # Commit all changes
        db.session.commit()
        print("Database created successfully!")

if __name__ == '__main__':
    create_database() 