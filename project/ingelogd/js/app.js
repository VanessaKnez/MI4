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
var link = "http://localhost/IM4_newversion/kitchen-sink/core/ingelogd/php/gegevens.php";
function ProfileLoad() 
{
    var data = {};
    data.bewerking = "loadprofile";
    data.email = sessionStorage.getItem("gebruikeremail");
    console.log(data);
        app.request.post(link, data, function (data) {
        console.log(data);
        var list = JSON.parse(data).data;
        $$("input#verander_gebruikersnaam")[0].value = list[0].gebruikernaam;
        $$("input#verander_gemeente")[0].value = list[0].gemeente;
        $$("input#verander_GSMnummer")[0].value = list[0].GSMnummer;

        });
}
function UpdateProfile()
{
    var firstname = $$('#Profile_firstname').val();
    var lastname = $$('#Profile_lastname').val();
    var email = $$('#Profile_email').val();
    var address = $$('#Profile_address').val();
    var housenumber = $$('#Profile_housenumber').val();
    var bus = $$('#Profile_bus').val();
    var postalcode = $$('#Profile_postalcode').val();
    var telnumber = $$('#Profile_telnumber').val();
    var phonenumber = $$('#Profile_phonenumber').val();
    var password = $$("#Profile_password").val();
    console.log(firstname);
    if (!firstname || !lastname || !email || !address || !housenumber /*|| !bus*/ || !postalcode /*|| !telnumber || !phonenumber*/ || !password) {
        console.log(firstname, lastname, email, address, housenumber, bus, postalcode, telnumber, phonenumber, password);
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        return;
    }
    else {
        var data = {};
        data.firstname = $$('#Profile_firstname').val();
        data.lastname = $$('#Profile_lastname').val();
        data.email = $$('#Profile_email').val();
        data.address = $$('#Profile_address').val();
        data.housenumber = $$('#Profile_housenumber').val();
        data.bus = $$('#Profile_bus').val();
        data.postalcode = $$('#Profile_postalcode').val();
        data.telnumber = $$('#Profile_telnumber').val();
        data.phonenumber = $$('#Profile_phonenumber').val();
        data.password = $$('#Profile_password').val();
        data.bewerking = "UpdateProfile";
        console.log(data);
        app.request.post(link, data, function (data) {
            console.log(data);
            var check = data;
            if (check == 1) {
                app.dialog.alert("Successfully updated your information", "Profile info");
                app.views.main.router.navigate("/")
                // location.reload();
            }
            else if (check == 2) {
                app.dialog.alert("Problem", "Problem");
            }
            else if (check == 3)
            {
                app.dialog.alert("Password must have at least 6 characters", "Error");
            }
        });
    }
}
/*
function laadIndexBoeken()
{
    var playersRef = firebase.database().ref("boek/");
    playersRef.on("child_added", function(data, prevChildKey) {
    var boek = data.val();
    
    var ISBN = boek.ISBN;
    console.log("ISBN: " + ISBN);
    /*<div class="card">
        <div class="card-header">Card header</div>
        <div class="card-content card-content-padding">Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions.</div>
        <div class="card-footer">Card Footer</div>
    </div>
    var div = document.getElementById('indexBoeken');
        div.innerHTML += "\
        <div class='card card-expandable'>\
            <div class='card-content'>\
                <div class='bg-color-red' style='height: 300px'>\
                    <div class='card-header text-color-white display-block'>\
                        Framework7\
                        <br>\
                        <small style='opacity: 0.7'>"+ boek.ISBN+"</small>\
                    </div>\
                    <a href='#' class='link card-close card-opened-fade-in color-white' style='position: absolute; right: 15px; top: 15px'>\
                    <i class='icon f7-icons'>close_round_fill</i>\
                    </a>\
                </div>\
                <div class='card-content-padding'>\
                <p>" + ISBN+ "</p>\
                ...\
                </div>\
            </div>\
        </div>";
   /* document.getElementById("boekendiv").innerHTML = "<div class='card card-expandable'>\
    <div class='card-content'>\
      <div class='bg-color-red' style='height: 300px'>\
        <div class='card-header text-color-white display-block'>\
          Framework7\
          <br>\
          <small style='opacity: 0.7'>Build Mobile Apps</small>\
        </div>\
        <a href='#' class='link card-close card-opened-fade-in color-white' style='position: absolute; right: 15px; top: 15px'>\
          <i class='icon f7-icons'>close_round_fill</i>\
        </a>\
      </div>\
      <div class='card-content-padding'>\
        <p>Framework7 - is a free and open </p>\
        ...\
      </div>\
    </div>\
  </div>";

});
}*/
function AddBook()
{
    var ISBN = $$('#toevoegen_ISBN').val();
    var titel = $$('#toevoegen_titel').val();
    var auteur = $$('#toevoegen_auteur').val();
    var staat = $$('#toevoegen_staat').val();
    var verkoopOFVerhuur = $$('select[name=toevoegen_verkoopOfVerhuur]').val();
    var prijs = $$('#toevoegen_prijs').val();
    var favoriet = $$('select[name=toevoegen_favoriet]').val();
    console.log(ISBN, titel, auteur, staat, verkoopOFVerhuur, prijs, favoriet);
    if (!ISBN || !titel || !auteur || !staat || !verkoopOFVerhuur || !prijs || !favoriet) 
    {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        return;
    }
    else 
    {
        var data = {};
        data.ISBN = $$('#toevoegen_ISBN').val();
        data.titel = $$('#toevoegen_titel').val();
        data.auteur = $$('#toevoegen_auteur').val();
        data.staat = $$('#toevoegen_staat').val();
        data.verkoopOFVerhuur = $$('select[name=toevoegen_verkoopOfVerhuur]').val();
        data.prijs = $$('#toevoegen_prijs').val();
        data.favoriet = $$('select[name=toevoegen_favoriet]').val();
        data.bewerking = "voegBoekToe";
        console.log(data);
        app.request.post(link, data, function (data) {
            var check = data;
            if (check == 1) 
            {
                var gebruiker_id = sessionStorage.getItem("IDIngelogdeGebruiker");
                //boek ID genereren
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var string_length = 20;
                var boek_id = '';
                for (var i=0; i<string_length; i++) 
                {
                    var rnum = Math.floor(Math.random() * chars.length);
                    boek_id += chars.substring(rnum,rnum+1);
                }
                if(verkoopOFVerhuur == "rent")
                {
                    var rootRef = firebase.database().ref();
                    var userId = firebase.auth().currentUser.uid;
                    var userRef = rootRef.child('boek/' + userId +"/"+ boek_id);
                    userRef.set({
                                    ISBN: ISBN,
                                    auteur: auteur,
                                    boek_id: boek_id,
                                    eigenaar_id: gebruiker_id,
                                    favoriet: favoriet,
                                    prijs: prijs,
                                    staat: staat,
                                    titel: titel,
                                    verhuur: "yes",
                                    verkoop: "no"
                                })    
                }
                else
                {
                    var rootRef = firebase.database().ref();
                    var userId = firebase.auth().currentUser.uid;
                    var userRef = rootRef.child('boek/' + userId +"/"+ boek_id);
                    userRef.set({
                                    ISBN: ISBN,
                                    auteur: auteur,
                                    boek_id: boek_id,
                                    eigenaar_id: gebruiker_id,
                                    favoriet: favoriet,
                                    prijs: prijs,
                                    staat: staat,
                                    titel: titel,
                                    verhuur: "no",
                                    verkoop: "yes"
                                })    
                }
                
                app.dialog.alert("Successfully added a book", "Book");
                //app.router.navigate("/");
                app.views.main.router.navigate("/")
                // location.reload();
            }
            else if (check == 2) {
                app.dialog.alert("An error occured", "Error");
            }
        });
    }
}
function laadPersoonlijkeBoeken()
{
    var userId = firebase.auth().currentUser.uid;
    var playersRef = firebase.database().ref("boek/" +userId );
    playersRef.on("child_added", function(data, prevChildKey) {
    var boek = data.val();
    
    var ISBN = boek.ISBN;
    console.log("ISBN: " + ISBN);
    /*<div class="card">
        <div class="card-header">Card header</div>
        <div class="card-content card-content-padding">Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions.</div>
        <div class="card-footer">Card Footer</div>
    </div>*/
    var div = document.getElementById('boekendiv');
        div.innerHTML += "\
        <div class='card card-expandable'>\
            <div class='card-content'>\
                <div class='bg-color-red' style='height: 300px'>\
                    <div class='card-header text-color-white display-block'>\
                        Framework7\
                        <br>\
                        <small style='opacity: 0.7'>"+ boek.ISBN+"</small>\
                    </div>\
                    <a href='#' class='link card-close card-opened-fade-in color-white' style='position: absolute; right: 15px; top: 15px'>\
                    <i class='icon f7-icons'>close_round_fill</i>\
                    </a>\
                </div>\
                <div class='card-content-padding'>\
                <p>" + ISBN+ "</p>\
                ...\
                </div>\
            </div>\
        </div>";
   /* document.getElementById("boekendiv").innerHTML = "<div class='card card-expandable'>\
    <div class='card-content'>\
      <div class='bg-color-red' style='height: 300px'>\
        <div class='card-header text-color-white display-block'>\
          Framework7\
          <br>\
          <small style='opacity: 0.7'>Build Mobile Apps</small>\
        </div>\
        <a href='#' class='link card-close card-opened-fade-in color-white' style='position: absolute; right: 15px; top: 15px'>\
          <i class='icon f7-icons'>close_round_fill</i>\
        </a>\
      </div>\
      <div class='card-content-padding'>\
        <p>Framework7 - is a free and open </p>\
        ...\
      </div>\
    </div>\
  </div>";*/

});
}
function Logout()
{
    firebase.auth().signOut().then(function() 
    {
        // Sign-out successful. 
        sessionStorage.removeItem('gebruikeremail');
        sessionStorage.removeItem("IDIngelogdeGebruiker");
        window.location.href = '../index.html';
      }, function(error) 
      {
        // An error happened.
      });
    
}