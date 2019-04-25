'use strict';
// Dom7
var $$ = Dom7;
// Framework7 App main instance
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    routes: routes
});
// Init/Create views
var homeView = app.views.create('#view-home', {
    url: '/'
});
var link = "http://localhost/Reservation/php/gegevens.php";
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Login Screen Demo
function login() {
    var email = $$('#email').val();
    var password = $$('#password').val();
    var userlevel = $$('#usrlevel').val();
    if (!email || !password || !userlevel) {
        app.dialog.alert('Gelieve alles in te vullen & selecteren', 'Lege tekstvelden');
        return;
    }
    else {
        // Close login screen
        var data = {};
        data.email = $$('#email').val();
        data.password = $$('#password').val();
        data.usrlvl = $$('#usrlevel').val();
        data.bewerking = "check";
        console.log(data);
        app.request.post(link, data, function (data) {
            console.log(data);
            var check = data;
            if (check === "success") {
                app.dialog.alert("Sucess", "Login");
                // location.reload();
            }
            else if (check === "no") {
                app.dialog.alert("Probleem", "probleem");
            }
        });
    }
    // Alert username and password
    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
}
//////////////////////////////////////////////////////////////////////////////////////////
var link = "http://localhost/Reservation/php/gegevens.php";
// Register Screen Demo
function register() {
    var firstname = $$('#firstname').val();
    var lastname = $$('#lastname').val();
    var email = $$('#email').val();
    var address = $$('#address').val();
    var housenumber = $$('#housenumber').val();
    var bus = $$('#bus').val();
    var postalcode = $$('#postalcode').val();
    var telnumber = $$('#telnumber').val();
    var phonenumber = $$('#phonenumber').val();
    var password = $$("#password").val();
    if (!firstname || !lastname || !email || !address || !housenumber || !bus || !postalcode || !telnumber || !phonenumber || !password) {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        return;
    }
    else {
        var data = {};
        data.firstname = $$('#firstname').val();
        data.lastname = $$('#lastname').val();
        data.email = $$('#email').val();
        data.address = $$('#address').val();
        data.housenumber = $$('#housenumber').val();
        data.bus = $$('#bus').val();
        data.postalcode = $$('#postalcode').val();
        data.telnumber = $$('#telnumber').val();
        data.phonenumber = $$('#phonenumber').val();
        data.password = $$('#password').val();
        data.bewerking = "add";
        console.log(data);
        app.request.post(link, data, function (data) {
            console.log(data);
            var check = data;
            if (check === 1) {
                app.dialog.alert("Successfull registration", "Registration");
                // location.reload();
            }
            else if (check === 2) {
                app.dialog.alert("Probleem", "probleem");
            }
        });
    }
    // Alert username and password
    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
var link = "http://localhost/Reservation/php/gegevens.php";

function forgotpassword() {
    var email = $$('#email').val();
    if (!email) {
        app.dialog.alert('Gelieve alles in te vullen & selecteren', 'Lege tekstvelden');
        return;
    }
    else {
        // Close login screen
        var data = {};
        data.email = $$('#email').val();
        data.bewerking = "newpassword";
        app.request.post(link, data, function (data) {
            console.log(data);
            var check = data;
            if (check == 1) {
                app.dialog.alert("Email is not registerd", "Forgot Password");
            }
            else if (check == 2) {
                app.dialog.alert("Success", "problem");
            }
        });
    }
    // Alert username and password
    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
}