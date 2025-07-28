import './bootstrap';
import Swal from 'sweetalert2';

// Global SweetAlert configuration
window.Swal = Swal;

// Debug: Periksa apakah SweetAlert2 tersedia secara global
console.log('SweetAlert2 diimpor dan tersedia secara global:', typeof window.Swal !== 'undefined');

// Tambahkan fungsi helper untuk memastikan SweetAlert2 tersedia
window.showAlert = function(options) {
    try {
        if (typeof window.Swal !== 'undefined') {
            return window.Swal.fire(options);
        } else {
            console.error('SweetAlert2 tidak tersedia');
            // Fallback ke alert biasa
            alert(options.text || options.title || 'Terjadi kesalahan');
        }
    } catch (e) {
        console.error('Error saat menampilkan SweetAlert:', e);
        // Fallback ke alert biasa
        alert(options.text || options.title || 'Terjadi kesalahan');
    }
};

// Handle flash messages
window.showFlashMessage = function(success, message) {
    try {
        Swal.fire({
            icon: success ? 'success' : 'error',
            title: success ? 'Berhasil!' : 'Gagal!',
            text: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    } catch (e) {
        console.error('Error saat menampilkan flash message:', e);
        // Fallback ke alert biasa
        alert(message);
    }
};
