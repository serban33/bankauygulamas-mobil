<?php 
include 'config.php';
session_start();
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);
	$musteriTCKN =$_SESSION["musteriTCKN"];
	$havaleGonderenHesapNo = $_SESSION["musteriNumarasi"];
	$havaleGonderenEkNo = $obj["havaleGonderenEkNo"];
	$havaleAliciEkNo = $obj["havaleAliciEkNo"];
	$havaleAliciHesapNo = $obj["havaleAliciHesapNo"];
	$bakiye = $obj["bakiye"];
	$havaleTarih = date("Y-m-d H:i:s");
	

   
		$query = $baglan->prepare("INSERT INTO tblHavale (bakiye,havaleTarih,havaleAliciHesapNo,havaleGonderenHesapNo,havaleAliciEkNo,havaleGonderenEkNo) VALUES (:bakiye,:havaleTarih,:havaleAliciHesapNo,:havaleGonderenHesapNo,:havaleAliciEkNo,:havaleGonderenEkNo)
            ");
		$query2 = $baglan->prepare("UPDATE tblMusteriHesap SET 
				hesapBakiye+= :bakiye 
				 WHERE hesapNumarasi = :havaleAliciHesapNo and hesapEkNumarasi= :havaleAliciEkNo  ");
		$query3 = $baglan->prepare("UPDATE tblMusteriHesap SET 
				hesapBakiye-= :bakiye 
				 WHERE hesapNumarasi = :havaleGonderenHesapNo and hesapEkNumarasi= :havaleGonderenEkNo  ");
		 $query->bindParam(':havaleGonderenHesapNo', $havaleGonderenHesapNo);
         $query->bindParam(':havaleAliciHesapNo', $havaleAliciHesapNo);
         $query->bindParam(':bakiye', $bakiye);
         $query->bindParam(':havaleTarih', $havaleTarih);
         $query->bindParam(':havaleGonderenEkNo', $havaleGonderenEkNo);
         $query->bindParam(':havaleAliciEkNo', $havaleAliciEkNo);

		 $query2->bindParam(':bakiye', $bakiye);
         $query2->bindParam(':havaleAliciHesapNo', $havaleAliciHesapNo);
         $query2->bindParam(':havaleAliciEkNo', $havaleAliciEkNo);
         
		 $query3->bindParam(':bakiye', $bakiye);
         $query3->bindParam(':havaleGonderenHesapNo', $havaleGonderenHesapNo);
         $query3->bindParam(':havaleGonderenEkNo', $havaleGonderenEkNo);
	
        
		
			$insert = $query->execute();
			$insert2 = $query2->execute();
            $insert3 = $query3->execute();
			if ( $insert && $insert2 && $insert3 )
			{

			    echo json_encode("ok");
			}
			else
			{
				
				echo json_encode("Guncelleme Basarisiz");
			}
		
	


?>