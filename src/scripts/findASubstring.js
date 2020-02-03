(function () {
    function findASubstring(str, subStr) {
        return str.includes(subStr);
    };

    app.findASubstring = findASubstring; 
})(app);