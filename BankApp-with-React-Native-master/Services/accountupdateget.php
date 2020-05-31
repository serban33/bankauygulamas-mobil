<?php 
include 'config.php';
session_start();
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
 $musteriId=$_SESSION["musteriId"];
  $query = $baglan->query("SELECT * FROM tblMusteri  WHERE musteriId = '{$musteriId}'  ")->fetchAll(PDO::FETCH_ASSOC);
  if($query!=null)
  {
    echo json_encode($query);
          return $query;
  }
  else{
      $hata="Kişi Bulunamadi";
      return $hata;
  }

?>  
