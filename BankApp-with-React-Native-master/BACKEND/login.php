<?php 
include 'config.php';
session_start();
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);
	$musteriTCKN = $obj['musteriTCKN'];
	$musteriSifre = $obj['musteriSifre'];
	

    if($musteriTCKN!=""){
		$query = $baglan->query("SELECT * FROM tblMusteri WHERE musteriTCKN = '{$musteriTCKN}' and musteriSifre = '{$musteriSifre}' ")->fetch(PDO::FETCH_ASSOC);
		if ( $query ){
			
			$_SESSION['musteriTCKN']=$query['musteriTCKN'];
			$_SESSION['musteriId']=$query['musteriId'];
			$_SESSION['musteriNumarasi']=$query['musteriNumarasi'];
		   	echo json_encode('ok');	
		   	return $_SESSION['musteriTCKN'];
		   
		}
		else{
			echo json_encode('TCKN veya Şifre Hatalı');
		}
	}else
	{
		echo json_encode("mail girilmedi");
	}


?>