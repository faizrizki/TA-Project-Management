# Project Management — Frontend

Aplikasi web manajemen proyek dengan Next.js 16, Tailwind CSS, dan Zustand. Mendukung 4 role: Admin, Project Manager, Team Member, Client.

---

## Quick Start (3 Langkah)

### 1. Prasyarat

- **Node.js 20+** — cek versi: `node --version`
- **npm** (sudah include sama Node)
- Browser modern (Chrome, Firefox, Edge)

> Belum punya Node 20+? Install via [nvm](https://github.com/nvm-sh/nvm):
> ```bash
> nvm install 20
> nvm use 20
> ```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Dev Server

**Linux / Mac:**
```bash
./run.sh
```

**Windows:**
```cmd
run.bat
```

**Manual (semua OS):**
```bash
npm run dev
```

Buka http://localhost:3000 di browser.

---

## Login Demo

Aplikasi sudah include 4 akun demo (data dummy, simpan di [`src/modules/auth/data/users.ts`](src/modules/auth/data/users.ts)):

| Role | Email | Password |
|---|---|---|
| Admin | `admin@test.com` | `admin123` |
| Project Manager | `pm@test.com` | `pm123456` |
| Team Member | `member@test.com` | `member123` |
| Client | `client@test.com` | `client123` |

> Login dengan **Admin** untuk lihat semua fitur termasuk tab "Pengguna" (manajemen user & role).

---

## Map Halaman

| URL | Akses | Deskripsi |
|---|---|---|
| `/auth/login` | Public | Form login |
| `/auth/register` | Public | Form daftar (simulasi, tidak save) |
| `/dashboard` | Login | Stat cards, charts, proyek terbaru, riwayat aktivitas |
| `/proyek` | Login | List proyek + CRUD |
| `/proyek/[id]` | Login | Detail proyek + task kanban + komentar |
| `/pengguna` | Admin only | Manajemen user & role |

---

## Struktur Folder

```
src/
├── app/                          # Next.js routing (App Router)
│   ├── (app)/                    # Group route dengan AppShell (navbar + footer)
│   │   ├── dashboard/page.tsx
│   │   ├── proyek/page.tsx
│   │   ├── proyek/[id]/page.tsx
│   │   └── pengguna/page.tsx
│   ├── auth/login/page.tsx
│   ├── auth/register/page.tsx
│   ├── globals.css
│   └── layout.tsx
│
├── modules/                      # CBD: 1 folder per domain
│   ├── auth/                     # login, register, role, mock user data
│   ├── user/                     # CRUD user (admin)
│   ├── project/                  # CRUD proyek + detail
│   ├── task/                     # CRUD task + status kanban
│   ├── comment/                  # komentar + lampiran file
│   ├── notification/             # notif bell + modal
│   ├── activity/                 # riwayat aktivitas log
│   └── dashboard/                # stat cards + charts + helpers
│
├── shared/                       # Komponen & konstanta lintas modul
│   ├── components/               # Button, Input, Select, Modal, Navbar, AppShell, ...
│   └── constants/teamMembers.ts
│
├── lib/                          # Setup library global
│   ├── axios.ts                  # axios client + interceptor
│   └── apiTypes.ts               # types ApiResponse/ApiError
│
└── middleware.ts                 # proteksi route (token check)

docs/
└── API.md                        # Dokumentasi endpoint API yang dibutuhkan backend
```

**Pola per modul** (CBD — Component-Based Design):
```
modules/<domain>/
├── types/<domain>.ts             # Type/interface
├── validation/<domain>Schema.ts  # zod
├── services/<domain>Services.ts  # API stubs (axios)
├── store/<domain>Store.ts        # zustand state
├── utils/                        # helper non-React
└── components/                   # React components
```

---

## Setup Backend (Saat API Siap)

1. Copy template env:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local`, set URL backend:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. Buka dokumentasi endpoint lengkap di [`docs/API.md`](docs/API.md). Spek 25+ endpoint dengan request body & response shape sudah ditulis.

4. Di setiap file handler komponen, sudah ada **block komentar `TODO`** yang menunjukkan:
   - URL endpoint
   - Body request
   - Format response sukses & error
   - Kode siap copy-paste

   Cari di file:
   - `src/modules/auth/components/LoginForm.tsx`
   - `src/modules/auth/components/RegisterForm.tsx`
   - `src/modules/project/components/ProjectList.tsx`
   - `src/modules/project/components/ProjectDetail.tsx`
   - `src/modules/comment/components/CommentList.tsx`
   - `src/modules/user/components/UserList.tsx`
   - `src/modules/notification/components/NotificationModal.tsx`

5. Aktifkan block TODO + hapus block `===== DUMMY =====`.

6. axios sudah auto-attach `Authorization: Bearer <token>` dari cookie dan auto-redirect ke login saat 401. Lihat [`src/lib/axios.ts`](src/lib/axios.ts).

---

## Troubleshooting

**❌ "Node.js version >=20.9.0 is required"**
→ Update Node ke versi 20+. Pakai nvm: `nvm install 20 && nvm use 20`.

**❌ "Cannot find native binding" (@tailwindcss/oxide)**
→ Reinstall dependencies di mesin lokal:
```bash
rm -rf node_modules package-lock.json
npm install
```

**❌ "Tampilan tidak ada styling-nya"**
→ Hard refresh browser: `Ctrl+Shift+R` (Linux/Win) atau `Cmd+Shift+R` (Mac).

**❌ Port 3000 sudah dipakai**
→ Stop proses lain: `lsof -ti:3000 | xargs kill -9` (Linux/Mac).

**❌ Logout/login bingung, data demo aneh**
→ Clear browser storage:
- Buka DevTools (F12) → Application tab → Local Storage → hapus key `user-storage`, `auth-storage`
- Atau buka private/incognito window

---

## Mau Reset Data Demo?

Data project, task, komentar, notif, aktivitas → in-memory zustand, otomatis reset saat page refresh.

Data user → tersimpan di `localStorage` (key `user-storage`). Cara reset:
- DevTools (F12) → Application → Local Storage → Delete key `user-storage`
- Refresh halaman → kembali ke initial seed dari `src/modules/auth/data/users.ts`

---

## Tech Stack

| Layer | Pilihan |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | Tailwind CSS v4 |
| State | Zustand (with `persist` untuk auth & user) |
| Form | react-hook-form + zod |
| HTTP | axios (interceptor untuk auth) |
| Icon | react-icons (Heroicons v2) |
| Bahasa | TypeScript |

---

## Coverage FR (Functional Requirements)

| FR | Fitur | Lokasi |
|---|---|---|
| FR-01 | Registrasi | `/auth/register` |
| FR-02 | Login | `/auth/login` |
| FR-03 | Manajemen Role | `/pengguna` (admin) |
| FR-04 s/d FR-07 | CRUD Proyek | `/proyek` |
| FR-08 s/d FR-12 | CRUD Task + status + prioritas + assignee + deadline | `/proyek/[id]` |
| FR-13 | Komentar | section di detail proyek |
| FR-14 | Lampiran | upload di komentar |
| FR-15 | Notifikasi | bell di navbar |
| FR-16 | Dashboard | `/dashboard` |
| FR-17 | Laporan Progress | tombol "Cetak Laporan" (window.print) |
| FR-18 | Riwayat Aktivitas | section di dashboard |

---

## Lisensi & Kontribusi

Repository personal untuk portofolio. Free to fork & learn.
