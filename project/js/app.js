'use strict';
/*global document, postcodes, confirm, alert, Dom7, Framework7, routes, firebase */

function changeProfile() {
    "use strict";
    var zipcode = document.getElementById("inptZipcodeProfiel").value;
    if (zipcode != "") {
        if (postcodes[zipcode].length > 0) {
            for (var i in postcodes[zipcode]) {
                document.getElementById("inptSchoolProfiel").innerHTML += "<input onclick =look(" + postcodes[zipcode][i].Plaatsnaam + ")>" + "</input>";
            }
        }
        else {
            alert("Onbestaande postcode");
        }
    }
    else {
        alert("Fill in the zipcode.");
    }
}

function test() {
    "use strict";
    var testWaarde = document.getElementById("inptTest").value;
    var divWaarde = document.getElementById("test");
    if (testWaarde != "") {
        divWaarde += (testWaarde + "<br>");
    }
    else {
        alert("Fill in the test.");
    }
}


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
var link = "http://localhost/IM4/php/gegevens.php";

function login() {
    var email = $$('#email').val();
    var wachtwoord = $$('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, wachtwoord).then(function (user) {
        //Successful Login
        var user = firebase.auth().currentUser;
        var userID = user.uid;
        console.log("success");
        var gebruikeremail = $$('#email').val();
        var gebruikerID = user.uid;
        console.log(gebruikerID);
        sessionStorage.setItem("gebruikeremail", gebruikeremail);
        sessionStorage.setItem("IDIngelogdeGebruiker", gebruikerID);
        console.log("gelukt");
        window.location.href = './ingelogd/index.html';
    }).catch(function (error) {
        //Unsuccessful Login 
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        app.dialog.alert(errorMessage, 'Error');
    });
    /*var email = $$('#email').val();
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
    }*/
    // Alert username and password
    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
}

function register() {
    var database = firebase.database();
    var gebruikersnaam = $$('#gebruikersnaam').val();
    var gemeente = $$('#gemeente').val();
    var gsmNummer = $$('#gsmnummer').val();
    var email = $$('#email').val();
    var wachtwoord = $$('#wachtwoord').val();
    var herhaalWachtwoord = $$('#herhaalwachtwoord').val();
    if (!gebruikersnaam || !gemeente || !gsmNummer || !email || !wachtwoord || !herhaalWachtwoord) {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        return;
    }
    else {
        if (gsmNummer.length == 10) {
            console.log("goeie lengte");
            if (wachtwoord == herhaalWachtwoord) {
                console.log("wachtwoorden matchen")
                firebase.auth().createUserWithEmailAndPassword(email, wachtwoord).then(function (user) {
                    //Registration is successful
                    var user = firebase.auth().currentUser;
                    var userID = user.uid;
                    console.log("success");
                    var data = {};
                    data.gebruikersnaam = $$('#gebruikersnaam').val();
                    data.gemeente = $$('#gemeente').val();
                    data.gsmNummer = $$('#gsmnummer').val();
                    data.email = $$('#email').val();
                    data.wachtwoord = $$('#wachtwoord').val();
                    data.bewerking = "add";
                    console.log(data);
                    app.request.post(link, data, function (data) {
                        console.log(data);
                        var check = data;
                        if (check == 1) {
                            var rootRef = firebase.database().ref();
                            var userId = firebase.auth().currentUser.uid;
                            var userRef = rootRef.child('gebruiker/' + userId);
                            userRef.set({
                                    id: userID
                                    , gebruikersnaam: gebruikersnaam
                                    , gemeente: gemeente
                                    , GSMnummer: gsmNummer
                                    , email: email
                                    , wachtwoord: wachtwoord
                                })
                                //ERROR 400 MSS GAAT DIT NIET OP LOCALHOST
                                /*var user = firebase.auth().currentUser;
                                user.sendEmailVerification().then(function() 
                                {
                                    // Email sent.
                                }).catch(function(error) 
                                {
                                    // An error happened.
                                });*/
                            app.dialog.alert("Successfull registration", "Registration");
                            // location.reload();
                            //app.dialog.alert("Successful login", "Login");
                            app.views.main.router.navigate("/")
                        }
                        else if (check == 2) {
                            app.dialog.alert("A problem has occured. please try again", "Error");
                        }
                    });
                }).catch(function (error) {
                    //Registration unsuccessful 
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    app.dialog.alert(errorMessage, 'Error');
                });
            }
            else {
                console.log("wachtwoorden matchen niet");
                app.dialog.alert("Passwords do not match", 'Error');
            }
        }
        else if (gsmNummer.length < 10) {
            console.log("te klein");
        }
        else {
            console.log("te groot");
        }
    }
    // Alert username and password
    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
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
                app.dialog.alert("Success", "Sucess");
            }
        });
    }
    // Alert username and password
    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
}
////////////////////////////////////////////////////////////////////////////
///////////////////JAVASCRIPT CODE BOEKEN_BOEK_TOEVOEGEN////////////////////
////////////////////////////////////////////////////////////////////////////
function AddBook() {
    var inptisbn = document.getElementById("inptISBN").value;
    var titel = document.getElementById("title").value;
    var auteur = document.getElementById("author").value;
    var staat = document.getElementById("state").value;
    var prijs = document.getElementById("price").value;
    //document.getElementById("demo").innerHTML = inptisbn;
    // ervoor zorgen dat de velden ISBN, titel, auteur, staat en prijs niet leeg staan
    if (inptisbn == "" | titel == "" | auteur == "" | staat == "" | prijs == "") {
        alert("Make sure you fill in every needed field.", confirm);
    }
    // ervoor zorgen dat het ISBN veld 10 of 13 karakters bevat
    if (inptisbn.length == 10 | inptisbn.length == 13) {}
    else {
        alert("Fill in a valid ISBN number.", confirm);
    }
}
//}