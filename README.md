# URL Shortener

Kısa, paylaşılabilir bağlantılar oluşturmak için modern bir full-stack uygulama.

## Özellikler
- Uzun URL'leri kolayca kısaltma
- Kopyala butonu ile hızlı paylaşım
- Modern ve responsive arayüz (React + TypeScript)
- Node.js/Express.js backend
- MongoDB ile kalıcı veri saklama
- Hata yönetimi ve kullanıcı dostu bildirimler

## Kurulum

### 1. Backend (Express + MongoDB)
```bash
cd backend
npm install
# veya
# yarn install
```

MongoDB'in çalıştığından emin olun (lokalde veya Atlas'ta).

#### Ortam Değişkenleri
`backend/config/db.js` dosyasında MongoDB bağlantı adresini kontrol edin.

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
# veya
# yarn install
```

## Çalıştırma

### Backend'i Başlat
```bash
cd backend
npm start
```

### Frontend'i Başlat
```bash
cd frontend
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8000](http://localhost:8000)

## Kullanım
1. Uzun bir URL girin (örn: `https://www.google.com`).
2. "Kısalt" butonuna tıklayın.
3. Oluşan kısa URL'yi kopyalayın ve paylaşın.

## Deployment
- Backend'i bir sunucuya (Vercel, Heroku, DigitalOcean, AWS, vs.) deploy edin.
- Frontend'i Netlify, Vercel veya başka bir servise yükleyin.
- API adreslerini production ortamına göre güncelleyin.

## Katkı
Pull request ve issue'larınızı bekliyoruz!

---

**Hazırlayan:** [Furkan Özçelik](https://github.com/FurkanOzclk)