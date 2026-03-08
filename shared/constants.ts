import { Product } from "./index";

export const MOCK_PRODUCTS: Partial<Product>[] = [
    {
        id: "1",
        name: "Onyx Deri Biker Ceket",
        description: "Kuzu derisinden üretilmiş, asimetrik fermuar detaylı ve özel dikim slim-fit kesim.",
        price: 3250,
        image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
        category: "Dış Giyim",
        stock: 12
    },
    {
        id: "2",
        name: "Vanguard Koşu Ayakkabısı",
        description: "Nefes alabilen file üst yüzey ve ultra hafif yastıklama teknolojisi ile profesyonel performans.",
        price: 1850,
        image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 25
    },
    {
        id: "3",
        name: "Titanium Diver Saat",
        description: "300 metre su geçirmezlik, safir kristal cam ve titanyum kasa ile zamansız bir klasik.",
        price: 4500,
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        category: "Saat",
        stock: 5
    },
    {
        id: "4",
        name: "Urban Explorer Sırt Çantası",
        description: "Su geçirmez kumaş, 16 inç laptop bölmesi ve ergonomik askı tasarımı.",
        price: 1200,
        image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
        category: "Çanta",
        stock: 15
    },
    {
        id: "5",
        name: "Silver Link Güneş Gözlüğü",
        description: "Polarize camlar ve el yapımı asetat çerçeve ile modern bir görünüm.",
        price: 950,
        image_url: "https://images.unsplash.com/photo-1511499767390-a73c99a65f3d?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 30
    },
    {
        id: "6",
        name: "Minimalist Beyaz Gömlek",
        description: "%100 Mısır pamuğundan üretilmiş, ütü istemeyen özel kumaş teknolojisi.",
        price: 750,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        category: "Üst Giyim",
        stock: 45
    },
    {
        id: "7",
        name: "Indigo Selvedge Denim",
        description: "Japon ipliği ile dokunmuş, ekstra dayanıklı ve zamanla kişiselleşen ham denim.",
        price: 1450,
        image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
        category: "Alt Giyim",
        stock: 20
    },
    {
        id: "8",
        name: "Obsidian Deri Bot",
        description: "İtalyan dana derisi, Goodyear dikiş yapısı ve kaymaz taban.",
        price: 2600,
        image_url: "https://images.unsplash.com/photo-1520639889313-7ef73c65c490?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 10
    },
    {
        id: "9",
        name: "Cashmere Camel Palto",
        description: "Saf kaşmir karışımlı uzun palto, ipek astar ve el dikişi detaylar.",
        price: 5400,
        image_url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
        category: "Dış Giyim",
        stock: 4
    },
    {
        id: "10",
        name: "Graphite Tech Hoodie",
        description: "Yüksek yoğunluklu pamuklu kumaş, gizli fermuarlı cepler ve su itici özellik.",
        price: 850,
        image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
        category: "Üst Giyim",
        stock: 50
    },
    {
        id: "11",
        name: "Nova Akıllı Saat",
        description: "AMOLED ekran, kalp ritmi takibi ve 14 gün pil ömrü sunan modern tasarım.",
        price: 2100,
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        category: "Saat",
        stock: 18
    },
    {
        id: "12",
        name: "Heritage Deri Cüzdan",
        description: "Bitkisel tabaklanmış deri, 8 kart kapasitesi ve RFID engelleyici koruma.",
        price: 450,
        image_url: "https://images.unsplash.com/photo-1627123430985-71df46ff3c22?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 60
    },
    {
        id: "13",
        name: "Zenith Oversize Tişört",
        description: "Ağır gramajlı pamuklu kumaş, düşük omuz kesim ve nefes alabilen doku.",
        price: 420,
        image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7ec6a?auto=format&fit=crop&q=80&w=800",
        category: "Üst Giyim",
        stock: 80
    },
    {
        id: "14",
        name: "Apex Şehir Botu",
        description: "Hafif yapısı ve gelişmiş zemin tutuşu ile hem şehir hem doğa için ideal.",
        price: 1950,
        image_url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 22
    },
    {
        id: "15",
        name: "Velvet Midnight Elbise",
        description: "Özel kadife doku, derin dekolte ve vücudu saran zarif kesim.",
        price: 1750,
        image_url: "https://images.unsplash.com/photo-1539008835158-452778385202?auto=format&fit=crop&q=80&w=800",
        category: "Üst Giyim",
        stock: 14
    },
    {
        id: "16",
        name: "Matte Black Kartlık",
        description: "Alüminyum gövde, kart fırlatma mekanizması ve ultra ince profil.",
        price: 320,
        image_url: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 100
    },
    {
        id: "17",
        name: "Aero Mesh Spor Ayakkabı",
        description: "Maksimum havalandırma, esnek taban ve yastıklama teknolojisi ile günlük konfor.",
        price: 1550,
        image_url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 35
    },
    {
        id: "18",
        name: "Classic Trench Coat",
        description: "Su geçirmeyen kumaş, kemerli bel ve çift sıra düğmeli klasik İngiliz tasarımı.",
        price: 2850,
        image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
        category: "Dış Giyim",
        stock: 12
    },
    {
        id: "19",
        name: "Suede Driver Loafers",
        description: "Yumuşak süet deri, el dikişi detaylar ve sürüş için optimize edilmiş taban.",
        price: 1650,
        image_url: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 18
    },
    {
        id: "20",
        name: "Gold Dial Dress Watch",
        description: "Altın kaplama çelik kasa, minimalist kadran ve kahverengi deri kordon.",
        price: 3800,
        image_url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
        category: "Saat",
        stock: 8
    },
    {
        id: "21",
        name: "Rugged Canvas Duffel",
        description: "Dayanıklı kanvas kumaş, deri detaylar ve geniş iç hacim ile seyahat dostu.",
        price: 1350,
        image_url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800",
        category: "Çanta",
        stock: 12
    },
    {
        id: "22",
        name: "Linen Summer Blazer",
        description: "Hafif keten kumaş, nefes alan yapı ve yaz akşamları için şık kesim.",
        price: 2150,
        image_url: "https://images.unsplash.com/photo-1594932224018-b7157ccf6229?auto=format&fit=crop&q=80&w=800",
        category: "Üst Giyim",
        stock: 15
    },
    {
        id: "23",
        name: "Aviator Gold Gözlük",
        description: "Altın renkli metal çerçeve ve degrade camlar ile ikonik tasarım.",
        price: 1100,
        image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 25
    },
    {
        id: "24",
        name: "Slim Chino Pantolon",
        description: "Esnek pamuklu kumaş, daralan paça ve 5 farklı renk seçeneği.",
        price: 650,
        image_url: "https://images.unsplash.com/photo-1624371414361-e6e8ea43f45c?auto=format&fit=crop&q=80&w=800",
        category: "Alt Giyim",
        stock: 40
    },
    {
        id: "25",
        name: "White Leather Sneaker",
        description: "Tamamı deri dış yüzey, minimalist logo ve dayanıklı kauçuk taban.",
        price: 1750,
        image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 30
    },
    {
        id: "26",
        name: "Wool Mix Scarf",
        description: "Yün karışımlı yumuşak doku, geniş tasarım ve kış boyu sıcaklık.",
        price: 380,
        image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 75
    },
    {
        id: "27",
        name: "Military Field Jacket",
        description: "Dört cepli tasarım, gizli kapüşon ve dayanıklı pamuklu gabardin kumaş.",
        price: 1850,
        image_url: "https://images.unsplash.com/photo-1544022613-e87f17a784d2?auto=format&fit=crop&q=80&w=800",
        category: "Dış Giyim",
        stock: 14
    },
    {
        id: "28",
        name: "Carbon Fiber Wallet",
        description: "Karbon fiber malzeme, hafif ve çizilmelere karşı ekstra dayanıklı.",
        price: 520,
        image_url: "https://images.unsplash.com/photo-1627123430985-71df46ff3c22?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 50
    },
    {
        id: "29",
        name: "Classic Brown Loafers",
        description: "Hakiki deri, makosen dikişler ve ofis şıklığı için ideal tasarım.",
        price: 1950,
        image_url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 15
    },
    {
        id: "30",
        name: "Minimalist Belt",
        description: "Tam boy deri kemer, fırçalanmış çelik toka ve modern genişlik.",
        price: 290,
        image_url: "https://images.unsplash.com/photo-1624222247344-550fb8692941?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 90
    },
    {
        id: "31",
        name: "Tech Cargo Pants",
        description: "Su itici kumaş, çoklu kargo cepler ve ayarlanabilir paça tasarımı.",
        price: 950,
        image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
        category: "Alt Giyim",
        stock: 25
    },
    {
        id: "32",
        name: "Vintage Denim Jacket",
        description: "Eskitilmiş efektli, klasik 4 cep tasarımı ve dayanıklı denim doku.",
        price: 1250,
        image_url: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800",
        category: "Dış Giyim",
        stock: 20
    },
    {
        id: "33",
        name: "Silk Pocket Square",
        description: "Saf ipekten üretilmiş, el dikişi kenarlar ve canlı renk desenleri.",
        price: 220,
        image_url: "https://images.unsplash.com/photo-1598501479155-90b467613075?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 120
    },
    {
        id: "34",
        name: "Chronograph Sports Watch",
        description: "Takimetre bezel, kronometre özelliği ve paslanmaz çelik bilezik.",
        price: 4200,
        image_url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800",
        category: "Saat",
        stock: 7
    },
    {
        id: "35",
        name: "Canvas Tote Bag",
        description: "Ağır hizmet tipi kanvas, deri saplar ve günlük kullanım için geniş hacim.",
        price: 580,
        image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
        category: "Çanta",
        stock: 40
    },
    {
        id: "36",
        name: "Merino Wool Polo",
        description: "İnce dokunmuş merinos yünü, nefes alan yapı ve yumuşak doku.",
        price: 1150,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        category: "Üst Giyim",
        stock: 25
    },
    {
        id: "37",
        name: "Urban Desert Boots",
        description: "Yarı süet deri, hafif taban ve hem günlük hem şık kullanım için uygun.",
        price: 1850,
        image_url: "https://images.unsplash.com/photo-1542838680-17bba363e2a0?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 12
    },
    {
        id: "38",
        name: "Padded Winter Vest",
        description: "Kaz tüyü dolgu, rüzgar geçirmeyen kumaş ve katmanlı giyim için ideal.",
        price: 1450,
        image_url: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&q=80&w=800",
        category: "Dış Giyim",
        stock: 20
    },
    {
        id: "39",
        name: "Wayfarer Classics",
        description: "Siyah asetat çerçeve ve koyu camlar ile modası geçmeyen stil.",
        price: 1050,
        image_url: "https://images.unsplash.com/photo-1509100194014-d49809396daa?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 35
    },
    {
        id: "40",
        name: "Tailored Dress Pants",
        description: "Vizon rengi, ince çizgili desen ve düğmeli yan cep detayları.",
        price: 880,
        image_url: "https://images.unsplash.com/photo-1594932224018-b7157ccf6229?auto=format&fit=crop&q=80&w=800",
        category: "Alt Giyim",
        stock: 18
    },
    {
        id: "41",
        name: "Velvet Loafers",
        description: "Gece mavisi kadife, nakışlı detaylar ve özel davetler için mükemmel seçim.",
        price: 2300,
        image_url: "https://images.unsplash.com/photo-1560769189-18384ce3f99e?auto=format&fit=crop&q=80&w=800",
        category: "Ayakkabı",
        stock: 6
    },
    {
        id: "42",
        name: "Modern Parka Jacket",
        description: "Çıkarılabilir kürk detaylı kapüşon, su geçirmeyen dış yüzey ve termal astar.",
        price: 3450,
        image_url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
        category: "Dış Giyim",
        stock: 8
    },
    {
        id: "43",
        name: "Geometric Gold Pendant",
        description: "14 ayar altın kaplama, geometrik formlu minimalist kolye ucu.",
        price: 1150,
        image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb0ce338?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 22
    },
    {
        id: "44",
        name: "Structured Leather Tote",
        description: "Sert formlu deri yapı, fermuarlı kapama ve ofis şıklığı için uygun tasarım.",
        price: 2450,
        image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
        category: "Çanta",
        stock: 11
    },
    {
        id: "45",
        name: "Cotton Oxford Shirt",
        description: "Kalın dokulu oksford kumaş, düğmeli yaka ve günlük rahatlık.",
        price: 640,
        image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
        category: "Üst Giyim",
        stock: 45
    },
    {
        id: "46",
        name: "Silver Bangle Bracelet",
        description: "Dövme gümüş efekti, açık tasarım ve ayarlanabilir yapı.",
        price: 720,
        image_url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
        category: "Aksesuar",
        stock: 40
    },
    {
        id: "47",
        name: "Performance Gym Shorts",
        description: "Hızlı kuruyan kumaş, esnek yapı ve antrenman için özel dikiş sistemi.",
        price: 480,
        image_url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800",
        category: "Alt Giyim",
        stock: 55
    },
    {
        id: "48",
        name: "Minimal White Tee",
        description: "Süper ince penye kumaş, modern kesim ve her kombine uyum sağlayan doku.",
        price: 320,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        category: "Üst Giyim",
        stock: 100
    },
    {
        id: "49",
        name: "Leather Messenger Bag",
        description: "Zamanla güzelleşen doğal deri, omuz askılı klasik postacı çantası.",
        price: 1850,
        image_url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800",
        category: "Çanta",
        stock: 9
    },
    {
        id: "50",
        name: "Rose Gold Minimalist Watch",
        description: "İnce kasa, hasır kordon ve pembe altın rengi ile zarif görünüm.",
        price: 2950,
        image_url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=800",
        category: "Saat",
        stock: 12
    }
];
