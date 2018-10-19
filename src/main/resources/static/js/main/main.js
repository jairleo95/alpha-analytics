pageSetUp();
var pagefunction = function () {
    
    // clears the variable if left blank
    $(".username").text(username);
};

loadScript("../js/notification/SmartNotification.min.js", function () {
    loadScript("../js/app.min.js", pagefunction);
});
