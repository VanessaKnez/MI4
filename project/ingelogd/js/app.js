/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';
// Dom7
// eslint-disable-next-line no-undef
var $$ = Dom7;
// Framework7 App main instance
// eslint-disable-next-line no-undef
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    // eslint-disable-next-line no-undef
    routes: routes,
});
var userId;
// Function show determinate progressbar and emulate loading
// eslint-disable-next-line no-unused-vars
function profileLoad(inline) 
{
  /*---------------------------------------------------------------------*/ 
  var progress = 0;
  var progressBarEl;
  if (inline) {
    // inline progressbar
    progressBarEl = app.progressbar.show('#demo-determinate-container', 0);
  } else {
    // root progressbar
    progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'blue' : 'blue');
  }
/*---------------------------------------------------------------------*/ 
    // eslint-disable-next-line no-undef
    var database = firebase.database();
    progress = 10;
    app.progressbar.set(progressBarEl, progress);
    // eslint-disable-next-line no-undef
    userId = firebase.auth().currentUser.uid;
    progress = 20;
    app.progressbar.set(progressBarEl, progress);
    var leadsRef = database.ref('gebruiker/' + userId);
    progress = 30;
    app.progressbar.set(progressBarEl, progress);
    leadsRef.on("value", function(snapshot) 
    {
      progress = 45;
      app.progressbar.set(progressBarEl, progress);
        // eslint-disable-next-line no-console
        console.log(snapshot.val());
        var result = snapshot.val();
        progress = 50;
        app.progressbar.set(progressBarEl, progress);
        $$("input#inptUsernameProfiel")[0].value = result.gebruikersnaam;
        progress = 55;
        app.progressbar.set(progressBarEl, progress);
        $$("input#inptCityProfiel")[0].value = result.gemeente;
        progress = 65;
        app.progressbar.set(progressBarEl, progress);
        $$("input#inptGSMProfiel")[0].value = result.GSMnummer;
        progress = 90;
        app.progressbar.set(progressBarEl, progress);
        app.progressbar.hide(progressBarEl);
    }, 
    function (errorObject) 
    {
        // eslint-disable-next-line no-console
        console.log("The read failed: " + errorObject.code);
        app.dialog.alert('Please refresh the page and try again please', 'Error');
    });
}
function updateProfile()
{
    var gebruikersnaam = $$('#inptUsernameProfiel').val();
    var gemeente = $$('#inptCityProfiel').val();
    var GSMnummer = $$('#inptGSMProfiel').val();
    if (!gebruikersnaam || !gemeente || !GSMnummer) {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        return;
    }
    if(GSMnummer.length < 10 )
    {
      app.dialog.alert('Please fill in a valid phone number(too short)', 'Error');
    }
    else if(GSMnummer.length > 10)
    {
      app.dialog.alert('Please fill in a valid phone number(too long)', 'Error');
    }
    else 
    {
        var database = firebase.database();
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('gebruiker/' + userId).update({
            gebruikersnaam: gebruikersnaam,
            gemeente: gemeente,
            GSMnummer : GSMnummer
          }, function(error) {
            if (error) {
              // The write failed...
              app.dialog.alert(error, ' Error');
            } else {
              // Data saved successfully!
              app.dialog.alert('Your data has been modified', 'Success');
              app.views.main.router.navigate("/")
            }
          });
    }
}
// eslint-disable-next-line no-unused-vars
function laadIndexBoeken()
{
  // eslint-disable-next-line no-undef
  var playersRef = firebase.database().ref("boek/");
  // eslint-disable-next-line no-unused-vars
  playersRef.on("child_added", function(data, prevChildKey) 
  {
    var key = data.key;
    
    // eslint-disable-next-line no-undef
    var playersRef2 = firebase.database().ref("boek/" + key);
    playersRef2.on("child_added", function(data, prevChildKey) 
    {
      var boekdata = data.val();
      var boek_ISBN = boekdata.ISBN;
      var boek_auteur = boekdata.auteur;
      var boek_prijs = boekdata.prijs;
      var boek_staat = boekdata.staat;
      var boek_school = boekdata.school;
      var boek_titel = boekdata.titel;
      var boek_verhuur = boekdata.verhuur;  
      var boek_eigenaar = boekdata.eigenaar_id;
      var boek_id = boekdata.boek_id;
      var boek_afbeelding = boekdata.afbeelding;

      var storage = firebase.storage();
      var storageRef = storage.ref();
      var tangRef = storageRef.child(boek_id + "/" + boek_afbeelding);
      tangRef.getDownloadURL().then(function(url)
      {
        var div = document.getElementById('indexBoeken');
        div.innerHTML += "\
            <div class='card card-expandable'>\
              <div class='card-content'>\
                <div style='height: 300px'>\
                <img width='100%' height='100%' src= '"+ url+"'/>\
                  <div class='card-header text-color-white display-block'>\
                      "+boek_titel +"\
                      <br>\
                  </div>\
                  <a href='#' class='link card-close card-opened-fade-in color-white' style='position: absolute; right: 15px; top: 15px'>\
                  <i class='icon f7-icons'>close_round_fill</i>\
                  </a>\
              </div>\
              <div class='card-content-padding'>\
              <p>\
              ISBN: "+boek_ISBN + "<br>\
              titel: " +boek_titel + "<br>\
              auteur: " +boek_auteur +" <br>\
              prijs: " +boek_prijs + "<br>\
              staat: " +boek_staat + "<br>\
              school: " +boek_school + "<br>\
              <br>\
              <label>Add a comment:</label>\
              <textarea id="+boek_id +"></textarea>\
              <button class='col button button-outline button-round' onclick='setTimeout(commentaarToevoegen(`" +boek_id+"`),10)'>Add comment</button>\
              <br>\
              <button class='col button button-outline button-round' onclick='setTimeout(toevoegenAanFavorieten(`" +boek_eigenaar+"`, `" +boek_id +"`),10)' id='"+boek_id +"'>Add to favorites</button>\
              <br>\
              <button class='col button button-outline button-round' onclick='setTimeout(toonCommentaar(`" +boek_id+"`, `" +boek_ISBN+"`),10)'>Show comments</button>\
              </p>\
              <div id=" +boek_ISBN+">\
              </div>\
              </div>\
                </div>\
              </div>"; 
        
      }).catch(function(error) 
      {
        console.error(error);
      });
    });
  });
}
function toevoegenAanFavorieten(eigenaar,id)
{
  var theDataToAdd = id;
  userId = firebase.auth().currentUser.uid;
  var usersRef = firebase.database().ref("favorieten/" + userId);
  usersRef.once('value', function(snapshot) 
  {
    if (snapshot.hasChild(theDataToAdd)) 
    {
      app.dialog.alert("Already exists in favorites", "Error");
    }
    else
    {
      var rootRef = firebase.database().ref();
      var userId = firebase.auth().currentUser.uid;
      var userRef = rootRef.child('favorieten/' + userId + "/" + id);
      userRef.set(
        {
          boekID: id,
          eigenaar_id: eigenaar,
        });
        app.dialog.alert("Book added to your favorites", "Added");
    }
  });



}
var determinateLoading = false;
function addBook(inline)
{
  determinateLoading = true;
  var progressBarEl;
  if (inline) {
      // inline progressbar
    } else {
      // root progressbar
      progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'blue' : 'blue');
    }
    var ISBN = $$('#inptISBNBoekToevoegen').val();
    var titel = $$('#inptTitleBoekToevoegen').val();
    var auteur = $$('#inptAuthorBoekToevoegen').val();
    var staat = $$('#inptStateBoekToevoegen').val();
    var school = $$('#inptSchoolBoekToevoegen').val();
    var verkoopOFVerhuur = $$('select[name=toevoegen_verkoopOfVerhuur]').val();
    var prijs = $$('#inptPriceBoekToevoegen').val();
    var favoriet = $$('select[name=inptSellOrRentBoekToevoegen]').val();
    let e = $('#submitButton').get(0).files[0];
    if (!ISBN || !titel || !auteur || !staat || !school || !verkoopOFVerhuur || !prijs || !e) 
    {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        app.progressbar.hide(progressBarEl); //hide
        return;
    }
    else 
    {
      
    var image = e.name;
      var x = ISBN;
      var isvalid = isValidISBN( x )
      if(isvalid == true)
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
        //upload image 
        const storage = firebase.storage()
        //var file = e.target.files[0];
        let locationRef = storage.ref(boek_id +"/" + e.name);
        let task = locationRef.put(e)
        task.on('state_changed',function progress(snapshot)
                {
                    let per = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                    app.progressbar.set(progressBarEl, per);
                },
                function error(error)
                {
                    console.log(error);
                },
                function complete()
                {
                 
                  if(verkoopOFVerhuur == "rent")
                  {
                      var rootRef = firebase.database().ref();
                      userId = firebase.auth().currentUser.uid;
                      var userRef = rootRef.child('boek/' + userId +"/"+ boek_id);
                      userRef.set({
                                      ISBN: ISBN,
                                      auteur: auteur,
                                      boek_id: boek_id,
                                      eigenaar_id: gebruiker_id,
                                      favoriet: "no",
                                      prijs: prijs,
                                      staat: staat,
                                      school : school,
                                      titel: titel,
                                      verhuur: "yes",
                                      verkoop: "no",
                                      afbeelding : image
                                  })    
                  }
                  else
                  {
                    var rootRef2 = firebase.database().ref();
                    userId = firebase.auth().currentUser.uid;
                    var userRef2 = rootRef2.child('boek/' + userId +"/"+ boek_id);
                    userRef2.set(
                      {
                        ISBN: ISBN,
                        auteur: auteur,
                        boek_id: boek_id,
                        eigenaar_id: gebruiker_id,
                        favoriet: "no",
                        prijs: prijs,
                        staat: staat,
                        titel: titel,
                        school : school,
                        verhuur: "no",
                        verkoop: "yes",
                        afbeelding : image
                      })    
                      app.progressbar.hide(progressBarEl); //hide
                  }
                });

        
        
        app.dialog.alert("Successfully added a book", "Book");
        app.views.main.router.navigate("/");
        location.reload();

      }
      else
      {
        app.dialog.alert("Please check your ISBN code.", "Error");
      }
      function isValidISBN( isbn ) 
      {
        var result = false;
        
        if ( isbn != null ) 
        {
          
          isbn = isbn.replace( /-/g, "" ); // remove '-' symbols
          isbn = isbn.replace( / /g, "" ); // remove whiteSpace
          
          switch ( isbn.length ) 
          {
            
            case 10 :
              result = isValidISBN10( isbn );
              break;
            case 13 :
              result = isValidISBN13( isbn );
              break;
          }
        }
        return result;
      }
      function isValidISBN10( isbn ) 
      {
        
        var result = false;
        
        // ^ - start string
        // \d - digit
        // {9} - nine 
        // \d{9} - nine digits
        // (\d|X) - digit or 'X' char
        // (\d|X){1} - one digit or 'X' char
        // $ - end string
        var regex = new RegExp( /^\d{9}(\d|X){1}$/ );
        
        if ( regex.test( isbn ) ) 
        {
          var sum = 0;
          /*
          * result = (isbn[0] * 1 + isbn[1] * 2 + isbn[2] * 3 + isbn[3] * 4 + ... + isbn[9] * 10) mod 11 == 0
          */		
          for ( var i = 0; i < 9; i++ ) 
          {
            sum += isbn[ i ] * ( i + 1 );
          }
          sum += isbn[ 9 ] == 'X' ? 10 : isbn[ 9 ] * 10;
          result = sum % 11 == 0;
        }
        return result;
      }
      
      function isValidISBN13( isbn ) 
      {
        
        var result = false;

        if ( !isNaN( isbn ) ) 
        { // isNaN - is Not a Number, !isNaN - is a number
          
          var index = 0;
          var sum = 0;
          /*
          * result = (isbn[0] * 1 + isbn[1] * 3 + isbn[2] * 1 + isbn[3] * 3 + ... + isbn[12] * 1) mod 10 == 0
          */		
          for ( var i = 0; i < isbn.length; i++ ) 
          {
            sum += isbn[ i ] * ( isOddNumber( index++ ) ? 3 : 1 );
          }
          
          result = sum % 10 == 0;
        }
        return result;
      }
      function isOddNumber ( value ) 
      {
        return value % 2 != 0;
      }



    }
}

function laadPersoonlijkeBoeken()
{
  userId = firebase.auth().currentUser.uid;
  var playersRef = firebase.database().ref("boek/" +userId );
  playersRef.on("child_added", function(data, prevChildKey) {
  var result = data.val();
  var result_id = result.boek_id;
  var result_prijs = result.prijs;
  var result_auteur = result.auteur;
  var result_staat = result.staat;
  var result_titel = result.titel;
  var result_verhuur = result.verhuur;
  var result_afbeelding = result.afbeelding;
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var tangRef = storageRef.child(result_id + "/" + result_afbeelding);
  tangRef.getDownloadURL().then(function(url)
  {
    var div = document.getElementById('boekendiv');
    div.innerHTML += "\
    <div class='card card-expandable'>\
          <div class='card-content'>\
              <div style='height: 300px'>\
              <img/ width='100%' height='100%' src= '"+ url+"'/>\
                  <div class='card-header text-color-white display-block'>\
                      "+result_titel +"\
                      <br>\
                  </div>\
                  <a href='#' class='link card-close card-opened-fade-in color-white' style='position: absolute; right: 15px; top: 15px'>\
                  <i class='icon f7-icons'>close_round_fill</i>\
                  </a>\
              </div>\
              <div class='card-content-padding'>\
              <p>\
              Author of this book: "+result_auteur+ "\
              You are able to rent this book \
              Price of this book:" + result_prijs+ "\
              <br></br>\
              <button class='col button button-outline button-round' onclick='setTimeout(verwijderBoek(`" +userId+"`, `" +result_id+"`, `" +result_titel+"`, `" +result_afbeelding+"`),10)' id='"+result_id +"'>Remove this book</button>\
              \
              </p>\
              </div>\
          </div>\
      </div>";
      });
    /*<div class="card">
        <div class="card-header">Card header</div>
        <div class="card-content card-content-padding">Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions.</div>
        <div class="card-footer">Card Footer</div>
    </div>*/
});
}
function laadBewaardeBoeken()
{
  userId = firebase.auth().currentUser.uid;
  var playersRef = firebase.database().ref("favorieten/" + userId);
  playersRef.on("value", function(snapshot) 
  {
    snapshot.forEach(function(childSnapshot) 
    {
      var result = childSnapshot.val();
      console.log(result.boekID);
      var eigenaar_ID = result.eigenaar_id;
      var boek_ID = result.boekID;
      var query = firebase.database().ref("boek/" + eigenaar_ID + "/" + boek_ID);
      query.once("value", function(data) 
      {
        var result = data.val();
        var result_id = result.boek_id;
        var result_prijs = result.prijs;
        var result_auteur = result.auteur;
        var result_staat = result.staat;
        var result_titel = result.titel;
        var result_verhuur = result.verhuur;
        var result_afbeelding = result.afbeelding;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var tangRef = storageRef.child(result_id + "/" + result_afbeelding);
        tangRef.getDownloadURL().then(function(url)
        {
          var div = document.getElementById('favorietenBoeken');
            div.innerHTML += "\
            <div class='card card-expandable'>\
                <div class='card-content'>\
                    <div style='height: 300px'>\
                    <img/ width='100%' height='100%' src= '"+ url+"'/>\
                        <div class='card-header text-color-white display-block'>\
                            "+result_titel +"\
                            <br>\
                        </div>\
                        <a href='#' class='link card-close card-opened-fade-in color-white' style='position: absolute; right: 15px; top: 15px'>\
                        <i class='icon f7-icons'>close_round_fill</i>\
                        </a>\
                    </div>\
                    <div class='card-content-padding'>\
                      <p>\
                      Author of this book: "+result_auteur+ "\
                      You are able to rent this book \
                      Price of this book:" + result_prijs+ "<br>\
                      </p>\
                        <button class='col button button-outline button-round' id = "+boek_ID+" onclick='verwijderPersoonlijkeFavoriet(`"+boek_ID+"`, `"+result_titel+"`)'>Remove from favorites</button><br>\
                        <button class='col button button-outline button-round' onclick='  '>View owner's profile</button>\
                    </div>\
                </div>\
            </div>";
        });
            
      });
    });
  });
}
function commentaarToevoegen(x)
{
  var boekID = x;
  var commentaar = $$('#'+boekID).val();
  var today = new Date();
  var timestamp = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear() + " "+ today.getHours() + ":" + today.getMinutes();
  document.getElementById(boekID).value = "";
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 20;
  var chatkey = '';
  for (var i=0; i<string_length; i++) 
  { 
      var rnum = Math.floor(Math.random() * chars.length);
      chatkey += chars.substring(rnum,rnum+1);
  }
  userId = firebase.auth().currentUser.uid;
  var rootRef = firebase.database().ref();
  var userRef = rootRef.child('commentaar/' + boekID +"/"+ userId + "/" + chatkey);
  userRef.set({
                gebruikerID: userId,
                tekst: commentaar,
                toegevoegd: timestamp,
              });
}
function toonCommentaar(x,y)
{
  var boekID = x;
  var ISBN = y;
  // eslint-disable-next-line no-undef
  var playersRef = firebase.database().ref("commentaar/"+ boekID );
  // eslint-disable-next-line no-unused-vars
  playersRef.on("child_added", function(data, prevChildKey) 
  {
    var t = data.key;
    console.log("de gebruikerID's zijn: "+t);
    var gebruikerquery = firebase.database().ref("gebruiker/" +t )
      gebruikerquery.on("value", function(gebruikerinnerquery)
      {
        //console.log(gebruikerinnerquery.val());
        var gebruikersnaam = gebruikerinnerquery.val().gebruikersnaam;
        console.log(gebruikersnaam);
        var innerquery = firebase.database().ref("commentaar/"+ boekID+ "/" + t);
        innerquery.on("child_added", function(innerdata, prevChildKey) 
        {
          var inner = innerdata.val();
          var tekst = inner.tekst;
          var uploadtijd = inner.toegevoegd;
          var gebruikerID = inner.gebruikerID; 
          console.log("de commentkeys zijn: " +innerdata.key);
          console.log("de tekst is: " + tekst);
          var div = document.getElementById(ISBN);
            div.innerHTML += "\
            <div>\
            <p>Uploaded on "+ uploadtijd+"<br>\
            User: "+gebruikersnaam +"<br>\
            "+tekst+ "</p>\
            <hr>\
            </div>";
    
    
        });
      });
  });
}




function verwijderPersoonlijkeFavoriet(val, x)
{ 
  var titel = x;
  userId = firebase.auth().currentUser.uid;
  var ref = "favorieten/" + userId + "/" + val;
  firebase.database().ref(ref).remove()
  .then(function() 
  {
    app.dialog.alert("Book: " + titel + " has sucesfully been reoved from favorites.", "Success");
    app.views.main.router.navigate("/")
    //location.reload();
  })
  .catch(function(error) 
  {
    console.log("Remove failed: " + error.message)
  });
}
function verwijderFavoriet(x, y)
{
  var gebruikerID = x;
  var boekID = y;
  let favorietref = firebase.database().ref('favorieten/' + gebruikerID + "/" + boekID);
  favorietref.remove();
}
function verwijderBoek(w,x, y, z)
{
  var gebruikerID = w;
  var boekID = x;
  var titel = y;
  var afbeelding = z;
  let userRef = firebase.database().ref('boek/' + gebruikerID + "/" + boekID);
  userRef.remove();
  console.log("geruikerID:" + gebruikerID + "\n" + "boekID: " + boekID);
  //location.reload();
  verwijderFavoriet(gebruikerID, boekID);
  verwijderAfbeelding(boekID, afbeelding);
  app.dialog.alert("Book: " + titel + " has sucesfully been deleted.", "Success");
  
}
function verwijderAfbeelding(x, y)
{
  var boekID = x;
  var naam = y;
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var desertRef = storageRef.child(boekID + "/" + naam);
  // Delete the file
  desertRef.delete().then(function() 
  {
    // File deleted successfully
  }).catch(function(error) 
  {
    // Uh-oh, an error occurred!
  });
}
function reloadPage()
{
  location.reload();
}

function logout()
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

function test() {
    var inptisbn = $$('#inptISBNBoekToevoegen').val();
    var trimisbn = inptisbn;
    var restTrimIsbn = trimisbn.substring(0,3);
    var eersteCijfer = trimisbn.substring(0,1);
    var tweedeCijfer = trimisbn.substring(1,2);
    var derdeCijfer = trimisbn.substring(2,3);
    var vierdeCijfer = trimisbn.substring(3,4);
    var vijfdeCijfer = trimisbn.substring(4,5);
    var zesdeCijfer = trimisbn.substring(5,6);
    var zevendeCijfer = trimisbn.substring(6,7);
    var achtsteCijfer = trimisbn.substring(7,8);
    var negendeCijfer = trimisbn.substring(8,9);
    var tiendeCijfer = trimisbn.substring(9,10);
    var elfdeCijfer = trimisbn.substring(10,11);
    var twaalfdeCijfer = trimisbn.substring(11,12);
    //alert(inptisbn);
    if (inptisbn.length == 10)
        {            
            var nieuwEersteCijfer = parseInt(eersteCijfer) * 10;
            var nieuwTweedeCijfer = parseInt(tweedeCijfer) * 9;
            var nieuwDerdeCijfer = parseInt(derdeCijfer) * 8;
            var nieuwVierdeCijfer = parseInt(vierdeCijfer) * 7;
            var nieuwVijfdeCijfer = parseInt(vijfdeCijfer) * 6;
            var nieuwZesdeCijfer = parseInt(zesdeCijfer) * 5;
            var nieuwZevendeCijfer = parseInt(zevendeCijfer) * 4;
            var nieuwAchtsteCijfer = parseInt(achtsteCijfer) * 3;
            var nieuwNegendeCijfer = parseInt(negendeCijfer) * 2;
            
            var totaalCijfer = parseInt(nieuwEersteCijfer) + parseInt(nieuwTweedeCijfer) + parseInt(nieuwDerdeCijfer) + parseInt(nieuwVierdeCijfer) + parseInt(nieuwVijfdeCijfer) + parseInt(nieuwZesdeCijfer) + parseInt(nieuwZevendeCijfer) + parseInt(nieuwAchtsteCijfer) + parseInt(nieuwNegendeCijfer) + parseInt(tiendeCijfer);
            
            var moduloTotaalCijfer = parseInt(totaalCijfer) % 11;
            if (moduloTotaalCijfer != 0) {
                alert("Give a valid ISBN number.");
            }
            
        }
    if (inptisbn.length == 13 && (restTrimIsbn == 978 || restTrimIsbn == 979))
        {            
            var nieuwTweedeCijfer = parseInt(tweedeCijfer) * 3;
            var nieuwVierdeCijfer = parseInt(vierdeCijfer) * 3;
            var nieuwZesdeCijfer = parseInt(zesdeCijfer) * 3;
            var nieuwAchtsteCijfer = parseInt(achtsteCijfer) * 3;
            var nieuwTiendeCijfer = parseInt(tiendeCijfer) * 3;
            var nieuwTwaalfdeCijfer = parseInt(twaalfdeCijfer) * 3;
            
            var totaalCijfer = parseInt(eersteCijfer) + parseInt(nieuwTweedeCijfer) + parseInt(derdeCijfer) + parseInt(nieuwVierdeCijfer) + parseInt(vijfdeCijfer) + parseInt(nieuwZesdeCijfer) + parseInt(zevendeCijfer) + parseInt(nieuwAchtsteCijfer) + parseInt(negendeCijfer) + parseInt(nieuwTiendeCijfer) + parseInt(elfdeCijfer) + parseInt(twaalfdeCijfer);
            
            var moduloTotaalCijfer = parseInt(totaalCijfer) % 10;
            
            if (moduloTotaalCijfer != 0) {
                var checkDigitVanTotaalCijfer = 10 - parseInt(moduloTotaalCijfer);
                if (checkDigitVanTotaalCijfer != 2) {
                    alert ("Give a valid ISBN number.");
                }
            }
            
        }
}