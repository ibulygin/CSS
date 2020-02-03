(function (app) {
    let HttpService = app.HttpService;
    let http = new HttpService();
    let View = app.View;
    let hi = new View();
    let div = document.querySelector(".page-content__wrapper");
    
    http.getData().then((data) => {
        let child = hi.render('header', data);
        div.innerHTML = child;
    });
    div.innerHTML = "подождите..."
    
})(app);