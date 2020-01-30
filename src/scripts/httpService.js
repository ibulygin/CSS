(function() {
    let firebase = app.firebase;

    function HttpService() {
        this.firebase = firebase.database().ref('skills');
    };

    HttpService.prototype.getData = function(){
        // let response = [];

        // this.firebase.on('value', function (snapShot) {
        //     snapShot.forEach(function(childSnapshot){
        //         let childData = childSnapshot.val();
        //         response.push(childData);
        //     });
        // });

        // return response;
        return new Promise(resolve => {
            this.firebase.on('value', function (snapShot) {
                resolve(snapShot.val());
            });
        });
    };

    HttpService.prototype.addData = function(object) {
        this.firebase.push(object);
    };

    HttpService.prototype.getElementById =  function(id) {
       return this.getData().then((data) => {
           return data.find((element => element.id === id))
       })
    }

    app.HttpService = HttpService;
})(app);