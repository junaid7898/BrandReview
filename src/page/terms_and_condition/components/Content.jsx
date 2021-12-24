import React from "react";
import vector6 from '../../../assests/images/vector6.png'

const Content = () => {
  return (
    <section className="content">
      <div className="content__intro">
        <h1>Kural ve Sartlar</h1>
        <p>
        SikayetBox'ta dilediğiniz marka hakkında yorumlarınızı ve şikayetlerinizi özgür bir şekilde yazabilirsiniz. Belli sınırlar altında kalmak adına aşağıda belirttiğimiz kurallar geçerlidir.
        </p>
      </div>
      <div className = 'content__detail'>
        <h3>Son Güncelleme Tarihi 21 Aralık 2021</h3>
        <p>
        ŞikayetBox doğru marka ve ürünü bulmak için oluşturulmuş bir platformdur. Bu platform üzerinde yaşadığınız olumlu ve olumsuz tecrübelerinizi paylaşabilir, konu hakkında markalardan destek talebinde bulunabilirsiniz. 
        </p>
        <p>
        Öncelediğimiz en önemli kural, platformumuz üzerinde herhangi bir karalama olmadan yalnızca gerçek ve yaşanmış durumları paylaşıyor olmanız. ŞikayetBox olarak bunu gerçekleştirmek adına tüm hesapları doğrulamakta ve her bir şikayeti editörlerimiz tarafından incelemekteyiz. Eğer karalama amacıyla faaliyette bulunan hesaplar olursa, bu hesapları kapatma hakkımız olduğunu hatırlatmak isteriz.
        </p>

        <svg width="38" height="70" viewBox="0 0 38 70" fill="none" xmlns="http://www.w3.org/2000/svg" className = 'vector4'>
          <path d="M36.949 2.50269C17.4594 4.63185 -17.0323 14.8189 0.917728 38.5339C23.3552 68.1777 43.616 28.3864 18.533 20.9187C-6.55002 13.4509 -3.39456 54.239 -4.88481 69.5633" stroke="#FFCC0D" strokeWidth="5"/>
        </svg>

        <svg width="48" height="44" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg" className = 'vector5'>
          <path d="M40.0156 3L44.1245 17.4031L34.9115 16.2078L35.0329 26.7197L17.936 25.6261L22.0449 40.0292L13.4813 38.1684L2.99985 40.9319" stroke="#357BCE" strokeWidth="5" strokeLinecap="round"/>
        </svg>

        <img className = 'vector6' src = {vector6} alt = 'background'/>
      </div>
      
    </section>
  );
};

export default Content;
