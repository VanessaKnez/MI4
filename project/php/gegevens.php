<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    require "Connection.php" ; 

  
// bewerking ophalen
// bewerking ophalen
if(isset($_POST['bewerking']))
{
    $bewerking = $_POST['bewerking'];
}

if ($bewerking == "check") 
{
    if (isset($_POST['logUsername']) && isset($_POST['logPassword']) && isset($_POST['usrlvl'])) 
    {
          
        // $_POST['Wachtwoord'] = md5($_POST['Wachtwoord']);
        $Username= $_POST['logUsername'];
        $Password= $_POST['logPassword'];
        $usrlevel= $_POST['usrlvl'];
        $Activated = "";
    }
    else 
    {
        die(json_encode("missing data"));
    }
    $sql = "SELECT * FROM gebruikers where Gebruikersnaam ='$Username'and Wachtwoord ='$Password' and Userlevel ='$usrlevel'";
    $result = $conn->query($sql);
    $count = mysqli_num_rows($result);

    if ($result->num_rows > 0) 
    {
    // output data of each row
        while($row = $result->fetch_assoc()) 
        {
            $Activated = $row['Geactiveerd'];
        }
    }
    if($count ==1)
    {
        if($Activated == "yes")
        {
            echo "success";
        }
        else
        {
            echo "not activated";
        }
    }
    else
    {
        echo "no";
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
?>