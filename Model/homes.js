const fs=require('fs');
const path=require('path');
const rootdir=require('../utils/pathutil')
const dir=path.join(rootdir,'data','homes.json')
module.exports=class Home{
constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
save(){

  Home.fetchall((registeredHomes=>{
  if(this.id){
    registeredHomes=registeredHomes.map(home=> home.id=== this.id ? this : home);
  }
  else{
    this.id=Math.random().toString();
  registeredHomes.push(this);
  }
  const dir=path.join(rootdir,'data','homes.json')
  fs.writeFile(dir,JSON.stringify(registeredHomes),err=>
  {console.log("File error",err)})
  }))
  
}
static fetchall(Callback){
  const dir=path.join(rootdir,'data/homes.json')
  fs.readFile(dir, (err,data)=>{
  if(!err){
    Callback(JSON.parse(data))
  }
  else{
  Callback([])
  }
})
}
static findById(homeId,Callback){
  this.fetchall((homes)=> {
    const homefound=homes.find(home => home.id===homeId)
    Callback(homefound);
  })
}
static deleteById(homeId,Callback){
  this.fetchall(homes =>{
    homes=homes.filter(home => home.id !==homeId);
      fs.writeFile(dir,JSON.stringify(homes),Callback)
  })
}

}