<?php 
include 'config.php';
session_start();
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $musteriId=$_SESSION["musteriId"];
    $hesapAcilisTarihi=date("Y-m-d H:i:s");
    $hesapKapanisTarihi=null;
    $hesapAcikMi=1;
    $hesapBakiye=50;
    $hesapEkNumarasi=EkHesapNoUret($musteriId);
    $hesapNumarasi=$_SESSION["musteriNumarasi"];

       $query = $baglan->prepare("INSERT INTO tblMusteriHesap (hesapNumarasi,musteriId,hesapAcilisTarihi,hesapKapanisTarihi,hesapAcikMi,hesapBakiye,hesapEkNumarasi) VALUES (:hesapNumarasi,:musteriId,:hesapAcilisTarihi,:hesapKapanisTarihi,:hesapAcikMi,:hesapBakiye,:hesapEkNumarasi )
            ");
         $query->bindParam(':hesapAcilisTarihi', $hesapAcilisTarihi);
         $query->bindParam(':hesapKapanisTarihi', $hesapKapanisTarihi);
         $query->bindParam(':hesapAcikMi', $hesapAcikMi);
         $query->bindParam(':hesapBakiye', $hesapBakiye);
         $query->bindParam(':hesapEkNumarasi', $hesapEkNumarasi);
         $query->bindParam(':musteriId', $musteriId);
          $query->bindParam(':hesapNumarasi', $hesapNumarasi);

            $insert = $query->execute();
            if ( $insert )
            {

                echo json_encode("ok");
            }else
            {
                echo json_encode("basarisiz");
            }


     function EkHesapNoUret($a)
    {
    include 'config.php';
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $musteriId =$a;
     
    $query = $baglan->query("SELECT MAX(hesapEkNumarasi) FROM tblMusteriHesap  WHERE musteriId = '{$musteriId}' ")->fetch(PDO::FETCH_ASSOC);
  
    if($query[""]==null){

   
        return 5001;
    }
    else{
$val=$query[""]+1;

        return $val;
    }   

    }
  
 $ekno= EkHesapNoUret($musteriId);
?>