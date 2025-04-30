## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

Pekiştirmek için buraya notlarımı alıyorum.

> Sadece veritabanı işlemlerini içeren ayrı bir dosya, başka bir dosyada ise sadece tasarımlar olur.
> page.tsx de hepsini birleştiririz.

`/lib/data.ts` dosyasında veritabanından fetchlediğimiz fonksiyonlar yer alır. Örneğin `export async function fetchUser()` gibi.
`/components/card.tsx` ya da `/lib/ui/cards.tsx` dosyasında sadece tasarım bulunur. Dışarıdan aldığımız veriyi(children) görselleştirip yazdırırız.
`page.tsx` dosyasında ise, `data.ts` dosyasındaki fonksiyon ile userlar çekilir, ardından `components/card.tsx` çağrılır, değişken olarak `users` verilir.

    const users = fetchUser(), <Card users=users />


Önce userid çekip, ardından bu userid ile profilde işlem yaptığımız bir senaryoda, işlemleri sırasıyla gerçekleştirmemiz gerektiği için awaitler ile çekeriz.  

<img width="790" alt="awaitler içeren kod parçacığı" src="https://github.com/user-attachments/assets/f4994a29-d233-48e5-a38d-0a91f39922c2" />

Bunun dışında paralel bir şekilde fetch yapmak istiyorsak, Promise.all kullanırız.  

<img width="647" alt="promise.all içeren kod parçacığı" src="https://github.com/user-attachments/assets/039426d1-05fb-4358-9303-93318a04ae10" />

Tüm istekleri tek seferde gönderdiğimiz için websitemiz daha hızlı açılır.
Özetle eğer ardışık bir işleme ihtiyaç duymuyorsak, Promise.all kullanımı tavsiye edilir.

`loading.tsx` dosyası `/app/dashboard` içerisinde olduğu için `/app/dashboard` içerisindeki `/invoices/page.tsx` ve `/customers/page.tsx` dosyalarında da loading skeletonu etkili olur ancak biz skeletonu dashboard'daki tasarıma göre yaptığımız için, yanlış bir tasarım oluşur(bug). Bunu engellemek için gruplama kullanıyoruz. Parantezler ile grup oluşturulur.

![File Structure](https://github.com/oguzhan-developer/NextJS-Deneme/blob/5b7d3662ef0892af556bfe8a7b9aa3a84fa86575/structure.png)
