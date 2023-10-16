const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Book = require("./models/book")
mongoose.connect(
    "mongodb://127.0.0.1:27017/Book",
{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=> console.log("connexion à MongoDB réussie !"))
.catch((e)=>console.log("Connexion à MongoDB échouée!",e))

app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, x-Requested-with,Content, Accept, Content-Type, Authorization"

    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
})
app.use(express.json()) 

// Obtenir la liste des livres
app.get("/api/books",(req,res,next) =>{
   Book.find().then((books)=> res.status(200).json({
    model:books,
    message:"success"
}))
.catch((error)=>{
    res.status(400).json({
        error:error.message,
        message:"Impossible d\'obtenir la liste des livres",
    })
})
})
//Obtenir un livre par son ID
app.get("/api/books/:id",(req,res)=>{
   
    Book.findOne({_id:req.params.id})
    .then((book)=>{
        if(!book){
            res.status(404).json({
                message:"Livre non trouvé",
            })
            return
        }
        res.status(200).json({
            model:book,
            message:"success"
        })
    } )
    .catch((error)=>{
        res.status(400).json({
            error:error.message,
            message:"Impossible d\'obtenir le livre",
        })
    })

})
// Créer un nouveau livre
app.post("/api/books",(req,res)=>{
    const book=new Book(req.body)
    book.save().then(()=>{
    res.status(201).json({
        model:book,
        message:"Livre crée !",
 } )})
 .catch((error)=>{
    res.status(400).json({
        error:error.message,
        message:"Impossible de créer le livre",
    })
})
})
// Mettre à jour un livre
app.patch("/api/books/:id",(req,res)=>{
    Book.findOneAndUpdate({_id:req.params.id},
        req.body,{new:true})
        .then((book)=>{
            if(!book){
                res.status(404).json({
                    message:"Livre non trouvé",
                })
                return
            }else{
                res.status(200).json({
                    model:book,
                    message:"Livre modifié"
                })
            }
        })
        .catch((error)=>res.status(400).json({error:error.message}))
})
//Supprimer un livre
app.delete("/api/books/:id",(req,res)=>{
    Book.deleteOne({_id:req.params.id})
    .then(()=> res.status(200).json({message:"Livre supprimée"}))
    .catch((error)=>res.status(400).json({error}))
})

module.exports=app