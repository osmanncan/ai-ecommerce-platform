<div align="center">

# ✦ AURA — AI-First E-Commerce Platform

**Yapay zeka destekli, yeni nesil lüks moda e-ticaret platformu.**

Next.js · React Native (Expo) · Supabase · Groq AI · TypeScript

---

</div>

## 📖 Proje Hakkında

**AURA**, yapay zeka teknolojilerini e-ticaretin kalbine yerleştiren, lüks moda odaklı bir platformdur. Web mağazası ve mobil admin paneli olmak üzere iki ana bileşenden oluşur.

- 🌐 **Web Mağazası** — Müşterilere yönelik, AI destekli stil danışmanı, mood-bazlı ürün keşfi, sepet, favori listesi ve tam kapsamlı e-ticaret deneyimi
- 📱 **Mobil Admin Paneli** — Mağaza sahiplerine özel, sipariş ve ürün yönetimi yapabilen iOS/Android uygulaması

---

## 🖼️ Ekran Görüntüleri

### 📱 Mobil Admin Paneli

<div align="center">

| Dashboard | Ürün Yönetimi | Sipariş Yönetimi |
|:---------:|:-------------:|:----------------:|
| <img src="https://github.com/user-attachments/assets/DASHBOARD_IMAGE_ID" width="250"/> | <img src="https://github.com/user-attachments/assets/PRODUCTS_IMAGE_ID" width="250"/> | <img src="https://github.com/user-attachments/assets/ORDERS_IMAGE_ID" width="250"/> |

</div>

<!-- 
  📸 Görselleri eklemek için:
  1. GitHub'da README.md dosyasını düzenle (kalem ikonu)
  2. Ekran görüntülerini düzenleme alanına sürükle-bırak yap
  3. GitHub otomatik olarak URL oluşturacak
  4. Yukarıdaki DASHBOARD_IMAGE_ID, PRODUCTS_IMAGE_ID, ORDERS_IMAGE_ID
     kısımlarını oluşan URL'lerle değiştir
-->

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| **Web Frontend** | Next.js 15, React 19, TailwindCSS |
| **Mobil Uygulama** | React Native (Expo SDK 54) |
| **Veritabanı & Auth** | Supabase (PostgreSQL + Auth + Storage) |
| **AI / LLM** | Groq SDK — Llama 3.3 70B Versatile |
| **Vektör Arama** | pgvector (Supabase) |
| **Dil** | TypeScript |
| **Monorepo** | npm Workspaces |

---

## 📂 Proje Yapısı

```
AURA/
├── apps/
│   ├── web/                          # Next.js Web Mağazası
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (info)/           # Kurumsal sayfalar (about, faq, careers...)
│   │   │   │   ├── admin/            # Web admin paneli
│   │   │   │   ├── api/chat/         # AI Stil Danışmanı API endpoint
│   │   │   │   ├── auth/             # Giriş / Kayıt sayfası
│   │   │   │   ├── checkout/         # Ödeme sayfası
│   │   │   │   ├── product/[id]/     # Ürün detay sayfası
│   │   │   │   ├── stylist/          # AI Stil Danışmanı sayfası
│   │   │   │   └── page.tsx          # Ana sayfa
│   │   │   ├── components/           # UI bileşenleri (Navbar, Cart, Search...)
│   │   │   ├── context/              # Global state (AppContext)
│   │   │   ├── i18n/                 # Çoklu dil desteği (TR / EN)
│   │   │   └── lib/                  # Supabase istemcisi
│   │   └── .env.example              # Environment değişkenleri şablonu
│   │
│   └── mobile/                       # React Native Admin Paneli
│       ├── App.tsx                   # Uygulama giriş noktası
│       ├── src/
│       │   ├── navigation/           # Ekran yönlendirmeleri
│       │   │   └── RootNavigator.tsx
│       │   ├── screens/
│       │   │   ├── auth/
│       │   │   │   └── LoginScreen.tsx   # Admin giriş ekranı
│       │   │   └── admin/
│       │   │       ├── AdminDashboard.tsx # Dashboard (satış, sipariş, müşteri istatistikleri)
│       │   │       ├── AdminOrders.tsx    # Sipariş yönetimi
│       │   │       └── AdminProducts.tsx  # Ürün yönetimi
│       │   └── lib/
│       │       └── supabase.ts       # Supabase istemcisi
│       └── .env.example              # Environment değişkenleri şablonu
│
├── shared/                           # Ortak kod (sabitler, tipler)
│   ├── constants.ts                  # Mock ürünler ve sabitler
│   └── index.ts                      # Export noktası
│
├── supabase/
│   └── migrations/                   # Veritabanı şeması
│       └── 20240307000000_init_schema.sql
│
├── docs/screenshots/                 # Ekran görüntüleri
└── package.json                      # Monorepo root
```

---

## ✨ Özellikler

### 🌐 Web Mağazası
- **AI Stil Danışmanı** — Groq (Llama 3.3 70B) ile kişiselleştirilmiş stil önerileri
- **Mood-Bazlı Keşif** — Minimalist, Cesur, Romantik, Avant-Garde gibi stil modları
- **Ürün Kataloğu** — Supabase'den gerçek zamanlı ürün çekme, Mock fallback
- **Vektör Benzerlik Araması** — pgvector ile AI destekli ürün eşleştirme
- **Sepet & Favoriler** — Tam işlevsel sepet ve istek listesi
- **Çoklu Dil** — Türkçe ve İngilizce dil desteği
- **Dark / Light Mode** — Tema geçişi
- **Kimlik Doğrulama** — Supabase Auth ile kayıt/giriş
- **Kurumsal Sayfalar** — Hakkımızda, SSS, İletişim, Kariyer, Gizlilik, İade, Kargo, Sürdürülebilirlik, Kullanım Koşulları
- **Admin Paneli** — Ürün, sipariş, müşteri ve ayar yönetimi
- **Satıcı Paneli** — Satıcıların kendi ürünlerini yönetmesi
- **Responsive Tasarım** — Mobil, tablet ve masaüstü uyumlu

### 📱 Mobil Admin Paneli
- **Login Ekranı** — Supabase Auth + geliştirici hızlı geçiş
- **Dashboard** — Toplam satış, sipariş sayısı, yeni müşteriler, iade oranı
- **Sipariş Yönetimi** — Sipariş arama, filtreleme, durum takibi (Hazırlanıyor, Ödendi, Kargoda, Tamamlandı)
- **Ürün Yönetimi** — Ürün listesi, stok durumu, kategori görünümü, durum etiketleri (Aktif, Düşük Stok, Tükendi)
- **Güvenli Çıkış** — Onaylı logout

---

## 🚀 Kurulum

### Gereksinimler

- **Node.js** 18+
- **npm** 9+
- **Expo Go** uygulaması (mobil test için)
- **Supabase** hesabı

### 1. Projeyi klonla

```bash
git clone https://github.com/osmanncan/ai-first-ecommerce.git
cd ai-first-ecommerce
```

### 2. Bağımlılıkları yükle

```bash
npm install
```

### 3. Environment değişkenlerini ayarla

**Web için:**
```bash
cp apps/web/.env.example apps/web/.env.local
```
`apps/web/.env.local` dosyasını düzenle:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GROQ_API_KEY=your-groq-api-key
```

**Mobil için:**
```bash
cp apps/mobile/.env.example apps/mobile/.env
```
`apps/mobile/.env` dosyasını düzenle:
```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Veritabanını oluştur

Supabase Dashboard'da SQL Editor'e git ve `supabase/migrations/20240307000000_init_schema.sql` dosyasındaki SQL'i çalıştır.

### 5. Çalıştır

**Web:**
```bash
npm run web
```

**Mobil:**
```bash
cd apps/mobile
npx expo start
```

---

## 🗄️ Veritabanı Şeması

| Tablo | Açıklama |
|-------|----------|
| `products` | Ürünler (isim, fiyat, stok, kategori, vektör embedding) |
| `profiles` | Kullanıcı profilleri (Supabase Auth ile bağlantılı) |
| `orders` | Siparişler (kullanıcı, toplam, durum) |

**Özel Fonksiyon:** `match_products()` — pgvector ile vektör benzerlik araması yaparak AI destekli ürün eşleştirmesi sağlar.

---

## 🔒 Güvenlik

- ✅ API anahtarları `.env` dosyalarında tutulur, kaynak koda yazılmaz
- ✅ `.env` dosyaları `.gitignore` ile GitHub'dan hariç tutulur
- ✅ `.env.example` şablonları ile kurulum kolaylığı sağlanır
- ✅ Supabase Row Level Security (RLS) desteği
- ✅ Supabase Auth ile kimlik doğrulama

---

## 📜 Lisans

Bu proje portföy amaçlı geliştirilmiştir.

---

<div align="center">

**AURA** ile modanın geleceğini deneyimleyin. ✦

*Osmanca tarafından geliştirilmiştir.*

</div>
