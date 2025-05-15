# parkingappres

**parkingappres** est une application mobile de réservation d’emplacements de parking, développée avec React Native en frontend et utilisant **Express** et **Flask** pour le backend.

## Fonctionnalités

- Visualisation en temps réel de la disponibilité des places de parking  
- Création et annulation de réservations  
- Historique des réservations des utilisateurs  

## Tech Stack

- **Frontend** : React Native (JavaScript) citeturn0search0  
- **Backend API** :  
  - Express (Node.js) pour les opérations CRUD principales citeturn0search1  
  - Flask (Python) pour les services additionnels (authentification, notifications) citeturn0search2  

## Structure du projet

```
parkingappres/
├─ android/               # Code natif Android
├─ ios/                   # Code natif iOS
├─ backend-express/       # Serveur REST principal (Express)
│  ├─ routes/
│  ├─ controllers/
│  └─ models/
├─ backend-flask/         # Services micro (Flask)
│  ├─ app.py
│  ├─ services/
│  └─ requirements.txt
├─ screens/               # Écrans React Native
├─ assets/                # Images et ressources statiques
├─ App.js                 # Point d’entrée React Native
├─ config.js              # Configuration (endpoints API, clés)
└─ package.json           # Dépendances et scripts
```

## Installation

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/Ozescu/parkingappres.git
   cd parkingappres
   ```

2. **Installer le frontend**  
   ```bash
   npm install
   ```
3. **Lancer le frontend**  
   ```bash
   expo start
   ```

4. **Installer le backend Express**  
   ```bash
   cd backend-express
   npm install
   npm start
   ```

5. **Installer le backend Flask**  
   ```bash
   cd ../backend-flask
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python app.py
   ```

## Utilisation

- **Endpoints Express**  
  - `GET /api/parks` : lister les parkings  
  - `POST /api/reservations` : créer une réservation  
  - `DELETE /api/reservations/:id` : annuler une réservation  

- **Endpoints Flask**  
  - `POST /auth/login` : authentification utilisateur  
  - `POST /notifications` : gérer les notifications  

## Contribution

1. Forkez ce dépôt  
2. Créez une branche `feature/ma-fonctionnalité`  
3. Soumettez une Pull Request

## License

Ce projet est sous licence MIT.
