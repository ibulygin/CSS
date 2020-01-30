(function() {
    let firebase = app.firebase;

    function base() {
        firebase.database().ref('skills').on('value', function (snapShot) {
            snapShot.forEach(function(childSnapshot){
                let childData = childSnapshot.val();
                console.log(childData);
            });
        })
    };

    app.base = base;
})(app);