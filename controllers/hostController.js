const Home = require("../Model/homes");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    editing:false,
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId=req.params.homeId;
  const editing=req.query.editing ==='true';
  Home.findById(homeId,home=>{
    if(!home){
      console.log('Home not found')
      return res.redirect('/host/host-home-list')
    }
    console.log(home)
    res.render("host/edit-home", {
    editing:editing,
    home:home,
    pageTitle: "Edit your Home",
    currentPage: "host-homes",
  })
  })    
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchall((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id,houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id=id;
  home.save();

  res.redirect("/host/host-home-list");
};
exports.postDeleteHome=(req,res,next)=>{
  const homeId=req.params.homeId;
  Home.deleteById(homeId, error =>{
    if(error){
      console.log('Error while delteing', error)
    }
  })
  res.redirect('/host/host-home-list')
}
