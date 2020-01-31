(function() {
    let firebase = app.firebase;

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
        firebase.database().ref('skills/' + id).set(obj)
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

    app.HttpService = HttpService;
})(app);