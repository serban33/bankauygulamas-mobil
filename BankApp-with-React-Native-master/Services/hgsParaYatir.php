<?php 
include 'config.php';
session_start();
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $musteriId=$_SESSION["musteriId"];
    $hesapEkNumarasi=$obj["hesapEkNo"];
    $hesapEkNo=$obj["hesapEkNo"];
    $hesapNo=$_SESSION["musteriNumarasi"];
    $hesapNumarasi=$_SESSION["musteriNumarasi"];
    $hesapBakiye=$obj["hesapBakiye"];
    $plaka=$obj["plaka"];
    $hgsBakiye=$obj["hesapBakiye"];
   
   

       $query = $baglan1->prepare("UPDATE HGS SET 
                hgsBakiye= :hgsBakiye
                m WHERE plaka = :plaka");
         $query->bindParam(':hgsBakiye', $hgsBakiye);
         $query->bindParam(':plaka', $plaka);
       

            $insert = $query->execute();
          
            if ( $insert  )
            {
                echo json_encode("ok");
            }else
            {
                echo json_encode("basarisiz");
            }

  
?>