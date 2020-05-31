<?php 
include 'config.php';
session_start();
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);
	$musteriTCKN =$_SESSION["musteriTCKN"];
	$musteriSifre = $obj["musteriSifre"];
	$musteriAd = $obj["musteriAd"];
	$musteriSoyAd = $obj["musteriSoyAd"];
	$musteriMail = $obj["musteriMail"];
	$musteriTelefon = $obj["musteriTelefon"];

   
		$query = $baglan->prepare("UPDATE tblMusteri SET 
				musteriAd= :musteriAd,
				musteriSoyAd= :musteriSoyAd,
				musteriSifre= :musteriSifre,
				musteriTelefon= :musteriTelefon,
				musteriMail= :musteriMail WHERE musteriTCKN = :musteriTCKN");
		 $query->bindParam(':musteriSifre', $musteriSifre);
         $query->bindParam(':musteriAd', $musteriAd);
         $query->bindParam(':musteriSoyAd', $musteriSoyAd);
         $query->bindParam(':musteriMail', $musteriMail);
         $query->bindParam(':musteriTelefon', $musteriTelefon);
         $query->bindParam(':musteriTCKN', $musteriTCKN);
			$insert = $query->execute();
			if ( $insert )
			{

			    echo json_encode("ok");
			}
			else
			{
				
				echo json_encode("Guncelleme Basarisiz");
			}
	


?>