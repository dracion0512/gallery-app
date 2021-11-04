// Importing required modules
const express  = require('express');
const https    = require('https'); 
const fs       = require('fs'); 
const path     = require('path'); 
const cors     = require('cors')
const mongoose = require('mongoose')

async function connectMongoose() {
  /* 
  * use native mongoose server reconnection config
  * if have no need in useUnifiedTopology prop
  */
  try {
    console.log("Connecting to Mongo...")
    const config = { 
      useNewUrlParser: true,  
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true, 
    }
    await mongoose.connect("mongodb://localhost:27017/gallery-app", config)
    console.log("Connected to MongoDB")
  } catch(e) {
    console.error(e)
    setTimeout(connectMongoose, 5000)
  }
}
connectMongoose()

const app = express();

// parse env variables
require('dotenv').config();

if (require('dotenv').config().error) {
  throw require('dotenv').config().error
}

// Configuring port
const port = process.env.PORT || 9000;

// Configure middlewares
app.use(express.json());       // to support JSON-encoded bodies
app.use(cors())
app.set('view engine', 'html');

// Static folder
// app.use(express.static(__dirname + '/views/'));
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/', (req, res) => {
  res.sendFile('index.html')
})
// Defining route middleware
app.use('/api/data', require('./routes/data'));
app.use('/api/auth', require('./routes/auth'));

const keys = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), 
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')) 
};

const sslServer = https.createServer(
  keys,
  app,
)


// Listening to port
sslServer.listen(port);
console.log(`Listening On http://localhost:${port}`);

module.exports = sslServer;
