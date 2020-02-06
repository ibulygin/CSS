(function () {
    const HttpService = app.HttpService;
    const View = app.View;
    let http = new HttpService();
    let hi = new View();
    let div = document.querySelector(".profession__list");
    let abouProf = document.querySelector(".profession-about__input-wrapper");

    function Skills() {
        this.input = document.querySelector('.profession-about__input');
        this.value = this.input.value.trim();
        this.skills = document.querySelector('.profession__list')
    };

    Skills.prototype.init = function () {
        let self = this;
        this.input.addEventListener('keyup', function () {
            let http = new HttpService();

            http.getData()
                .then((data) => {
                    let rez = data.filter((element) => {
                        let value = this.value.toUpperCase();
                        let name = element.name.toUpperCase();
                        return name.includes(value);
                    });

                    self.render('header', rez);
                });
        })
    }

    Skills.prototype.render = function (template, data) {
        let view = new View();
        let lists = document.querySelector('.profession__list');
        let element = view.render(template, data);
        lists.innerHTML = element;
    }
    
    http.getData()
        .then((data) => {
            let child = hi.render('header', data);
            let input = hi.render('searchInput');
            abouProf.innerHTML = input;
            div.innerHTML = child;
            return data;
        })
        .then((data) => {
            let inputValue = new Skills();
            inputValue.init();
        });
        
    div.innerHTML = "подождите..."
})(app);