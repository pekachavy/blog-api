const express = require('express')
const cors = require('cors')
const db = require('./database')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const app = express()
app.use(express.json())
app.use(cors())

// Swagger Config
const options = {
definition:{
openapi:"3.0.0",
info:{
title:"API Blog",
version:"1.0.0",
description:"Documentation de l'API backend de gestion des articles de blog"
},
servers:[
{url:"http://localhost:3000",description:"Serveur local"}
]
},
apis:["./server.js"]
}

const specs = swaggerJsdoc(options)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs))

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     description: Permet d'ajouter un article dans la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             titre: Test
 *             contenu: Backend Node
 *             auteur: Rayan
 *             date: 2026
 *             categorie: Tech
 *             tags: node
 *     responses:
 *       201:
 *         description: Article créé
 */
app.post('/api/articles',(req,res)=>{
const {titre,contenu,auteur,date,categorie,tags}=req.body

db.run(
`INSERT INTO articles(titre,contenu,auteur,date,categorie,tags) VALUES(?,?,?,?,?,?)`,
[titre,contenu,auteur,date,categorie,tags],
function(err){
if(err) return res.status(500).send(err)
res.status(201).send({id:this.lastID})
})
})

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     description: Permet de consulter la liste complète des articles
 */
app.get('/api/articles',(req,res)=>{
db.all("SELECT * FROM articles",[],(err,rows)=>{
if(err) return res.status(500).send(err)
res.send(rows)
})
})

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher un article
 *     description: Recherche par mot clé dans le titre ou le contenu
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 */
app.get('/api/articles/search',(req,res)=>{
let q='%'+req.query.query+'%'

db.all(
"SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?",
[q,q],
(err,rows)=>{
if(err) return res.status(500).send(err)
res.send(rows)
})
})

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 */
app.get('/api/articles/:id',(req,res)=>{
db.get("SELECT * FROM articles WHERE id=?",[req.params.id],
(err,row)=>{
if(err) return res.status(500).send(err)
res.send(row)
})
})

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Mettre à jour un article
 */
app.put('/api/articles/:id',(req,res)=>{
const {titre,contenu,categorie,tags}=req.body

db.run(
"UPDATE articles SET titre=?,contenu=?,categorie=?,tags=? WHERE id=?",
[titre,contenu,categorie,tags,req.params.id],
function(err){
if(err) return res.status(500).send(err)
res.send({message:"Article mis à jour"})
})
})

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 */
app.delete('/api/articles/:id',(req,res)=>{
db.run("DELETE FROM articles WHERE id=?",[req.params.id],
function(err){
if(err) return res.status(500).send(err)
res.send({message:"Article supprimé"})
})
})

app.listen(3000,()=>console.log("API BLOG READY"))
