(function() {
    let HttpService = app.HttpService;
    let View = app.View;
    let http = new HttpService();
    let view = new View();
    let div = document.querySelector(".page-content__wrapper");

    function EditPage(){};

    EditPage.prototype.getId = function() {
        let hash = location.hash;
        return hash.replace('#id=', "");
    };

    
    
    (function(){
        let inctance = new EditPage();
        inctance.getId();
        http.getElementById(inctance.getId())
            .then((data) => {
                let child = view.render('edit', data);
                div.innerHTML = child;
                console.log(data);
            })
    })()
    app.EditPage = EditPage;
})(app);