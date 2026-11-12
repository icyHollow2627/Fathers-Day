const kartu = document.getElementById('kartu');

function konfeti() {
  const warna = ['#C8643C', '#F6E7D0', '#4A2A1A', '#E8A33D'];
  for (let i = 0; i < 40; i++) {
    const k = document.createElement('div');
    k.className = 'konfeti';
    k.style.left = Math.random() * 100 + 'vw';
    k.style.background = warna[Math.floor(Math.random() * warna.length)];
    k.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    document.body.appendChild(k);
    setTimeout(() => k.remove(), 3500);
  }
}

function isiKartu(nama, message, from) {
  document.getElementById('for').textContent = 'Untuk ' + nama;
  document.getElementById('message').textContent = message;
  document.querySelector('.from').textContent = '- ' + from;
}

function ambilInput() {
  return {
    nama: document.getElementById('inNama').value.trim() || 'Ayah',
    message: document.getElementById('inMessage').value.trim() || 'Thanks buat semuanya.',
    from: document.getElementById('inFrom').value.trim() || 'Anakmu'
  };
}

// Klik kartu = buka / tutup (+ konfeti saat terbuka)
kartu.addEventListener('click', () => {
  kartu.classList.toggle('terbuka');
  if (kartu.classList.contains('terbuka')) konfeti();
});

// Buat kartu
document.getElementById('btnBuat').addEventListener('click', () => {
  const d = ambilInput();
  isiKartu(d.nama, d.message, d.from);
  kartu.classList.add('terbuka');
  konfeti();
});

// Bagikan lewat WhatsApp
document.getElementById('btnBagikan').addEventListener('click', () => {
  const d = ambilInput();
  const p = new URLSearchParams({ n: d.nama, m: d.message, f: d.from });
  const link = location.href.split('?')[0] + '?' + p.toString();
  const teks = 'Ada kartu Hari Ayah untukmu: ' + link;
  window.open('https://wa.me/?text=' + encodeURIComponent(teks), '_blank');
});

// Kalau dibuka dari link bagikan: isi otomatis, sembunyikan editor
const q = new URLSearchParams(location.search);
if (q.has('m')) {
  isiKartu(q.get('n') || 'Ayah', q.get('m'), q.get('f') || 'Anakmu');
  document.querySelector('.editor').style.display = 'none';
}