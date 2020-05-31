<?php

$server = "DESKTOP-4KC5QI9";
$database = "BankaDB";
$database1 = "HGS";
$kullaniciadi = "yasin";
$sifre = "qwe123";

try {
     $baglan = new PDO("sqlsrv:Server=$server;Database=$database", $kullaniciadi, $sifre);
     $baglan1 = new PDO("sqlsrv:Server=$server;Database=$database1", $kullaniciadi, $sifre);
} catch ( PDOException $e ){
    echo $e->getMessage();
}
if ($baglan && $baglan1) {

}else {
echo "Başarısız";
}

?>