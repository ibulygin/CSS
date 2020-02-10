(function() {
    let HttpService = app.HttpService;
    let View = app.View;
    let PopUp = app.PopUp;
    let popUp = new PopUp();
    let http = new HttpService();
    let view = new View();
    localStorage.isDeleted = false;
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
        this.skillType = document.querySelectorAll('.skills-type__radio');
        this.telephonyQueue = document.querySelectorAll('.telephony-queue__input');
        //This is select but may be, has to use option
        this.queueGroups = document.querySelectorAll('.queue-groups__option');
        this.btnSave = document.querySelector('.skills-save__save');
        this.btnCancel = document.querySelector('.skills-save__cancel');
        this.btnDelete = document.querySelector('.skills-save__delete');
        this.btnAddTelephonyQueue = document.querySelector('.telephony-queue__button');
        this.description = getElementById(data, this.id);
    };

    function getSkillType(skillType) {
        let skills = skillType;
        for(let i=0; i<skills.length; i++){
            if (skills[i].checked) {
                return skills[i].value
            }
        }
    };

    function getQueueGroups(queueGroups) {
        let groups = queueGroups;
        for(let i=0; i<groups.length; i++){
            if (groups[i].selected === true) {
                return groups[i].value
            }
        }
    }

    function updateProperty(data, newElement){
        let updatedArray = data.map((item)=>{
            if(item.id === this.id){
                item = newElement;
            }
            return item
        });
        return updatedArray;
    }

    function deleteItem(data, id){
        return data.filter((item)=>item.id !== id)
    }
        

    EditPage.prototype.listen = function(data) {
        let self = this;
        this.btnSave.addEventListener('click', function() {
            let newObject = updateProperty.call(self, data, self.getChengeData(self.description));
            console.log();
            self.btnSave.innerHTML = view.render('loader');
            self.btnSave.disabled = false;
            http.update(newObject)
                .then(() => {
                    console.log(getElementById(data, self.id));
                    init();
            });
        });
        this.btnDelete.addEventListener('click', function() {
            // http.remove(self.id);
            // let newObj = deleteItem.call(self, data, self.id);
            // http.update(newObj)
            view.showPopUp();
        });
        this.btnCancel.addEventListener('click', function() {
            let url = location.origin;
            location.replace(url);
            
        });
        popUp.closeBtn.addEventListener('click', function() {
            view.showPopUp();
        });
        popUp.confirmationBtn.addEventListener('click', function() {

            // http.remove(self.id);
            let newObj = deleteItem.call(self, data, self.id);
            http.update(newObj)
                .then(()=>{
                    let url = location.origin;
                    location.replace(url);
                    
                })
                
                localStorage.isDeleted = true;

        });
        popUp.cancelBtn.addEventListener('click', function() {
            view.showPopUp();
        })
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
            "type" : getSkillType(this.skillType),
            "selectedQueueGroups": getQueueGroups(this.queueGroups)
          }
        
    };
    function getElementById(data, id) {
        let rez = null;
        data.map((element => {
            if (element.id === id){
                rez = element
            }
        }))
        return rez;
 };
    
    function init(){
        http.getData()
            .then((data) => {

                let id = getId();

                let elementDAta = getElementById(data, id)

                let child = view.render('edit', elementDAta);
                div.innerHTML = child;
                return data  
            })
            .then((data) => {
                let editPage = new EditPage(data);
                editPage.listen(data);
            })
    };
    init();
    div.innerHTML =  view.render('loader');
    app.EditPage = EditPage;
})(app);