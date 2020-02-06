(function() {
    let HttpService = app.HttpService;
    let View = app.View;
    let http = new HttpService();

    function EditPage(){};

    EditPage.prototype.getId = function() {
        let hash = location.hash;
        return hash.replace('#id=', "");
    };

    
    
    (function(){
        let inctance = new EditPage();
        inctance.getId();
        http.getElementById(inctance.getId()).then((data) => console.log(data))
    })()
    app.EditPage = EditPage;
})(app);