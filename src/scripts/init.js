(function (app) {
 let HttpService = app.HttpService;
 let instance = new HttpService();
 
//  let data = instance.getData();
//  console.log(data);
let f= "1"
instance.getElementById(f).then(console.log);


 
})(app);