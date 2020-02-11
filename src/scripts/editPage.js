(function () {
    const HttpService = app.HttpService;
    const View = app.View;
    const PopUp = app.PopUp;
    const popUp = new PopUp();
    const http = new HttpService();
    const view = new View();
    const pageContentWrapper = document.querySelector('.page-content__wrapper');

    localStorage.isDeleted = false;


    function getId() {
        let hash = location.hash;
        return hash.replace('#id=', '');
    };

    function nodeListToArray(nodeList) {
        let resultArray = Array.prototype.slice.call(nodeList);
        return resultArray.map((item) => item.value);
    };

    function getSkillType(skillType) {
        let skills = skillType;
        for (let i = 0; i < skills.length; i++) {
            if (skills[i].checked) {
                return skills[i].value;
            }
        }
    };

    function getQueueGroups(queueGroups) {
        let groups = queueGroups;
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].selected === true) {
                return groups[i].value;
            }
        }
    };

    function updateProperty(data, newElement) {
        let updatedArray = data.map((item) => {
            if (item.id === this.id) {
                item = newElement;
            }
            return item;
        });
        return updatedArray;
    };




    function EditPage(data) {
        this.id = getId();
        this.skillName = document.querySelector('.edit-skills__input');
        this.skillType = document.querySelectorAll('.skills-type__radio');
        this.telephonyQueue = document.querySelectorAll('.telephony-queue__input');
        this.queueGroups = document.querySelectorAll('.queue-groups__option');
        this.btnSave = document.querySelector('.skills-save__save');
        this.btnCancel = document.querySelector('.skills-save__cancel');
        this.btnDelete = document.querySelector('.skills-save__delete');
        this.btnAddTelephonyQueue = document.querySelector('.telephony-queue__button');
        this.description = getDataById(data, this.id);
    };

    EditPage.prototype.showCheckedSkillType = function (data) {
        let types = this.skillType;
        for (let i = 0; i < types.length; i++) {
            if (types[i].value === data.type) {
                types[i].checked = true;
            }
        }
    };

    EditPage.prototype.showSelectedQueueGroups = function (data) {
        let groups = this.queueGroups;
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].value === data.selectedQueueGroups) {
                groups[i].selected = true;
            }
        }
    }

    EditPage.prototype.listen = function (data) {
        const self = this;

        this.btnSave.addEventListener('click', function () {
            let newObject = updateProperty.call(self, data, self.getChengeData(self.description));
            self.btnSave.innerHTML = view.render('btnLoader');
            self.btnSave.disabled = true;
            http.update(newObject)
                .then(() => {
                    init();
                });
        });

        this.btnDelete.addEventListener('click', function () {
            popUp.showPopUp();
        });

        this.btnCancel.addEventListener('click', function () {
            let url = location.origin;
            location.replace(url);

        });
    }

    EditPage.prototype.getChengeData = function (data) {
        return {
            'description': data.description,
            'id': this.id,
            'name': this.skillName.value,
            'telephonyQueues': nodeListToArray(this.telephonyQueue),
            'type': getSkillType(this.skillType),
            'selectedQueueGroups': getQueueGroups(this.queueGroups)
        }

    };

    function getDataById(data, id) {
        let rezult = null;
        data.map((element => {
            if (element.id === id) {
                rezult = element;
            }
        }))
        return rezult;
    };

    function init() {
        http.getData()
            .then((data) => {
                let skillData = getDataById(data, getId());
                let editSkills = view.render('editSkills', skillData);
                pageContentWrapper.innerHTML = editSkills;
                return data
            })
            .then((data) => {
                let editPage = new EditPage(data);
                editPage.showCheckedSkillType(getDataById(data, getId()));
                editPage.showSelectedQueueGroups(getDataById(data, getId()));
                editPage.listen(data);
                popUp.listen(data, getId());
            })
    };

    init();

    pageContentWrapper.innerHTML = view.render('loader');
    app.EditPage = EditPage;
})(app);