(function (app) {
    let HttpService = app.HttpService;
    let http = new HttpService();
    let View = app.View;
    let hi = new View();
    let div = document.querySelector(".profession__list");
    let abouProf = document.querySelector(".profession-about__input-wrapper");
    http.getData().then((data) => {
        let child = hi.render('header', data);
        let input = hi.render('searchInput');
        abouProf.innerHTML = input;
        div.innerHTML = child;
    });
    div.innerHTML = "подождите..."
    
})(app);