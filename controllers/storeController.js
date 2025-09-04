const Home = require("../Model/homes");
const Favourite=require("../Model/favourite")
exports.getIndex = (req, res, next) => {
  Home.fetchall((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchall((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchall((registeredHomes) => {
      
     const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })

};


exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  })
}


exports.getHomeDetails=(req,res,next)=>{
  const homeId=req.params.homeId;
  console.log('you are at ',homeId)
  Home.findById(homeId,(home)=>{
  if(!home){
      res.redirect('/homes')
    }
  else{
    res.render('store/home-details',{
    home:home,
    pageTitle:"Home Detail",
    currentPage:"Home",
  })
}
 
  })
}
