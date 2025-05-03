# Gestion Scolaire - Application Web

Une application web moderne pour gérer les matières scolaires et leurs enseignants.

## Fonctionnalités

- Affichage des matières scolaires
- Détails des matières avec leurs enseignants
- Ajout de nouvelles matières
- Ajout de nouveaux enseignants
- Système d'authentification sécurisé
- Interface utilisateur moderne et responsive

## Prérequis

- Python 3.8 ou supérieur
- pip (gestionnaire de paquets Python)

## Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
cd [NOM_DU_REPERTOIRE]
```

2. Créez un environnement virtuel :
```bash
python -m venv venv
```

3. Activez l'environnement virtuel :
- Windows :
```bash
venv\Scripts\activate
```
- Linux/Mac :
```bash
source venv/bin/activate
```

4. Installez les dépendances :
```bash
pip install -r requirements.txt
```

## Configuration

1. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```
SECRET_KEY=votre_cle_secrete
```

## Lancement de l'application

1. Assurez-vous que l'environnement virtuel est activé
2. Lancez l'application :
```bash
python app.py
```
3. Ouvrez votre navigateur et accédez à `http://localhost:5000`

## Création d'un compte administrateur

Pour créer un compte administrateur, vous devez exécuter les commandes suivantes dans l'interpréteur Python :

```python
from app import app, db, User
with app.app_context():
    admin = User(username='admin')
    admin.set_password('votre_mot_de_passe')
    db.session.add(admin)
    db.session.commit()
```

## Structure du projet

```
.
├── app.py              # Application principale
├── requirements.txt    # Dépendances
├── README.md          # Documentation
└── templates/         # Templates HTML
    ├── base.html
    ├── index.html
    ├── login.html
    ├── ajouter_matiere.html
    ├── ajouter_enseignant.html
    └── matiere_detail.html
```

## Licence

Ce projet est sous licence MIT. 