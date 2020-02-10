(function () {
    const HttpService = app.HttpService;
    const View = app.View;
    const PopUp = app.PopUp;
    const http = new HttpService();
    const popUp = new PopUp();
    const view = new View();
    const skills = new Skills()

    function Skills() {
        this.input = document.querySelector('.profession-about__input');
        this.skills = document.querySelector('.profession__list');
        this.professionList = document.querySelector('.profession__list');
        this.professionAboutInputContainer = document.querySelector('.profession-about__input-wrapper');
    };

    Skills.prototype.listen = function (data) {
        let self = this;

        this.input.addEventListener('keyup', function () {

            let rez = data.filter((element) => {
                let inputValue = self.input.value.trim().toUpperCase();
                let name = element.name.toUpperCase();

                return name.includes(inputValue);
            });

            self.render('profession', rez);
        })
        popUp.popUpDeleteConfirmationBtn.addEventListener('click', function () {
            popUp.showPopUp();
            localStorage.isDeleted = false;
        })
    }

    Skills.prototype.render = function (template, data) {

        let lists = document.querySelector('.profession__list');
        let element = view.render(template, data);
        lists.innerHTML = element;
    }

    function init() {
        http.getData()
            .then((data) => {
                if (localStorage.isDeleted === 'true') {
                    popUp.showPopUp();
                }
                let professions = view.render('profession', data);
                let input = view.render('searchInput');

                skills.professionAboutInputContainer.innerHTML = input;
                skills.professionList.innerHTML = professions;
                return data;
            })
            .then((data) => {
                const skills = new Skills()
                skills.listen(data);
            });
    };

    init();

    skills.professionList.innerHTML = view.render('loader');
})(app);