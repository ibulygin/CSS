(function() {
    let HttpService = app.HttpService;
    let View = app.View;
    let http = new HttpService();
    let view = new View();
    let div = document.querySelector('.page-content__wrapper');

    function EditPage(){
        this.id = this.getId();
        this.skillName = document.querySelector('.edit-skills__input');
        this.skillType = document.querySelector('.skills-type__radio');
        this.telephonyQueue = document.querySelectorAll('.telephony-queue__input');
        //This is select but may be, has to use option
        this.queueGroups = document.querySelectorAll('.queue-groups__select');
        this.btnSave = document.querySelector('.button_confirmation');
        this.btnDelete = document.querySelector('.button_cancel');
        this.btnCancel = document.querySelector('.button_delete');
    };

    EditPage.prototype.getId = function() {
        let hash = location.hash;
        return hash.replace('#id=', "");
    };

    EditPage.prototype.listen = function() {
        this.btnSave.addEventListener('keyup', function() {
            console.log("save");
        });
        this.btnDelete.addEventListener('keyup', function() {
            console.log("del");

        });
        this.btnCancel.addEventListener('keyup', function() {
            console.log("cancel");

        });
    }

    EditPage.prototype.getChengeData = function() {
        return {
            "description" : "Коронавирус лег на папирус",
            "id" : this.id,
            "name" : this.skillName,
            //!!!НЕ ЗАБЫТЬ вытащить значения и преобразовать в массив
            "queueGroups" : this.queueGroups,
            //!!!НЕ ЗАБЫТЬ вытащить значения и преобразовать в массив
            "telephonyQueues" : this.telephonyQueue,
            "type" : this.skillType
          }
    };
    
    (function(){
        let editPage = new EditPage();
        editPage.getId();
        http.getElementById(editPage.getId())
            .then((data) => {
                let child = view.render('edit', data);
                div.innerHTML = child;
                console.log(data);
                editPage.listen();
            })
    })();
    app.EditPage = EditPage;
})(app);