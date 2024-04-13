require("dotenv").config(); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')


// initialise express
const app = express();
app.use(express.json())
app.use(cors())

//  mondodb connect
mongoose
    .connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// create a schema

const materialSchema = new mongoose.Schema({
    nivel: String,
    palabrasClave: String,
    privilegios: Boolean,
    tipo: String,
    titulo: String,
    urlTitulo: String,
    urlImagen: String,
    descripcion: String
});


// create a model with studentSchema
const Material = mongoose.model('Material', materialSchema);

const reviewSchema = new mongoose.Schema({
    author: String,
    pictureUrl: String,
    position: String,
});

const Review = mongoose.model('Review', reviewSchema);

// create a model with userShema

const userSchema = new mongoose.Schema({
    email: String
})
const User = mongoose.model("User", userSchema);


// get documents
app.get('/api/materials', (req, res) => {
    Material.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/api/reviews', (req, res) => {
    Review.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// post useremai

app.post('/api/users', (req, res) => {
    const email = req.body.email
    const user = User.findOne({ email });
    if (user) res.send("already exists")
    User.create({ email })
        .then((result) => {
            res.send("user " + result.email + " created");
        })
        .catch((err) => {
            console.log(err);
        });
});



// Server listen
app.listen(3001, () => console.log("Server listening to port 3001"));