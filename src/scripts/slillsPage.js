(function () {
    const findASubstring = app.findASubstring;
    const HttpService = app.HttpService;
    const View = app.View;
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
            this.skills.innerHTML = "погодите..."
        })
    }

    Skills.prototype.render = function (template, data) {
        let view = new View();
        let lists = document.querySelector('.profession__list');
        let element = view.render(template, data);
        lists.innerHTML = element;
    }
    app.Skills = Skills;
})(app);