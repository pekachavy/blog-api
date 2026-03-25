const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./blog.db', (err)=>{
    if(err){
        console.log("Erreur connexion DB", err)
    }else{
        console.log("Database connected")
    }
})

db.serialize(()=>{

    db.run(`
        CREATE TABLE IF NOT EXISTS articles(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            contenu TEXT,
            auteur TEXT NOT NULL,
            date TEXT,
            categorie TEXT,
            tags TEXT
        )
    `)

})

module.exports = db
