import numpy as np

def preprocess_input(features):
    """
    Prépare les données d'entrée pour le modèle.
    :param features: Liste des caractéristiques (features) envoyées par l'utilisateur.
    :return: Tableau numpy prêt pour le modèle.
    """
    # Exemple de prétraitement : normalisation, encodage, etc.
    # Ici, on suppose que les données sont déjà prêtes.
    return np.array(features).reshape(1, -1)