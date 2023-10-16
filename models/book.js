const mongoose=require("mongoose")
const bookSchema=mongoose.Schema({
    title:{ 
        type:String,
        required:true,
        minlength: 3, // Titre doit avoir au moins 3 caractères
        maxlength: 100 // Titre ne peut pas dépasser 100 caractères
    },
    author: { 
        type:String,
        required:true,
        minlength: 3, 
        maxlength: 100 
    },
    genre: { 
        type:String,
        required:true,
        enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery']
    },
    year: { 
        type:Number,
        required:true
    },
    pages: {
        type: Number,
        required: true,
        min: 1, // Le nombre de pages doit être au moins 1
        max: 5000 // Le nombre de pages ne peut pas dépasser 5000
    },
    isAvailable: {
        type: Boolean,
        required: false
    },
    publicationDate: {
        type: Date,
        default: Date.now
    },
    publisher: { 
        type:String,
        required:false,
        minlength: 3, 
        maxlength: 100 
    },
})
module.exports= mongoose.model("Book",bookSchema)