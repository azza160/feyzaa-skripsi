# Sistem Pembatasan Quiz - Dokumentasi Lengkap

## 📋 Overview
Sistem pembatasan quiz mencegah user menyalahgunakan fitur quiz dengan membatasi maksimal **10 kali mengerjakan quiz per jam**. Sistem ini berlaku untuk semua jenis quiz (huruf dan kosakata) dan memberikan feedback yang jelas kepada user.

## ⚙️ Cara Kerja Sistem

### 1. **Batasan Utama**
- **Limit**: 10 quiz per jam per user
- **Penyimpanan**: Menggunakan Laravel Cache dengan key `quiz_rate_limit_{user_id}`
- **Jendela Waktu**: Rolling 1 jam (bukan jam tetap)
- **Pembersihan**: Otomatis menghapus data yang lebih dari 1 jam

### 2. **Implementasi Teknis**

#### Middleware: `QuizRateLimit.php`
```php
// Fitur utama:
- Melacak percobaan quiz dalam cache dengan key user-specific
- Menghapus percobaan lama secara otomatis
- Mengembalikan HTTP 429 status untuk rate limit
- Menyertakan pesan error dengan sisa waktu
```

#### Perhitungan Waktu
```php
// Sistem menghitung berapa kali user sudah mengerjakan quiz dalam 1 jam terakhir
$attempts = Cache::get($cacheKey, []);
$recentAttempts = array_filter($attempts, function($timestamp) {
    return now()->diffInSeconds($timestamp) < 3600; // 1 jam
});

if (count($recentAttempts) >= 10) {
    // User sudah mencapai batas
    return response()->json([
        'error' => 'Batas maksimal 10 quiz per jam telah tercapai. Silakan coba lagi dalam ' . $remainingTime . ' menit.'
    ], 429);
}
```

### 3. **Pesan Error yang Ditampilkan**
- **Status**: HTTP 429 (Too Many Requests)
- **Pesan**: "Batas maksimal 10 quiz per jam telah tercapai. Silakan coba lagi dalam X menit."
- **Sisa Waktu**: Dihitung otomatis berdasarkan percobaan terlama

## 🔧 Cara Reset untuk Testing

### **Metode 1: Clear Cache Manual**
```bash
# Di terminal Laravel
php artisan cache:clear

# Atau clear specific key
php artisan tinker
Cache::forget('quiz_rate_limit_' . Auth::id());
```

### **Metode 2: Database Reset**
```sql
-- Hapus semua data quiz session untuk user tertentu
DELETE FROM quis_huruf_sessions WHERE user_id = [USER_ID];
DELETE FROM quis_kosakata_sessions WHERE user_id = [USER_ID];
```

### **Metode 3: Artisan Command**
```bash
# Buat command khusus untuk reset (jika diperlukan)
php artisan quiz:reset-rate-limit [user_id]
```

### **Metode 4: Frontend Testing**
```javascript
// Di browser console
localStorage.clear();
sessionStorage.clear();
// Refresh halaman
```

## 🚨 Alert Pembatasan

### **Frontend Implementation**
```javascript
// Di Pilih-List-Huruf-Quis.jsx dan Pilih-List-Quis-Kosakata.jsx
.then(response => {
  if (!response.ok) {
    return response.json().then(data => {
      throw new Error(data.error || 'Terjadi kesalahan');
    });
  }
  return response.json();
})
.catch(error => {
  if (error.message.includes('batas maksimal')) {
    alert(error.message);
  } else {
    alert("Gagal memulai quiz: " + error.message);
  }
});
```

### **Backend Response**
```php
// Di QuizRateLimit middleware
return response()->json([
    'error' => 'Batas maksimal 10 quiz per jam telah tercapai. Silakan coba lagi dalam ' . $remainingTime . ' menit.'
], 429);
```

## 📊 Monitoring dan Debug

### **Cek Status Rate Limit**
```php
// Di tinker atau controller
$userId = Auth::id();
$cacheKey = "quiz_rate_limit_{$userId}";
$attempts = Cache::get($cacheKey, []);
echo "Percobaan quiz dalam 1 jam terakhir: " . count($attempts);
```

### **Log Rate Limiting**
```php
// Di middleware
Log::info("Rate limit hit for user {$userId}", [
    'attempts' => count($recentAttempts),
    'remaining_time' => $remainingTime
]);
```

## 🔄 Flow Lengkap

### **1. User Memulai Quiz**
```
User klik "Mulai Quiz" 
→ Middleware QuizRateLimit dicek
→ Jika < 10 kali: Lanjut ke quiz
→ Jika >= 10 kali: Tampilkan alert error
```

### **2. Perhitungan Waktu**
```
Quiz selesai 
→ Session diupdate dengan ended_at
→ Review page hitung timeSpent = ended_at - started_at
→ Tampilkan waktu yang akurat
```

### **3. Card Completion**
```
Quiz selesai 
→ Frontend fetch review data dengan Accept: application/json
→ Backend return JSON response
→ Card completion muncul dengan data lengkap
```

## ⚠️ Troubleshooting

### **Masalah: Alert tidak muncul**
**Solusi**: Pastikan error handling di frontend sudah benar
```javascript
.catch(error => {
  console.log('Error:', error); // Debug
  alert(error.message);
});
```

### **Masalah: Waktu tidak akurat**
**Solusi**: Pastikan perhitungan konsisten
```php
$timeSpent = $session->ended_at->diffInSeconds($session->started_at);
```

### **Masalah: Card completion tidak muncul**
**Solusi**: Pastikan route dan response JSON benar
```php
if (request()->wantsJson()) {
    return response()->json(['quizResults' => $data]);
}
```

## 📝 Catatan Penting

1. **Testing**: Gunakan metode reset di atas untuk testing
2. **Production**: Rate limiting aktif untuk mencegah abuse
3. **Monitoring**: Perhatikan log untuk debugging
4. **User Experience**: Pesan error harus jelas dan informatif

## 🎯 Kesimpulan

Sistem pembatasan quiz berfungsi untuk:
- ✅ Mencegah abuse sistem quiz
- ✅ Memberikan feedback yang jelas kepada user
- ✅ Memungkinkan testing dengan reset yang mudah
- ✅ Menjaga performa sistem secara keseluruhan 