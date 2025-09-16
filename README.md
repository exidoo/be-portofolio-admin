# Portfolio Admin Backend

Backend untuk sistem manajemen konten portfolio pribadi.

## Struktur Direktori

```
src/
├── app.ts              # Konfigurasi utama Express app
├── server.ts           # Entry point server
├── config/             # Konfigurasi (Cloudinary, dll)
├── controllers/        # Controller untuk setiap fitur
├── middlewares/        # Middleware (auth, dll)
├── routes/             # Route definition
├── utils/
│   └── validators/     # Zod schema validators
prisma/
├── schema.prisma       # Prisma schema
└── migrations/         # Database migrations
```

## Fitur yang Telah Diimplementasikan

1. **Autentikasi**
   - Register/Login dengan JWT
   - Protected routes

2. **Manajemen Profil**
   - CRUD profil pengguna
   - Upload foto profil

3. **Manajemen Projek**
   - CRUD projek portfolio
   - Upload gambar projek

4. **Manajemen Pengalaman**
   - CRUD pengalaman kerja

5. **Manajemen Pendidikan**
   - CRUD riwayat pendidikan

6. **Manajemen Skill**
   - CRUD daftar keterampilan

7. **Manajemen Testimonial**
   - CRUD testimonial
   - Approval system
   - Upload gambar testimonial

8. **Manajemen Blog** (Untuk pengembangan di masa depan)
   - CRUD artikel blog
   - Upload gambar blog
   - Published/Draft system

9. **Manajemen Settings**
   - Konfigurasi tema
   - Pengaturan SEO
   - Social media links

## Cara Menjalankan

1. Install dependencies:
   ```
   npm install
   ```

2. Setup environment variables (lihat `.env.example`)

3. Generate Prisma client:
   ```
   npx prisma generate
   ```

4. Jalankan development server:
   ```
   npm run dev
   ```

## Struktur API

### Autentikasi
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

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

### Pendidikan
- `GET /api/educations` - Dapatkan semua pendidikan
- `POST /api/educations` - Buat pendidikan baru
- `PUT /api/educations/:id` - Update pendidikan
- `DELETE /api/educations/:id` - Hapus pendidikan

### Skill
- `GET /api/skills` - Dapatkan semua skill
- `POST /api/skills` - Buat skill baru
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Hapus skill

### Testimonial
- `GET /api/testimonials/approved` - Dapatkan testimonial yang disetujui (public)
- `GET /api/testimonials` - Dapatkan semua testimonial
- `POST /api/testimonials` - Buat testimonial baru
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Hapus testimonial
- `POST /api/testimonials/:id/image` - Upload gambar testimonial

### Blog
- `GET /api/blogs/published` - Dapatkan blog yang dipublikasikan (public)
- `GET /api/blogs/:id/published` - Dapatkan blog spesifik yang dipublikasikan (public)
- `GET /api/blogs` - Dapatkan semua blog
- `POST /api/blogs` - Buat blog baru
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Hapus blog
- `POST /api/blogs/:id/image` - Upload gambar blog

### Settings
- `GET /api/settings` - Dapatkan settings
- `PUT /api/settings` - Update settings