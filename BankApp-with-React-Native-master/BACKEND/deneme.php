<?php 
include 'config.php';
session_start();
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
 $musteriId=$_SESSION["musteriId"];
 $hesapNumarasi=$_SESSION["musteriNumarasi"];
 $hesapEkNumarasi=5007;
  $query = $baglan->query("SELECT hesapBakiye FROM tblMusteriHesap  WHERE hesapNumarasi = '{$hesapNumarasi}' and hesapEkNumarasi='{$hesapEkNumarasi}' ")->fetchAll(PDO::FETCH_ASSOC);
  if($query!=null)
  {
     $a=json_encode($query);
     $someArray = json_decode($a, true);
     echo $someArray[0]["hesapBakiye"]; 
     return $someArray[0]["hesapBakiye"]; 
  }
  else{
      $hata="Hesap Bulunamadi";
      return $hata;
  }

?>  