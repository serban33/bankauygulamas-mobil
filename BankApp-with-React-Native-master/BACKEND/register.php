<?php 
include 'config.php';
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);
	$musteriTCKN = $obj["musteriTCKN"];
	$musteriSifre = $obj["musteriSifre"];
	$musteriAd = $obj["musteriAd"];
	$musteriSoyAd = $obj["musteriSoyAd"];
	$musteriMail = $obj["musteriMail"];
	$musteriTelefon = $obj["musteriTelefon"];
	$musteriNumarasi = rand(100000000,999999999);


    if($musteriTCKN!="" && $musteriSifre!="" && $musteriAd!="" && $musteriSoyAd!="" && $musteriMail!="" && 
    	$musteriTelefon!="" ){

			$query = $baglan->prepare("INSERT INTO tblMusteri (musteriAd,musteriSoyAd,musteriMail,musteriSifre,musteriTCKN,musteriTelefon,musteriNumarasi) VALUES (:musteriAd,:musteriSoyAd,:musteriMail,:musteriSifre,:musteriTCKN,:musteriTelefon,:musteriNumarasi)
			");
		 $query->bindParam(':musteriSifre', $musteriSifre);
         $query->bindParam(':musteriAd', $musteriAd);
         $query->bindParam(':musteriTCKN', $musteriTCKN);
         $query->bindParam(':musteriSoyAd', $musteriSoyAd);
         $query->bindParam(':musteriMail', $musteriMail);
         $query->bindParam(':musteriTelefon', $musteriTelefon);
         $query->bindParam(':musteriNumarasi', $musteriNumarasi);
		
			$insert = $query->execute();
			if ( $insert )
			{
			    $last_id = $baglan->lastInsertId();
			    echo json_encode("ok");
			}else
			{
				echo json_encode("kayitli");
			}
	}
	else
	{
		echo json_encode("Basarisiz Kayit");
	}

?>