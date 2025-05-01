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

`loading.tsx` dosyası `/app/dashboard` içerisinde olduğu için `/app/dashboard` içerisindeki `/invoices/page.tsx` ve `/customers/page.tsx` dosyalarında da loading skeletonu etkili olur ancak biz skeletonu dashboard'daki tasarıma göre yaptığımız için, yanlış bir tasarım oluşur(bug). Bunu engellemek için gruplama kullanıyoruz. Parantezler ile grup oluşturulur. Gruplamalar dosya yolunu ve URL'sini etkilemez.

![File Structure](https://github.com/oguzhan-developer/NextJS-Deneme/blob/5b7d3662ef0892af556bfe8a7b9aa3a84fa86575/structure.png)

Suspense kullanacaksak, suspense edilecek component'in fetch işlemlerini page.tsx den componentin kendi sayfasına taşırız (öncesinde component sadece tasarımı içeriyordu) ve page.tsx sayfasında sadece Suspense ile component'i çağırırız.  

![suspense](https://github.com/oguzhan-developer/NextJS-Deneme/blob/3feb447afda46e310cac8ac9f0ab4670dc542813/suspense.png)

![Static vs Dynamic](https://github.com/oguzhan-developer/NextJS-Deneme/blob/5ad7c52f8b85981b3ca0de4dcc32e6d7476223a2/static%20vs%20dynamic.avif)

Searchparams(query) kullanarak db'den fetch yaptığımız senaryoda
`Page.tsx` dosyasında props olarak `searchParams` alınır.

    export default async function Page({searchParams})

Daha sonra query component'e children olarak verilir.

    const query = await searchParams.query;
    <Table query = {query} />
Ardından component'te query 'e göre fetch işlemi gerçekleştirilir.
![Component kodu](https://github.com/oguzhan-developer/NextJS-Deneme/blob/3792d3d4a691182d27ea7a56082cae991234c757/kod.png)

Genel bir kural olarak, parametreleri client'dan okumak istiyorsanız  `useSearchParams()` hook'unu kullanın.

Bu senaryoda searchbar'daki her tuş vuruşunda veri tabanına istek atacaktır. Örneğin *anahtar* araması için 7 kez veri tabanına istek atılacaktır, bunu engellemek için **debouncing** kullanılır.
Özetle, timer oluşturulur, her tuş vuruşunda timer yeniden başlar, timer bitene kadar bir tuş vuruşu olmazsa fetch gerçekleşir.
*use-debounce kütüphanesi*
