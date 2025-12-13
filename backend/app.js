// Core Module
const path = require('path');

// External Module
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter=require("./routes/authRouter")
const rootDir = require("./utils/pathutil");
const errorcontroller=require('./controllers/error')
const { default: mongoose } = require('mongoose');
const app = express();
const DB_PATH='mongodb+srv://sharmarachit554_db_user:VQto3C7C1YTWVC1N@rachitdb.mxslh19.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Rachitdb'

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});
app.use(express.static(path.join(rootDir, 'public')))
app.use(session({
  secret: "Rachitxed",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use(authRouter);
app.use(storeRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else {res.redirect("/login");}
})
app.use("/host", hostRouter);

app.use(errorcontroller.pageNotFound)

const PORT=5000;

mongoose.connect(DB_PATH).then(()=>{
    console.log('mongoose connected')
  app.listen(PORT,()=>{
    console.log(`Server running on address http://localhost:${PORT}`)
  })
}
).catch(err =>{
  console.log("Error comes due to mongoose not connected",err)
})
