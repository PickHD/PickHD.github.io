AOS.init();

// Tangkap button dengan id myTopBtn
let myTopButton = document.querySelector("#myTopBtn");

// ketika user me-scroll halaman sedikit kebawah
window.onscroll = () => {
  // panggil fungsi scroll
  scroll();
};

function scroll() {
  //jika user me-scroll halaman sedikit kebawah
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    // ubah display style buttonnya menjadi block
    myTopButton.style.display = "block";
  } else {
    // jika tidak
    myTopButton.style.display = "none";
  }
}

// Ketika user meng-klik tombol "atas"
function toTop() {
  document.documentElement.scrollTop = 0;
}
