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
   
   

       $query = $baglan1->prepare("INSERT INTO HGS (hgsBakiye,hesapNo,hesapEkNo,plaka) VALUES (:hgsBakiye,:hesapNo,:hesapEkNo,:plaka)
            ");
         $query->bindParam(':hgsBakiye', $hgsBakiye);
         $query->bindParam(':hesapNo', $hesapNo);
         $query->bindParam(':hesapEkNo', $hesapEkNo);
         $query->bindParam(':plaka', $plaka);


       $query2 = $baglan->prepare("UPDATE tblMusteriHesap SET 
        hesapBakiye-= :hesapBakiye 
         WHERE hesapNumarasi = :hesapNumarasi and hesapEkNumarasi= :hesapEkNumarasi  ");
         $query2->bindParam(':hesapBakiye', $hesapBakiye);
         $query2->bindParam(':hesapNumarasi', $hesapNumarasi);
         $query2->bindParam(':hesapEkNumarasi', $hesapEkNumarasi);
    

            $insert = $query->execute();
            $insert1 = $query2->execute();
            if ( $insert && $insert1 )
            {
                echo json_encode("ok");
            }else
            {
                echo json_encode("basarisiz");
            }

  
?>