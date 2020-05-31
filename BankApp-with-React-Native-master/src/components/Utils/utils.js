export const emailValidator = musteriMail => {
    const re = /\S+@\S+\.\S+/;
  
    if (!musteriMail || musteriMail.length <= 0) return 'Eposta boş bırakılamaz.';
    if (!re.test(musteriMail)) return 'Geçerli bir Eposta girin!';
  
    return '';
  };
  
  export const passValidator = musteriSifre => {
    if (!musteriSifre || musteriSifre.length != 8) return 'Geçerli 8 haneli şifre girin.';
  
    return '';
  };
  
  export const tcknValidator = tckn => {
    if (!tckn || tckn.length != 11) return '11 haneli TCKN girin.';
  
    return '';
  };
  
  export const adsoyadValidator = adsoyad => {
    if (!adsoyad) return 'Ad Soyad girin.';
  
    return '';
  };
  
  export const telValidator = tel => {
    if (!tel || tel.length != 10) return '10 haneli Telefon girin.(5XX XXX XX XX)';
  
    return '';
  };
  
  
  
  export const miktarValidator = miktar => {
    if (!miktar) return 'Lütfen miktar girin.';
  
    return '';
  };
  
  export const aciklamaValidator = aciklama => {
    if (!aciklama) return 'Lütfen Açıklama Girin.';
  
    return '';
  };
  
  export const hesapNoValidator = text => {
    if (!text || text.length < 9) return 'Lütfen 9 haneli geçerli hesapno girin.';
  
    return '';
  };
  
  export const hesapEkNoValidator = text => {
    if (!text || text.length < 4) return 'Lütfen 4 haneli geçerli hesapekno girin.';
  
    return '';
  };
  
  
  
  
  
  
  