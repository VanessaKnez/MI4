/* eslint-disable no-console */
/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*'use strict';
// Dom7
var $ = Dom7;

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  routes: routes,
});
*/
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
var config = {
  apiKey: "AIzaSyBdviOyrwvQ1lAuutJfZeEg-rIrYM7xg8c",
  authDomain: "boekenproject-542b9.firebaseapp.com",
  databaseURL: "https://boekenproject-542b9.firebaseio.com",
  projectId: "boekenproject-542b9",
  storageBucket: "boekenproject-542b9.appspot.com",
  messagingSenderId: "508997802635"
};
firebase.initializeApp(config);
var smartSelect = app.smartSelect.get('.smart-select');
var mainView = app.views.create('.view-main');
const storage = firebase.storage()
determinateLoading = false;
function image(inline)
{
    determinateLoading = true;
    var progressBarEl;
    if (inline) {
        // inline progressbar
      } else {
        // root progressbar
        progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'blue' : 'blue');
      }

    const storage = firebase.storage()
    const submitButton = document.getElementById('submitButton');
    let e = $('#submitButton').get(0).files[0];
    //var file = e.target.files[0];
    let locationRef = storage.ref(e.name);
    let task = locationRef.put(e)
    task.on('state_changed',
      function progress(snapshot)
      {
        let per = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        app.progressbar.set(progressBarEl, per);
      },
      function error(error){
        console.log(error);
      },
      function complete(){
        console.log('Done') 
        app.progressbar.hide(progressBarEl); //hide
      }
  );
}
var determinateLoading = false;
function login(inline) 
{
    var progress = 0;
    determinateLoading = true;
    var progressBarEl;
    if (inline) {
      // inline progressbar
      progressBarEl = app.progressbar.show('#demo-determinate-container', 0);
    } else {
      // root progressbar
      progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'blue' : 'blue');
    }
    var email = $$('#inptEmailLogin').val();
    var wachtwoord = $$('#inptPasswordLogin').val();
    progress = 20;
    /*
      app.dialog.alert('your email is  verified', 'Verification');
   
      app.dialog.alert('your email is not verified yet, check your inbox', 'Verification');
*/
    app.progressbar.set(progressBarEl, progress);
    firebase.auth().signInWithEmailAndPassword(email, wachtwoord).then(function(user) 
    {
        progress = 40;
        app.progressbar.set(progressBarEl, progress);
        //Successful Login
        var user = firebase.auth().currentUser;
        progress = 50;
        app.progressbar.set(progressBarEl, progress);
        progress = 70;
        var verified = user.emailVerified;
        if(verified == false)
        {
          app.dialog.alert('Your email is not verified yet, check your inbox', 'Unable to login');
          app.progressbar.hide(progressBarEl); //hide
        }
        else
        {
          app.progressbar.set(progressBarEl, progress);
          var gebruikerID = user.uid;
          console.log(gebruikerID);
          progress = 90;
          app.progressbar.set(progressBarEl, progress);
          sessionStorage.setItem("gebruikeremail", email);
          sessionStorage.setItem("IDIngelogdeGebruiker", gebruikerID);
          progress = 100;
          app.progressbar.set(progressBarEl, progress);
          app.progressbar.hide(progressBarEl);
          window.location.href = './ingelogd/index.html';
        }
        
    }).catch(function(error) 
        {
            progress = 40;
            app.progressbar.set(progressBarEl, progress);
            //Unsuccessful Login 
            var errorCode = error.code;
            var errorMessage = error.message;
            progress = 70;
            app.progressbar.set(progressBarEl, progress);
            console.log(errorMessage);
            progress = 100;
            app.progressbar.set(progressBarEl, progress);
            app.progressbar.hide(progressBarEl);
            app.dialog.alert(errorMessage, 'Error');
                        
        });
}
function registerpagina()
{
    app.views.main.router.navigate("/registreer/")
}
function register(inline) 
{
    var progress = 0;
    determinateLoading = true;
    var progressBarEl;
    if (inline) {
      // inline progressbar
      progressBarEl = app.progressbar.show('#demo-determinate-container', 0);
    } else {
      // root progressbar
      progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'blue' : 'blue');
    }
    var database = firebase.database();
    var gebruikersnaam = $$('#inptFirstNameRegistratie').val();
    var gemeente = $$('#inptCityRegistratie').val();
    var zipcode = $$('#inptZipcodeRegistratie').val();
    var school = $$('#inptSchoolRegistratie').val();
    var richting = $$('#inptRichtingRegistratie').val();
    var gsmNummer = $$('#inptPhoneNumberRegistratie').val();
    var email = $$('#inptEmailRegistratie').val();
    var wachtwoord = $$('#inptPasswordRegistratie').val();
    var herhaalWachtwoord = $$('#inptConfirmPasswordRegistratie').val();
    progress = 10;
    app.progressbar.set(progressBarEl, progress);
    if (!gebruikersnaam || !gemeente || !zipcode|| !school || !richting || !gsmNummer || !email || !wachtwoord || !herhaalWachtwoord) {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        progress = 100;
        app.progressbar.set(progressBarEl, progress);
        app.progressbar.hide(progressBarEl);
        return;
    }
    else 
    {
        if(gsmNummer.length == 10)
        {
            progress = 20;
            app.progressbar.set(progressBarEl, progress);
            console.log("goeie lengte");
            if(wachtwoord == herhaalWachtwoord)
            {
                progress = 30;
                app.progressbar.set(progressBarEl, progress);
                console.log("wachtwoorden matchen")
                firebase.auth().createUserWithEmailAndPassword(email, wachtwoord).then(function(user) 
                {
                    progress = 50;
                    app.progressbar.set(progressBarEl, progress);
                    //Registration is successful
                    var user = firebase.auth().currentUser;
                    var userID = user.uid;
                    console.log("success");
                    
                            progress = 70;
                            app.progressbar.set(progressBarEl, progress);
                            var rootRef = firebase.database().ref();
                            progress = 75;
                            app.progressbar.set(progressBarEl, progress);
                            var userId = firebase.auth().currentUser.uid;
                            progress = 80;
                            app.progressbar.set(progressBarEl, progress);
                            var userRef = rootRef.child('gebruiker/' + userId);
                            progress = 85;
                            app.progressbar.set(progressBarEl, progress);
                            userRef.set({
                                    id: userID,
                                    gebruikersnaam: gebruikersnaam,
                                    gemeente: gemeente,
                                    zipcode: zipcode,
                                    GSMnummer: gsmNummer,
                                    email: email,
                                    wachtwoord: wachtwoord,
                                    school: school,
                                    richting: richting
                              })    
                            progress = 90;
                            app.progressbar.set(progressBarEl, progress);
                              //ERROR 400 MSS GAAT DIT NIET OP LOCALHOST
                            /*var user = firebase.auth().currentUser;
                            user.sendEmailVerification().then(function() 
                            {
                                // Email sent.
                            }).catch(function(error) 
                            {
                                // An error happened.
                            });*/
                            progress = 100;
                            app.progressbar.set(progressBarEl, progress);
                            app.progressbar.hide(progressBarEl);
                            var user = firebase.auth().currentUser;
                            user.sendEmailVerification().then(function() 
                            {
                              // Email sent.
                              
                            }).catch(function(error) 
                            {
                              console.log("no email send");
                              // An error happened.
                            });
                            app.dialog.alert("Successfull registration, please check your mail inbox.", "Registration");
                            // location.reload();
                            //app.dialog.alert("Successful login", "Login");
                            app.views.main.router.navigate("/")
                }).catch(function(error) 
                {
                    //Registration unsuccessful 
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    app.dialog.alert(errorMessage, 'Error');
                        
                });
            }
            else
            {
                console.log("wachtwoorden matchen niet");
                app.dialog.alert("Passwords do not match", 'Error');
            }
        }
        else if(gsmNummer.length < 10) 
        {
            console.log("te klein");
            app.dialog.alert("Phone number is not valid(too small)", 'Error');
            app.progressbar.hide(progressBarEl);
        }
        else if(gsmNummer.length > 10)
        {
            console.log("te groot");
            app.dialog.alert("Please fill in a valid phone number(too big)", 'Error');
            app.progressbar.hide(progressBarEl);
        }          
    }
    // Alert username and password
    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
}
///////////////////////////////////////////////////////////////////////////////////////////////////

function navigateForgotPassword() 
{
    app.views.main.router.navigate("/wachtwoordVergeten/")
    
    
    // Alert username and password
    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
}
function forgotPassword()
{
    var email = $$('#inptEmailWachtwoordVergeten').val();
    if (!email) {
        app.dialog.alert('Gelieve alles in te vullen & selecteren', 'Lege tekstvelden');
        return; 
    }
    else {
      var auth = firebase.auth();
      
      auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
        app.dialog.alert('An email has been send.', 'Send');
      }).catch(function(error) {
        // An error happened.
        app.dialog.alert('We were unable to send an email to the given email.', 'Error');
      });
    }
}