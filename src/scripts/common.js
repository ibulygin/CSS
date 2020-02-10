(function() {
    let firebaseConfig = {
        apiKey: "AIzaSyDOzkNWaR0wSBDQgdVTkUGBMkw_XkRG4wY",
        authDomain: "friendlychat-64a91.firebaseapp.com",
        databaseURL: "https://friendlychat-64a91.firebaseio.com",
        projectId: "friendlychat-64a91",
        storageBucket: "friendlychat-64a91.appspot.com",
        messagingSenderId: "169400327809",
        appId: "1:169400327809:web:59d1ce423a252a2665f780"
      };
    // Initialize Firebase
    app.firebase = firebase.initializeApp(firebaseConfig);

    function HttpService() {
        this.firebase = firebase.database();
    };

    HttpService.prototype.getData = function(){
        return new Promise(resolve => {
            this.firebase.ref('skills').on('value', function (snapShot) {
                resolve(snapShot.val());
            });
        });
    };

    HttpService.prototype.update = function(obj) {
        return new Promise(resolve => {
            resolve(firebase.database().ref('skills/').set(obj));
        })
    };

    function View() {};

    View.prototype.render = function (templateName, model) {
        templateName = templateName + 'Template';

        const templateElement = document.getElementById(templateName);
        const templateSource = templateElement.innerHTML;
        const renderFn = Handlebars.compile(templateSource);

        return renderFn(model);
    };

    function PopUp() {
        this.self = document.querySelector('.pop-up-template');
        this.closeBtn = document.querySelector('.pop-up-confirmation__close');
        this.cancelBtn = document.querySelector('.pop-up-confirmation__button-restore');
        this.confirmationBtn = document.querySelector('.pop-up-confirmation__button-cancel');
        this.popUpDeleteConfirmationBtn = document.querySelector('.pop-up-delete__button');
    };

    PopUp.prototype.showPopUp = function() {
        this.self.classList.toggle('pop-up-template__invisible');
    }

    app.View = View;
    app.HttpService = HttpService;
    app.PopUp = PopUp;
})(app);