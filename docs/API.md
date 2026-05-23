# API Documentation — Project Management

Dokumentasi endpoint yang dibutuhkan frontend. Pakai sebagai kontrak ke backend.

## Konvensi Umum

**Base URL:** dari env `NEXT_PUBLIC_API_URL` (contoh: `http://localhost:8000/api`)

**Auth:** semua endpoint kecuali `Login` & `Register` butuh header:
```
Authorization: Bearer <token>
```

**Format response sukses:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Format response error:**
```json
{
  "success": false,
  "message": "Pesan error utama",
  "errors": {
    "field": ["pesan validasi field"]
  }
}
```

**HTTP status code yang umum digunakan:**
- `200` OK — sukses GET/PUT/PATCH
- `201` Created — sukses POST
- `204` No Content — sukses DELETE
- `400` Bad Request — payload tidak valid
- `401` Unauthorized — token invalid / expired (frontend auto-redirect ke login)
- `403` Forbidden — role tidak punya akses
- `404` Not Found
- `422` Unprocessable Entity — gagal validasi (errors per field)
- `500` Internal Server Error

---

## 1. Auth

### 1.1 Login Pengguna
- **Method:** `POST`
- **URL:** `/login`
- **Auth:** ❌ Tidak perlu
- **FR:** FR-02

**Request body:**
```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

**Success `200`:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "u-1",
      "name": "Admin Sistem",
      "email": "admin@test.com",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1..."
  },
  "message": "Login berhasil"
}
```

**Error `401`:**
```json
{
  "success": false,
  "message": "Email atau password salah"
}
```

**Error `422`:**
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "email": ["Email tidak valid"],
    "password": ["Password minimal 6 karakter"]
  }
}
```

---

### 1.2 Registrasi Pengguna
- **Method:** `POST`
- **URL:** `/register`
- **Auth:** ❌ Tidak perlu
- **FR:** FR-01

**Request body:**
```json
{
  "email": "user@test.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success `201`:**
```json
{
  "success": true,
  "data": {
    "id": "u-5",
    "name": "user",
    "email": "user@test.com",
    "role": "TEAM_MEMBER"
  },
  "message": "Akun berhasil dibuat"
}
```

**Error `422`:**
```json
{
  "success": false,
  "message": "Email sudah terdaftar",
  "errors": {
    "email": ["Email sudah terdaftar"]
  }
}
```

---

## 2. Users (Admin only)

### 2.1 List User
- **Method:** `GET`
- **URL:** `/users`
- **Auth:** ✅ Bearer token (role: ADMIN)
- **FR:** FR-03

**Success `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "u-1",
      "name": "Admin Sistem",
      "email": "admin@test.com",
      "role": "ADMIN"
    },
    {
      "id": "u-2",
      "name": "Andi Wijaya",
      "email": "pm@test.com",
      "role": "PROJECT_MANAGER"
    }
  ]
}
```

**Error `403`:**
```json
{
  "success": false,
  "message": "Hanya admin yang dapat mengakses resource ini"
}
```

---

### 2.2 Tambah User
- **Method:** `POST`
- **URL:** `/users`
- **Auth:** ✅ Bearer token (role: ADMIN)
- **FR:** FR-03

**Request body:**
```json
{
  "name": "User Baru",
  "email": "baru@test.com",
  "password": "password123",
  "role": "TEAM_MEMBER"
}
```

`role` enum: `ADMIN | PROJECT_MANAGER | TEAM_MEMBER | CLIENT`

**Success `201`:**
```json
{
  "success": true,
  "data": {
    "id": "u-5",
    "name": "User Baru",
    "email": "baru@test.com",
    "role": "TEAM_MEMBER"
  }
}
```

---

### 2.3 Update User
- **Method:** `PUT`
- **URL:** `/users/{id}`
- **Auth:** ✅ Bearer token (role: ADMIN)
- **FR:** FR-03

**Request body** (password opsional saat edit):
```json
{
  "name": "Nama Update",
  "email": "update@test.com",
  "password": "newpassword",
  "role": "PROJECT_MANAGER"
}
```

**Success `200`:** sama format dengan POST.

---

### 2.4 Hapus User
- **Method:** `DELETE`
- **URL:** `/users/{id}`
- **Auth:** ✅ Bearer token (role: ADMIN)
- **FR:** FR-03

**Success `204`:** No Content

---

## 3. Projects

### 3.1 List Proyek
- **Method:** `GET`
- **URL:** `/projects`
- **Auth:** ✅ Bearer token
- **FR:** FR-07

**Success `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "p-1",
      "name": "Website Redesign",
      "description": "Redesign perusahaan website dengan UI/UX modern",
      "status": "AKTIF",
      "startDate": "2026-01-11",
      "endDate": "2027-03-01",
      "progress": 60,
      "members": 1
    }
  ]
}
```

`status` enum: `AKTIF | DITUNDA | SELESAI`

---

### 3.2 Buat Proyek
- **Method:** `POST`
- **URL:** `/projects`
- **Auth:** ✅ Bearer token (role: ADMIN, PROJECT_MANAGER)
- **FR:** FR-04

**Request body:**
```json
{
  "name": "Mobile App",
  "description": "Aplikasi mobile internal",
  "status": "AKTIF",
  "startDate": "2026-06-01",
  "endDate": "2026-12-31"
}
```

**Success `201`:** mengembalikan project lengkap dengan `id`, `progress: 0`, `members: 1`.

**Error `422`:**
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "endDate": ["Tanggal selesai harus setelah tanggal mulai"]
  }
}
```

---

### 3.3 Update Proyek
- **Method:** `PUT`
- **URL:** `/projects/{id}`
- **Auth:** ✅ Bearer token (role: ADMIN, PROJECT_MANAGER)
- **FR:** FR-05

**Request body:** sama dengan POST.

---

### 3.4 Hapus Proyek
- **Method:** `DELETE`
- **URL:** `/projects/{id}`
- **Auth:** ✅ Bearer token (role: ADMIN, PROJECT_MANAGER)
- **FR:** FR-06

**Success `204`:** No Content

---

## 4. Tasks

### 4.1 List Task Per Proyek
- **Method:** `GET`
- **URL:** `/projects/{projectId}/tasks`
- **Auth:** ✅ Bearer token

**Success `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "t-1",
      "projectId": "p-1",
      "title": "Setup Analytics",
      "description": "Integrasi Google Analytics",
      "status": "IN_PROGRESS",
      "priority": "MEDIUM",
      "progress": 40,
      "deadline": "2026-11-15",
      "assigneeId": "u-1"
    }
  ]
}
```

`status` enum: `TODO | IN_PROGRESS | REVIEW | DONE`
`priority` enum: `LOW | MEDIUM | HIGH`

---

### 4.2 Buat Task
- **Method:** `POST`
- **URL:** `/projects/{projectId}/tasks`
- **Auth:** ✅ Bearer token
- **FR:** FR-08, FR-09, FR-10, FR-11, FR-12

**Request body:**
```json
{
  "title": "Design Homepage",
  "description": "Buat mockup homepage",
  "status": "TODO",
  "priority": "HIGH",
  "progress": 0,
  "deadline": "2026-12-01",
  "assigneeId": "u-2"
}
```

`assigneeId` boleh `null` (FR-09: belum ditentukan).

---

### 4.3 Update Task
- **Method:** `PUT`
- **URL:** `/tasks/{id}`
- **Auth:** ✅ Bearer token
- **FR:** FR-10 (ubah status), FR-11 (prioritas), FR-12 (deadline)

**Request body:** sama dengan POST.

---

### 4.4 Hapus Task
- **Method:** `DELETE`
- **URL:** `/tasks/{id}`
- **Auth:** ✅ Bearer token

**Success `204`:** No Content

---

## 5. Comments

### 5.1 List Komentar Proyek
- **Method:** `GET`
- **URL:** `/projects/{projectId}/comments`
- **Auth:** ✅ Bearer token

**Success `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "c-1",
      "projectId": "p-1",
      "authorId": "u-2",
      "authorName": "Budi Santoso",
      "content": "Sudah review mockup homepage",
      "attachments": [
        {
          "id": "att-1",
          "name": "mockup.png",
          "size": 245680,
          "url": "https://cdn.example.com/files/abc.png"
        }
      ],
      "createdAt": "2026-11-10T10:00:00Z"
    }
  ]
}
```

---

### 5.2 Tambah Komentar
- **Method:** `POST`
- **URL:** `/projects/{projectId}/comments`
- **Auth:** ✅ Bearer token
- **FR:** FR-13

**Request body** (multipart/form-data jika ada lampiran — FR-14):
```
content: "Komentar saya"
attachments[]: <file>
attachments[]: <file>
```

Atau JSON tanpa file:
```json
{
  "content": "Komentar saya",
  "attachments": []
}
```

**Success `201`:** mengembalikan comment lengkap.

---

### 5.3 Hapus Komentar
- **Method:** `DELETE`
- **URL:** `/comments/{id}`
- **Auth:** ✅ Bearer token (owner only / admin)

**Success `204`:** No Content

**Error `403`:**
```json
{
  "success": false,
  "message": "Anda hanya bisa menghapus komentar Anda sendiri"
}
```

---

## 6. Notifications

### 6.1 List Notifikasi
- **Method:** `GET`
- **URL:** `/notifications`
- **Auth:** ✅ Bearer token
- **FR:** FR-15

**Success `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "n-1",
      "title": "Task baru ditugaskan",
      "message": "Anda mendapat task 'Setup Analytics'",
      "kind": "TASK",
      "read": false,
      "createdAt": "2026-11-10T09:00:00Z"
    }
  ]
}
```

`kind` enum: `INFO | PROJECT | TASK | COMMENT`

---

### 6.2 Tandai Notifikasi Dibaca
- **Method:** `PATCH`
- **URL:** `/notifications/{id}/read`
- **Auth:** ✅ Bearer token

**Success `200`:**
```json
{
  "success": true,
  "data": {
    "id": "n-1",
    "read": true
  }
}
```

---

### 6.3 Tandai Semua Dibaca
- **Method:** `PATCH`
- **URL:** `/notifications/read-all`
- **Auth:** ✅ Bearer token

**Success `200`:**
```json
{
  "success": true,
  "message": "Semua notifikasi ditandai dibaca",
  "data": { "updated": 5 }
}
```

---

## 7. Activities

### 7.1 List Riwayat Aktivitas
- **Method:** `GET`
- **URL:** `/activities`
- **Auth:** ✅ Bearer token
- **FR:** FR-18

**Query params (opsional):**
- `limit` — jumlah maksimal (default: 50)
- `userId` — filter per user (admin only)

**Success `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "a-1",
      "actorId": "u-1",
      "actorName": "Andi Wijaya",
      "message": "membuat proyek 'Website Redesign'",
      "createdAt": "2026-11-01T08:00:00Z"
    }
  ]
}
```

---

## 8. (Opsional) Dashboard Stats & Laporan

### 8.1 Statistik Dashboard
- **Method:** `GET`
- **URL:** `/dashboard/stats`
- **Auth:** ✅ Bearer token
- **FR:** FR-16

**Success `200`:**
```json
{
  "success": true,
  "data": {
    "totalProjects": 5,
    "activeProjects": 3,
    "completedProjects": 1,
    "totalTasks": 24,
    "doneTasks": 8,
    "completionRate": 33,
    "taskStatusCounts": {
      "TODO": 10,
      "IN_PROGRESS": 4,
      "REVIEW": 2,
      "DONE": 8
    },
    "recentProjects": [ /* project[] */ ]
  }
}
```

> Catatan: saat ini frontend menghitung stats di sisi klien dari data project & task. Endpoint ini opsional jika backend ingin precompute.

---

### 8.2 Laporan Progress (Cetak/Export)
- **Method:** `GET`
- **URL:** `/reports/progress`
- **Auth:** ✅ Bearer token
- **FR:** FR-17

**Query params:**
- `format` — `pdf | csv | json` (default `pdf`)
- `projectId` — opsional, filter per proyek

**Success `200`:** binary (PDF/CSV) atau JSON.

> Catatan: saat ini frontend pakai `window.print()` browser. Endpoint ini hanya perlu kalau ingin export server-side.

---

## Mapping FR → Endpoint

| FR | Endpoint utama |
|---|---|
| FR-01 Registrasi | `POST /register` |
| FR-02 Login | `POST /login` |
| FR-03 Manajemen Role | `GET/POST/PUT/DELETE /users` |
| FR-04 Buat Proyek | `POST /projects` |
| FR-05 Edit Proyek | `PUT /projects/{id}` |
| FR-06 Hapus Proyek | `DELETE /projects/{id}` |
| FR-07 List Proyek | `GET /projects` |
| FR-08 Buat Task | `POST /projects/{id}/tasks` |
| FR-09 Assignee | field `assigneeId` di task |
| FR-10 Ubah Status Task | `PUT /tasks/{id}` (field `status`) |
| FR-11 Prioritas | `PUT /tasks/{id}` (field `priority`) |
| FR-12 Deadline | `PUT /tasks/{id}` (field `deadline`) |
| FR-13 Komentar | `POST /projects/{id}/comments` |
| FR-14 Lampiran | multipart upload di komentar |
| FR-15 Notifikasi | `GET /notifications` + `PATCH /read` |
| FR-16 Dashboard | data dari proyek + task (atau `GET /dashboard/stats`) |
| FR-17 Laporan | `window.print()` atau `GET /reports/progress` |
| FR-18 Riwayat Aktivitas | `GET /activities` |

---

## Setup Frontend

1. Copy `.env.example` → `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` set `NEXT_PUBLIC_API_URL` ke URL backend.

3. Frontend axios client (`src/lib/axios.ts`):
   - Otomatis attach `Authorization: Bearer <token>` dari cookie `token`
   - Auto-redirect ke `/auth/login` saat dapat `401`
   - Common headers `Content-Type` + `Accept` JSON

4. Saat integrasi backend:
   - Hapus persist localStorage `user-storage` (data mock di `src/modules/auth/data/users.ts`)
   - Update LoginForm: panggil `authServices.login(data)` → simpan token dari response, set ke cookie via `setToken()`
   - Update Register: panggil `authServices.register(data)`
   - Setiap store: ganti seed in-memory dengan fetch dari API saat mount (custom hook `useEffect` atau react-query)

---

## File-file Frontend yang Sudah Stub Endpoint

| File | Endpoint |
|---|---|
| `src/modules/auth/services/authServices.ts` | login, register |
| `src/modules/user/services/userServices.ts` | user CRUD |
| `src/modules/project/services/projectServices.ts` | project CRUD |
| `src/modules/task/services/taskServices.ts` | task CRUD |
| `src/modules/comment/services/commentServices.ts` | comment CRUD |
| `src/modules/notification/services/notificationServices.ts` | notification CRUD |
| `src/modules/activity/services/activityServices.ts` | activity log |

Setiap file pakai `api` instance dari `src/lib/axios.ts`. Tinggal panggil di komponen, replace bagian yang sekarang langsung manipulasi zustand store.
