(function () {
    const findASubstring = app.findASubstring;
    const HttpService = app.HttpService;
    const View = app.View;
    function Skills() {
        this.input = document.querySelector('.profession-about__input');
        this.value = this.input.value.trim();
    };

    Skills.prototype.init = function () {
        let self = this;
        this.input.addEventListener('keyup', function () {
            let http = new HttpService();
            let rez = [];
            http.getData()
                .then((data) => {

                    let rez = data.filter((element) => {
                        let value = this.value.toUpperCase();
                        let name = element.name.toUpperCase();
                        return name.includes(value);
                    })
                    console.log(rez);
                    self.render("header", rez)
                })
        })
    }

    Skills.prototype.render = function (template, data) {
        let view = new View();
        view.render(template, data).call(this)
    }
    app.Skills = Skills;
})(app);