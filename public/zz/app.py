from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import os
import uuid

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecole.db'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Modèles de base de données
class Matiere(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    image = db.Column(db.String(255))
    enseignants = db.relationship('Enseignant', backref='matiere', lazy=True)

class Enseignant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image = db.Column(db.String(255))
    matiere_id = db.Column(db.Integer, db.ForeignKey('matiere.id'), nullable=False)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

def save_file(file, folder):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], folder, unique_filename)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        file.save(file_path)
        return unique_filename
    return None

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def index():
    matieres = Matiere.query.all()
    return render_template('index.html', matieres=matieres)

@app.route('/matiere/<int:id>')
def matiere_detail(id):
    matiere = Matiere.query.get_or_404(id)
    enseignants = Enseignant.query.filter_by(matiere_id=id).all()
    return render_template('matiere_detail.html', matiere=matiere, enseignants=enseignants)

@app.route('/matiere/ajouter', methods=['GET', 'POST'])
@login_required
def ajouter_matiere():
    if request.method == 'POST':
        nom = request.form['nom']
        description = request.form['description']
        image = save_file(request.files.get('image'), 'matieres')
        
        nouvelle_matiere = Matiere(nom=nom, description=description, image=image)
        db.session.add(nouvelle_matiere)
        db.session.commit()
        flash('Matière ajoutée avec succès!', 'success')
        return redirect(url_for('index'))
    return render_template('ajouter_matiere.html')

@app.route('/matiere/<int:id>/modifier', methods=['GET', 'POST'])
@login_required
def modifier_matiere(id):
    matiere = Matiere.query.get_or_404(id)
    if request.method == 'POST':
        matiere.nom = request.form['nom']
        matiere.description = request.form['description']
        if 'image' in request.files and request.files['image'].filename:
            # Delete old image if exists
            if matiere.image:
                old_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'matieres', matiere.image)
                if os.path.exists(old_image_path):
                    os.remove(old_image_path)
            matiere.image = save_file(request.files.get('image'), 'matieres')
        db.session.commit()
        flash('Matière modifiée avec succès!', 'success')
        return redirect(url_for('matiere_detail', id=id))
    return render_template('modifier_matiere.html', matiere=matiere)

@app.route('/matiere/<int:id>/supprimer', methods=['POST'])
@login_required
def supprimer_matiere(id):
    matiere = Matiere.query.get_or_404(id)
    # Delete associated image if exists
    if matiere.image:
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'matieres', matiere.image)
        if os.path.exists(image_path):
            os.remove(image_path)
    db.session.delete(matiere)
    db.session.commit()
    flash('Matière supprimée avec succès!', 'success')
    return redirect(url_for('index'))

@app.route('/enseignant/ajouter', methods=['GET', 'POST'])
@login_required
def ajouter_enseignant():
    if request.method == 'POST':
        nom = request.form['nom']
        prenom = request.form['prenom']
        email = request.form['email']
        matiere_id = request.form['matiere_id']
        image = save_file(request.files.get('image'), 'enseignants')
        
        nouvel_enseignant = Enseignant(nom=nom, prenom=prenom, email=email, matiere_id=matiere_id, image=image)
        db.session.add(nouvel_enseignant)
        db.session.commit()
        flash('Enseignant ajouté avec succès!', 'success')
        return redirect(url_for('matiere_detail', id=matiere_id))
    matieres = Matiere.query.all()
    return render_template('ajouter_enseignant.html', matieres=matieres)

@app.route('/enseignant/<int:id>/modifier', methods=['GET', 'POST'])
@login_required
def modifier_enseignant(id):
    enseignant = Enseignant.query.get_or_404(id)
    if request.method == 'POST':
        enseignant.nom = request.form['nom']
        enseignant.prenom = request.form['prenom']
        enseignant.email = request.form['email']
        enseignant.matiere_id = request.form['matiere_id']
        if 'image' in request.files and request.files['image'].filename:
            # Delete old image if exists
            if enseignant.image:
                old_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'enseignants', enseignant.image)
                if os.path.exists(old_image_path):
                    os.remove(old_image_path)
            enseignant.image = save_file(request.files.get('image'), 'enseignants')
        db.session.commit()
        flash('Enseignant modifié avec succès!', 'success')
        return redirect(url_for('matiere_detail', id=enseignant.matiere_id))
    matieres = Matiere.query.all()
    return render_template('modifier_enseignant.html', enseignant=enseignant, matieres=matieres)

@app.route('/enseignant/<int:id>/supprimer', methods=['POST'])
@login_required
def supprimer_enseignant(id):
    enseignant = Enseignant.query.get_or_404(id)
    matiere_id = enseignant.matiere_id
    # Delete associated image if exists
    if enseignant.image:
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'enseignants', enseignant.image)
        if os.path.exists(image_path):
            os.remove(image_path)
    db.session.delete(enseignant)
    db.session.commit()
    flash('Enseignant supprimé avec succès!', 'success')
    return redirect(url_for('matiere_detail', id=matiere_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('index'))
        flash('Nom d\'utilisateur ou mot de passe incorrect', 'danger')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 