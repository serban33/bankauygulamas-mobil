<?php 
include 'config.php';
session_start();
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);
	$musteriTCKN =$_SESSION["musteriTCKN"];
	$hesapNumarasi = $_SESSION["musteriNumarasi"];
	$aliciEkNumarasi = $obj["aliciEkNumarasi"];
	$gonderilenbakiye = $obj["gonderilenbakiye"];
	$gonderilenTarih = date("Y-m-d H:i:s");
	$gonderenEkNumarasi = $obj["gonderenEkNumarasi"];
	

function HesapBakiyeBul($a,$b)
    {
    include 'config.php';
    $json = file_get_contents('php://input');	
    $obj = json_decode($json,true);
    $hesapNumarasi =$a;
    $gonderenEkNumarasi=$b;
   $bakiyesorgu = $baglan->query("SELECT hesapBakiye FROM tblMusteriHesap  WHERE hesapNumarasi = '{$hesapNumarasi}' and hesapEkNumarasi='{$gonderenEkNumarasi}'");
    $insert5 = $bakiyesorgu->execute();
     
    if($insert5==null){

   
        return false;
    }
    else{

     
        return $insert5;
    }   

    }
  
 $ekno= HesapBakiyeBul($hesapNumarasi,$gonderenEkNumarasi);
         if($gonderilenbakiye>$ekno  )
         {
         	return json_encode("Bakiye Hatası");


         }

         else
         {


		
      
		$query = $baglan->prepare("INSERT INTO tblVirman (hesapNumarasi,aliciEkNumarasi,gonderilenbakiye,gonderilenTarih,gonderenEkNumarasi) VALUES (:hesapNumarasi,:aliciEkNumarasi,:gonderilenbakiye,:gonderilenTarih,:gonderenEkNumarasi)
            ");
		$query2 = $baglan->prepare("UPDATE tblMusteriHesap SET 
				hesapBakiye+= :gonderilenbakiye 
				 WHERE hesapNumarasi = :hesapNumarasi and hesapEkNumarasi= :aliciEkNumarasi  ");
		 $query3 = $baglan->prepare("UPDATE tblMusteriHesap SET 
				hesapBakiye-= :gonderilenbakiye 
				 WHERE hesapNumarasi = :hesapNumarasi and hesapEkNumarasi= :gonderenEkNumarasi  ");
		 $query->bindParam(':hesapNumarasi', $hesapNumarasi);
         $query->bindParam(':aliciEkNumarasi', $aliciEkNumarasi);
         $query->bindParam(':gonderilenbakiye', $gonderilenbakiye);
         $query->bindParam(':gonderilenTarih', $gonderilenTarih);
         $query->bindParam(':gonderenEkNumarasi', $gonderenEkNumarasi);

		 $query2->bindParam(':gonderilenbakiye', $gonderilenbakiye);
         $query2->bindParam(':hesapNumarasi', $hesapNumarasi);
         $query2->bindParam(':aliciEkNumarasi', $aliciEkNumarasi);
         
		 $query3->bindParam(':gonderilenbakiye', $gonderilenbakiye);
         $query3->bindParam(':hesapNumarasi', $hesapNumarasi);
         $query3->bindParam(':gonderenEkNumarasi', $gonderenEkNumarasi);
	     
        
		 
            
            $insert = $query->execute();
			$insert2 = $query2->execute();
            $insert3 = $query3->execute();
             if ( $insert && $insert2 && $insert3  )
			{

			    echo json_encode("ok");
			    echo json_encode($insert5);
			}
			else
			{
				
				echo json_encode("Guncelleme Basarisiz");
			}
            
		 }	  



?>