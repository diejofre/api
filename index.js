require("dotenv").config(); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");

// initialise express
const app = express();

//  mondodb connect
mongoose
.connect(
    process.env.MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// create a schema

const materialSchema = new mongoose.Schema({ 
    nivel:String,
    palabrasClave: String,
    privilegios: Boolean ,
    tipo: String,
    titulo: String,
    urlTitulo: String,
    urlImagen: String,
    descripcion: String
});


// create a model with studentSchema
const Material = mongoose.model('Material', materialSchema);

// get documents
app.get('/api/materials', (req, res) => {
    // find with mongoose without callback
    Material.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// Server listen
app.listen(3001, () => console.log("Server listening to port 3001"));