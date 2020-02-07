(function() {
    let HttpService = app.HttpService;
    let View = app.View;
    let http = new HttpService();
    let view = new View();
    let div = document.querySelector('.page-content__wrapper');

    function getId() {
        let hash = location.hash;
        return hash.replace('#id=', "");
    };

    function nodeListToArray(nodeList){
        let arr = Array.prototype.slice.call(nodeList);
        return arr.map((item)=> item.value);
    }

    function EditPage(){
        this.id = getId();
        this.skillName = document.querySelector('.edit-skills__input');
        this.skillType = document.querySelector('.skills-type__radio');
        this.telephonyQueue = document.querySelectorAll('.telephony-queue__input');
        //This is select but may be, has to use option
        this.queueGroups = document.querySelectorAll('.queue-groups__option');
        this.btnSave = document.querySelector('.skills-save__save');
        this.btnCancel = document.querySelector('.skills-save__cancel');
        this.btnDelete = document.querySelector('.skills-save__delete');
        this.btnAddTelephonyQueue = document.querySelector('.telephony-queue__button')
    };

    EditPage.prototype.listen = function(data) {
        let self = this;
        this.btnSave.addEventListener('click', function() {
            http.set(this.id, self.getChengeData(data));
            // console.log(self.getChengeData(data))
        });
        this.btnDelete.addEventListener('click', function() {
            console.log("del");

        });
        this.btnCancel.addEventListener('click', function() {
            console.log("cancel");

        });
    }

    EditPage.prototype.getChengeData = function(data) {
        return {
            "description" : data.description,
            "id" : this.id,
            "name" : this.skillName.value,
            //!!!НЕ ЗАБЫТЬ вытащить значения и преобразовать в массив
            "queueGroups" : nodeListToArray(this.queueGroups),
            //!!!НЕ ЗАБЫТЬ вытащить значения и преобразовать в массив
            "telephonyQueues" : nodeListToArray(this.telephonyQueue),
            "type" : this.skillType
          }
        
    };
    
    (function(){
        http.getElementById(getId())
            .then((data) => {
                let child = view.render('edit', data);
                div.innerHTML = child;
                console.log(data);
                return data  
            })
            .then((data) => {
                let editPage = new EditPage();
                editPage.listen(data)
            })
    })();
    app.EditPage = EditPage;
})(app);