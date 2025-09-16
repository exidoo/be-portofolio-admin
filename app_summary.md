# Admin Panel Backend untuk Web Portfolio

## Ringkasan Alur Web

Admin panel ini akan menjadi sistem manajemen konten untuk web portfolio Romir Lajuardi. Backend akan menyediakan API endpoints untuk mengelola semua konten yang ditampilkan di frontend, dengan fitur autentikasi dan manajemen data yang aman.

### Arsitektur Teknis:

- **Express.js** dengan TypeScript sebagai server
- **Prisma** sebagai ORM untuk berinteraksi dengan database
- **Supabase** sebagai database PostgreSQL
- **Cloudinary** untuk manajemen gambar
- **Zod** untuk validasi data
- **JWT** untuk autentikasi

## Fitur-fitur Admin Panel

### 1. Sistem Autentikasi

- Login/logout admin
- JWT-based authentication
- Protected routes untuk operasi CRUD

### 2. Manajemen Profil

- Endpoint untuk mengupdate informasi pribadi
- Mengelola bio, keterampilan, dan informasi kontak
- Upload dan update foto profil

### 3. Manajemen Projek Portfolio

- CRUD untuk proyek-proyek yang ditampilkan
- Upload gambar proyek ke Cloudinary
- Tambahkan deskripsi, teknologi yang digunakan, dan link proyek
- Kategorisasi proyek (web, mobile, dll.)

### 4. Manajemen Pengalaman Kerja

- Kelola riwayat pekerjaan
- Tambahkan detail perusahaan, posisi, dan periode kerja
- Deskripsi tanggung jawab dan pencapaian

### 5. Manajemen Pendidikan

- Kelola riwayat pendidikan
- Tambahkan institusi, gelar, dan periode

### 6. Manajemen Skills/Kemampuan

- Kelola daftar keterampilan teknis dan soft skills
- Tambahkan tingkat proficiency (pemula, menengah, ahli)

### 7. Manajemen Testimoni

- Kelola testimoni dari klien/rekan kerja
- Fitur approval testimoni sebelum ditampilkan

### 8. Manajemen Blog/Artikel (jika ada)

- CRUD artikel blog
- Upload gambar cover artikel
- Sistem kategori dan tag

### 9. Manajemen Pengaturan

- Konfigurasi tema warna
- Pengaturan SEO
- Social media links

## Struktur Database (Model Prisma)

```prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}


model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id          String   @id @default(cuid())
  name        String
  title       String
  bio         String
  image       String?
  email       String
  phone       String?
  location    String?
  socialLinks Json? // { github: string, linkedin: string, etc. }
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  image       String
  technologies String[]
  projectUrl  String?
  githubUrl   String?
  category    String
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Experience {
  id           String   @id @default(cuid())
  company      String
  position     String
  description  String
  startDate    DateTime
  endDate      DateTime?
  current      Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Education {
  id          String   @id @default(cuid())
  institution String
  degree      String
  field       String
  startDate   DateTime
  endDate     DateTime?
  current     Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Skill {
  id         String   @id @default(cuid())
  name       String
  category   String
  proficiency Int     // 1-5 scale
  icon       String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Testimonial {
  id        String   @id @default(cuid())
  name      String
  position  String
  company   String
  content   String
  image     String?
  approved  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Contoh Endpoint API

### Autentikasi

- `POST /api/auth/login` - Login admin
- `POST /api/auth/logout` - Logout admin

### Profil

- `GET /api/profile` - Dapatkan data profil
- `PUT /api/profile` - Update data profil
- `POST /api/profile/image` - Upload gambar profil

### Projek

- `GET /api/projects` - Dapatkan semua proyek
- `POST /api/projects` - Buat proyek baru
- `PUT /api/projects/:id` - Update proyek
- `DELETE /api/projects/:id` - Hapus proyek
- `POST /api/projects/:id/image` - Upload gambar proyek

### Pengalaman

- `GET /api/experiences` - Dapatkan semua pengalaman
- `POST /api/experiences` - Buat pengalaman baru
- `PUT /api/experiences/:id` - Update pengalaman
- `DELETE /api/experiences/:id` - Hapus pengalaman

## Keamanan

- Validasi input dengan Zod
- Autentikasi JWT dengan expiry time
- Proteksi terhadap serangan XSS dan CSRF
- Rate limiting pada endpoint login
- Hash password dengan bcrypt

## Deployment

Backend dapat di-deploy di platform seperti:

- Vercel
- Railway
- Heroku
- DigitalOcean App Platform

Dengan database di Supabase dan penyimpanan gambar di Cloudinary.

Admin panel ini akan memberikan kontrol penuh atas konten portfolio, memungkinkan update konten tanpa perlu mengubah kode, dan menjaga keamanan data dengan implementasi autentikasi dan validasi yang robust.
