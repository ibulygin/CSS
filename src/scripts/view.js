(function () {
    function View() {};

    View.prototype.render = function (templateName, model) {
        templateName = templateName + 'Template';

        const templateElement = document.getElementById(templateName);
        const templateSource = templateElement.innerHTML;
        const renderFn = Handlebars.compile(templateSource);

        return renderFn(model);
    };

    app.View = View;
})(app);