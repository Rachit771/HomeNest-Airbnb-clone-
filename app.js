// Core Module
const path = require('path');

// External Module
const express = require('express');
const cookieParser = require('cookie-parser');
//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter=require("./routes/authRouter")
const rootDir = require("./utils/pathutil");
const errorcontroller=require('./controllers/error')
const { default: mongoose } = require('mongoose');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public')))
app.use(cookieParser());
app.use((req, res, next) => {
  req.isLoggedIn = req.cookies.isLoggedIn === 'true';
  console.log('Parsed isLoggedIn:', req.isLoggedIn);
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  res.redirect("/login");
})
app.use("/host", hostRouter);

app.use(errorcontroller.pageNotFound)

const PORT=3000;
const DB_PATH='mongodb+srv://sharmarachit554_db_user:VQto3C7C1YTWVC1N@rachitdb.mxslh19.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Rachitdb'
mongoose.connect(DB_PATH).then(()=>{
    console.log('mongoose connected')
  app.listen(PORT,()=>{
    console.log(`Server running on address http://localhost:${PORT}`)
  })
}
).catch(err =>{
  console.log("Error comes due to mongoose not connected",err)
})
