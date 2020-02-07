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

    function EditPage(data){
        this.id = getId();
        this.skillName = document.querySelector('.edit-skills__input');
        this.skillType = document.querySelector('.skills-type__radio');
        this.telephonyQueue = document.querySelectorAll('.telephony-queue__input');
        //This is select but may be, has to use option
        this.queueGroups = document.querySelectorAll('.queue-groups__option');
        this.btnSave = document.querySelector('.skills-save__save');
        this.btnCancel = document.querySelector('.skills-save__cancel');
        this.btnDelete = document.querySelector('.skills-save__delete');
        this.btnAddTelephonyQueue = document.querySelector('.telephony-queue__button');
        this.description = getElementById(data, this.id);
    };

    function updateProperty(data, newElement){
        let updatedArray = data.map((item)=>{
            if(item.id === this.id){
                item = newElement;
            }
            return item
        });
        return updatedArray;
    }

    EditPage.prototype.listen = function(data) {
        let self = this;
        this.btnSave.addEventListener('click', function() {
            console.log(updateProperty.call(self, data, self.getChengeData(self.description)));
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
    function getElementById(data, id) {
        return data.find((element => element.id === id))

 };
    
    (function(){
        http.getData()
            .then((data) => {
                let elementDAta = getElementById(data, getId())
                let child = view.render('edit', elementDAta);
                div.innerHTML = child;
                return data  
            })
            .then((data) => {
                let editPage = new EditPage(data);
                editPage.listen(data);
            })
    })();
    app.EditPage = EditPage;
})(app);