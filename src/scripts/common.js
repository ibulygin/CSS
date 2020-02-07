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

    HttpService.prototype.getElementById = function(id) {
       return this.getData().then((data) => {
           return data.find((element => element.id === id))
       })
    };

    HttpService.prototype.set = function(id, obj) {
        firebase.database().ref('skills/' + id).update(obj)
        .then(function() {
            console.log('Set succeeded');
        })
        .catch(function(error){
            console.log('Remove faled: '+ error.massage)
        });
    };

    HttpService.prototype.remove = function(id) {
        this.firebase.ref('skills/' + id).remove().then(function(){
            console.log('Remove succeeded')
        })
        .catch(function(error) {
            console.log('Remove faled: ' + error.massage)
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

    app.View = View;
    app.HttpService = HttpService;

})(app);