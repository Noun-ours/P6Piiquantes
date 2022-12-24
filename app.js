const express = require('express')
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const path = require('path');
const app = express();
//morgan logger
const morgan = require('morgan')
app.use(morgan("dev"))


//rate-limit 
const rateLimit = require('express-rate-limit')
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
})


app.use(apiLimiter)

// helmet
const helmet = require("helmet");
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);



//dotenv 
require('dotenv').config()


mongoose.connect(process.env.MONGO_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//MiddleWare appliquer a tout les routes du serveur"CORS"
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

//pour gerer les routes app.use() permet d'attribuer un middleware à une route spécifique
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;