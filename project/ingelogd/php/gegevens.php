<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    require "Connection.php" ; 

  
// bewerking ophalen
if(isset($_POST['bewerking']))
{
    $bewerking = $_POST['bewerking'];
}

if ($bewerking == "loadprofile") 
{
    if (isset($_POST['email'])) 
    {
        $Email = $_POST['email'];
    
        if( $result = $conn -> query("SELECT * FROM gebruiker where email ='".$Email."'"))
        {
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
        $return = getJsonObjFromResult($result);
        // maak geheugenresources vrij :
        echo mysqli_free_result($result);
        die($return);
        }
    }
    else 
    {
        die(json_encode("missing data"));
    }

    
}

    elseif ($bewerking == "UpdateProfile") 
    {
        if (isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['email']) && isset($_POST['address']) && isset($_POST['housenumber']) && isset($_POST['bus'])  && isset($_POST['telnumber'])&& isset($_POST['postalcode'])&& isset($_POST['phonenumber'])&& isset($_POST['password'])) 
        {
            // hier MOET je controle plaatsen om o.a. SQL injection 
            // te voorkomen.
            $FirstName= $_POST['firstname'];
            $LastName= $_POST['lastname'];
            $Email= $_POST['email'];
            $Address= $_POST['address'];
            $Housenumber= $_POST['housenumber'];
            $Bus= $_POST['bus'];
            $PostalCode= $_POST['postalcode'];
            $TelNumber= $_POST['telnumber'];
            $PhoneNumber= $_POST['phonenumber'];
            $Password= $_POST['password'];
            $userlvl = "klant";
            
        //  echo $bewerking ,$LastName, $FirstName  , $Email, $Address,$Housenumber, $Bus, $PostalCode, $TelNumber,  $PhoneNumber, $Password  ;
        }else
        {
            die(json_encode("missing data"));
        }
        //$checkEmail = $conn -> query("SELECT * FROM klanten where Email ='$Email'");
        //$countCheckEmail = mysqli_num_rows($checkEmail);

        //if(mysqli_num_rows($checkEmail) == 1){
        //die(json_encode("Dit Email adres bestaat er al, gelieve een ander email adres in te geven"));

            // product toevoegen
        // }else{
        if(strlen($Password) < 6)
        {
            die(json_encode(3));
        }
        else{
            if ($conn -> query("UPDATE klanten SET FirstName='".$FirstName."', LastName = '".$LastName."', Email = '".$Email."', Password = '".$Password."', Address = '".$Address."', HouseNumber = '".$Housenumber."', Bus = '".$Bus."', PostalCode = '".$PostalCode."', TelNumber = '".$TelNumber."', PhoneNumber = '".$PhoneNumber."' WHERE Email = '".$Email."'") === TRUE)
            {
                
                die(json_encode(1));
            }
            else 
            {
                die(json_encode(2));
            }
        }

        
    }
elseif ($bewerking == "add") 
{
    if (isset($_POST['gebruikersnaam']) && isset($_POST['gemeente']) && isset($_POST['gsmNummer']) && isset($_POST['email']) && isset($_POST['wachtwoord'])) 
    {

        // hier MOET je controle plaatsen om o.a. SQL injection 
        // te voorkomen.
        $Gebruikersnaam= $_POST['gebruikersnaam'];
        $Gemeente= $_POST['gemeente'];
        $GsmNummer= $_POST['gsmNummer'];
        $Email= $_POST['email'];
        $Wachtwoord= $_POST['wachtwoord'];
        
     //  echo $bewerking ,$LastName, $FirstName  , $Email, $Address,$Housenumber, $Bus, $PostalCode, $TelNumber,  $PhoneNumber, $Password  ;
    }else
    {
        
        die(json_encode("missing data"));
        
    }
     //$checkEmail = $conn -> query("SELECT * FROM klanten where Email ='$Email'");
     //$countCheckEmail = mysqli_num_rows($checkEmail);

     //if(mysqli_num_rows($checkEmail) == 1){
    //die(json_encode("Dit Email adres bestaat er al, gelieve een ander email adres in te geven"));

         // product toevoegen
    // }else{
        /*$result = $conn -> query("SELECT * FROM klanten where Email = '$Email'");
        $count = mysqli_num_rows($result);

        if ($count == 1 ) 
        {
            die(json_encode(3));
        }
        else
        {*/
            if ($conn -> query("INSERT INTO gebruiker ( gebruikernaam, gemeente, GSMnummer, email, wachtwoord) values( '".$Gebruikersnaam."','".$Gemeente."','".$GsmNummer."','".$Email."', '".$Wachtwoord."')") === TRUE) 
            {
                die(json_encode(1));
            }
            else 
            {
                die(json_encode(2));
            }
        
    

}

elseif ($bewerking == "forgot") 
{
    if (isset($_POST['forgotEmail'])) 
    {
        // hier MOET je controle plaatsen om o.a. SQL injection 
        // te voorkomen.
        $Email= $_POST['forgotEmail'];
    }
    else
    {
        die(json_encode("missing data"));
        
    }
     //$checkEmail = $conn -> query("SELECT * FROM klanten where Email ='$Email'");
     //$countCheckEmail = mysqli_num_rows($checkEmail);

     //if(mysqli_num_rows($checkEmail) == 1){
    //die(json_encode("Dit Email adres bestaat er al, gelieve een ander email adres in te geven"));

         // product toevoegen
    // }else{   

   $result = $conn -> query("SELECT * FROM klanten where Email = '$Email'");
   $count = mysqli_num_rows($result);
    if ($count == 1 ) 
    { 
        
        //nieuw wachtwoord genereren
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-=';
        $charactersLength = strlen($characters);
        $randomPassword = '';
        $length = 8;
        for ($i = 0; $i < $length; $i++) 
        {
            $randomPassword .= $characters[rand(0, $charactersLength - 1)];
        }
        $to      = $Email;  
        $subject = 'Forgot Password';
        $message = "Forgot Password: 
        We generated a new password for you. 
        Your new password is '$randomPassword'";
        $headers = 'From: info@example.com';
        
        mail($to, $subject, $message, $headers);
        $result = $conn -> query("UPDATE klanten SET Password = '$randomPassword' where Email = '$Email'");
        echo "success";
    } 
    else
    {
        echo "no";
    }
}
elseif ($bewerking == "voegBoekToe") 
{
    if (isset($_POST['ISBN']) && isset($_POST['titel']) && isset($_POST['auteur']) && isset($_POST['staat']) && isset($_POST['verkoopOFVerhuur']) && isset($_POST['prijs']) && isset($_POST['favoriet'])) 
    {

        // hier MOET je controle plaatsen om o.a. SQL injection 
        // te voorkomen.
        $ISBN= $_POST['ISBN'];
        $titel= $_POST['titel'];
        $auteur= $_POST['auteur'];
        $staat= $_POST['staat'];
        $verkoopOfVerhuur= $_POST['verkoopOFVerhuur'];
        $prijs= $_POST['prijs'];
        $favoriet= $_POST['favoriet'];
        $yes = "yes";
        $no = "no";
        
     //  echo $bewerking ,$LastName, $FirstName  , $Email, $Address,$Housenumber, $Bus, $PostalCode, $TelNumber,  $PhoneNumber, $Password  ;
    }else
    {
        
        die(json_encode("missing data"));
        
    }
     //$checkEmail = $conn -> query("SELECT * FROM klanten where Email ='$Email'");
     //$countCheckEmail = mysqli_num_rows($checkEmail);

     //if(mysqli_num_rows($checkEmail) == 1){
    //die(json_encode("Dit Email adres bestaat er al, gelieve een ander email adres in te geven"));

         // product toevoegen
    // }else{
        /*$result = $conn -> query("SELECT * FROM klanten where Email = '$Email'");
        $count = mysqli_num_rows($result);

        if ($count == 1 ) 
        {
            die(json_encode(3));
        }
        else
        {*/
            if($verkoopOfVerhuur == "sell")
            {
                if ($conn -> query("INSERT INTO boek ( ISBN, titel, auteur, staat, verkoop, verhuur, prijs, favoriet) values( '".$ISBN."','".$titel."','".$auteur."','".$staat."', '".$yes."', '".$no."', '".$prijs."', '".$favoriet."')") === TRUE) 
                {
                    die(json_encode(1));
                }
                else 
                {
                    die(json_encode(2));
                }
            }
            else
            {
                if ($conn -> query("INSERT INTO boek ( ISBN, titel, auteur, staat, verkoop, verhuur, prijs, favoriet) values( '".$ISBN."','".$titel."','".$auteur."','".$staat."', '".$no."' , '".$yes."', '".$prijs."', '".$favoriet."')") === TRUE) 
                {
                    die(json_encode(1));
                }
                else 
                {
                    die(json_encode(2));
                }
            }
}
function getJsonObjFromResult(&$result)
    {
        // de & voor de parameter zorgt er voor dat we de de parameter
        // by reference doorgeven, waardoor deze niet gekopieerd word
        // naar een nieuwe variabele voor deze functie.

        $fixed = array();
        
        $typeArray = array(
                        MYSQLI_TYPE_TINY, MYSQLI_TYPE_SHORT, MYSQLI_TYPE_INT24,    
                        MYSQLI_TYPE_LONG, MYSQLI_TYPE_LONGLONG,
                        MYSQLI_TYPE_DECIMAL, 
                        MYSQLI_TYPE_FLOAT, MYSQLI_TYPE_DOUBLE );
        $fieldList = array();
        // haal de veldinformatie van de velden in deze resultset op
        while($info = $result->fetch_field()){
            $fieldList[] = $info;
        }
        // haal de data uit de result en pas deze aan als het veld een
        // getaltype zou moeten bevatten
        while ($row = $result -> fetch_assoc()) {
            $fixedRow = array();
            $teller = 0;

            foreach ($row as $key => $value) {
                if (in_array($fieldList[$teller] -> type, $typeArray )) {
                    $fixedRow[$key] = 0 + $value;
                } else {
                    $fixedRow[$key] = $value;
                }
                $teller++;
            }
            $fixed[] = $fixedRow;
        }

        // geef een json object terug
        return '{"data":'.json_encode($fixed).'}';
    }
?>