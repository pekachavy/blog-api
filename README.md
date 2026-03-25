# Blog API Backend

## Description

Cette application est une API REST développée avec Node.js et Express permettant la gestion des articles d’un blog.

Elle permet de créer, consulter, modifier, supprimer et rechercher des articles.

Une documentation interactive de l’API est disponible avec Swagger.

Une interface web simple permet également d’utiliser cette API.

---

## Technologies utilisées

* Node.js
* Express.js
* SQLite
* Swagger UI
* HTML / JavaScript (interface web)

---

## Installation

1. Cloner le projet ou télécharger le dossier.

2. Installer les dépendances :

npm install

---

## Lancer le serveur

node server.js

Le serveur démarre sur :

http://localhost:3000

---

## Documentation API (Swagger)

Accessible sur :

http://localhost:3000/api-docs

---

## Endpoints disponibles

### Créer un article

POST /api/articles

Body JSON :

{
"titre":"Test",
"contenu":"Backend Node",
"auteur":"Rayan",
"date":"2026",
"categorie":"Tech",
"tags":"node"
}

---

### Récupérer tous les articles

GET /api/articles

---

### Récupérer un article par ID

GET /api/articles/{id}

---

### Modifier un article

PUT /api/articles/{id}

---

### Supprimer un article

DELETE /api/articles/{id}

---

### Rechercher un article

GET /api/articles/search?query=mot

---

## Interface Web

Ouvrir le fichier :

index.html

Cette interface permet :

* créer un article
* afficher la liste
* rechercher
* supprimer

Elle communique directement avec l’API backend.

---

## Structure du projet

blog-api
│
├── server.js
├── database.js
├── blog.db
├── index.html
├── README.md
└── node_modules

---

## Auteur

PEKA PIEGANG RAYAN CHAVY
