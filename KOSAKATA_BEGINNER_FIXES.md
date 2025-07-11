# Perbaikan Sistem Attempt Tracking Kosakata Level Beginner

## Masalah yang Diperbaiki

### 1. Attempt Tracking Tidak Berfungsi
**Masalah:** Attempt tracking tidak bertambah ketika kosakata tertentu digunakan dalam kuis, baik mode manual maupun random.

**Penyebab:** 
- Sistem lama menggunakan `whereJsonContains('selected_kosakata', $kosakataId)` yang tidak tepat
- Hanya menghitung session yang sudah selesai (`ended = true`)
- Tidak menghitung attempt secara global across semua session

**Solusi:**
- Membuat method `getGlobalAttemptCount()` yang menghitung attempt secara global
- Menghitung attempt berdasarkan soal yang dijawab dalam JSON `user_answers`
- Menggunakan `array_search()` untuk menemukan index soal dalam array

### 2. EXP Calculation Tidak Sesuai Spesifikasi
**Masalah:** EXP menggunakan nilai tetap 18, padahal seharusnya sesuai attempt (21, 13, 5, 0).

**Solusi:**
- Membuat method `calculateExpForBeginner()` dengan nilai yang sesuai:
  - Attempt 1: 21 EXP
  - Attempt 2: 13 EXP  
  - Attempt 3: 5 EXP
  - Attempt 4+: 0 EXP

### 3. Method getUnlockedFeatures Hilang
**Masalah:** Method `getUnlockedFeatures()` tidak ada di `QuisKosakataController`.

**Solusi:** Menambahkan method `getUnlockedFeatures()` dengan implementasi yang sama seperti di `QuisController`.

### 4. Level Beginner Belum Difokuskan
**Masalah:** Controller masih mendukung level intermediate dan advanced.

**Solusi:** 
- Menambahkan validasi untuk hanya mendukung level beginner
- Menghapus logika untuk level intermediate dan advanced
- Menambahkan error message jika user mencoba mengakses level lain

## Perubahan yang Dibuat

### 1. QuisKosakataController.php

#### Method Baru:
- `getUnlockedFeatures($level)` - Menangani fitur yang terbuka per level
- `calculateExpForBeginner($attempt)` - Menghitung EXP sesuai attempt
- `getGlobalAttemptCount($user, $kosakataId)` - Menghitung attempt global per kosakata

#### Method yang Diperbaiki:
- `startSession()` - Fokus hanya pada level beginner
- `ReviewQuisKosakataShow()` - Menggunakan attempt tracking yang baru

#### Perubahan Utama:
```php
// Sebelum: EXP tetap 18
$exp = ($kosakataAttempts[$kosakataId] < 3 && $isCorrect) ? $expPerSoal : 0;

// Sesudah: EXP sesuai attempt
$exp = 0;
if ($isCorrect) {
    $exp = $this->calculateExpForBeginner($currentAttempt);
}
```

### 2. TestKosakataAttemptTracking.php
Command baru untuk testing attempt tracking:
```bash
php artisan test:kosakata-attempt {user_id} {kosakata_id}
```

## Cara Kerja Sistem Baru

### 1. Attempt Tracking
1. Ketika user menjawab soal, sistem mencari kosakata_id dalam soal
2. Menghitung berapa kali kosakata tersebut sudah dijawab sebelumnya (global attempt)
3. Increment attempt untuk soal saat ini
4. Hitung EXP berdasarkan attempt yang sudah diincrement

### 2. EXP Calculation
- **Attempt 1:** 21 EXP (pertama kali menjawab kosakata ini)
- **Attempt 2:** 13 EXP (kedua kali menjawab kosakata ini)
- **Attempt 3:** 5 EXP (ketiga kali menjawab kosakata ini)
- **Attempt 4+:** 0 EXP (sudah terlalu sering, tidak dapat EXP)

### 3. Global Tracking
- Attempt dihitung secara global across semua session
- Tidak peduli mode (manual/random) atau session yang berbeda
- Mencegah farming EXP dari kosakata yang sama

## Testing

### Manual Testing:
1. Buat kuis manual dengan kosakata tertentu
2. Jawab soal dengan kosakata tersebut
3. Buat kuis random, pastikan kosakata yang sama muncul
4. Jawab soal dengan kosakata yang sama
5. Cek di review bahwa attempt bertambah dan EXP berkurang

### Command Testing:
```bash
# Test attempt tracking untuk user dan kosakata tertentu
php artisan test:kosakata-attempt {user_id} {kosakata_id}
```

## Kompatibilitas

- ✅ Fitur yang sudah berjalan tetap berfungsi
- ✅ Mode manual dan random tetap berfungsi
- ✅ Review quis tetap menampilkan data dengan benar
- ✅ Level up dan EXP calculation tetap berfungsi
- ✅ Hanya level beginner yang tersedia (sesuai permintaan)

## Catatan Penting

1. **Level Lain:** Untuk level intermediate dan advanced, akan dibuat controller terpisah
2. **Database:** Tidak ada perubahan struktur database
3. **Performance:** Attempt tracking menggunakan JSON data yang sudah ada
4. **Security:** Validasi ownership session tetap ada
5. **Backward Compatibility:** Data lama tetap bisa diakses

## Next Steps

1. Test sistem baru dengan berbagai skenario
2. Implementasi level intermediate dan advanced (controller terpisah)
3. Optimasi performance jika diperlukan
4. Monitoring penggunaan untuk memastikan sistem berjalan dengan baik 