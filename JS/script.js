const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 512;


const pic = new Image();
const btnDownload = document.querySelector('.btnDownload');
let value = '';

async function fetcchFunction() {
  value = document.querySelector('.search').value;
  const url = `https://api.unsplash.com/photos/random?query=town,${value}&client_id=a7892a211ae6e25459ce0d1d7f0289a337bb7c0b6b65e2dc032c61b16f980dbe`;
  const response = await fetch(url);
  const res = await response.json();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pic.src = res.urls.small;
  pic.onload = () => {
    let imageWidth = pic.width;
    let imageHeight = pic.height;
    if (imageHeight === imageWidth) {
      imageWidth = 512;
      imageHeight = 512;
      ctx.drawImage(pic, 0, 0, 512, 512);
    }
    if (imageWidth < imageHeight) {
      imageWidth = (pic.width * 512) / pic.height;
      imageHeight = 512;
      ctx.drawImage(pic,
        (512 - (pic.width * 512) / pic.height) / 2, 0, (pic.width * 512) / pic.height, 512);
    }
    if (imageWidth > imageHeight) {
      imageWidth = 512;
      imageHeight = (pic.height * 512) / pic.width;
      ctx.drawImage(pic, 0,
        (512 - (pic.height * 512) / pic.width) / 2, 512, (pic.height * 512) / pic.width);
    }
  };
  window.localStorage.setItem('initData', res.urls.small);
}
btnDownload.addEventListener('click', fetcchFunction);

// const rect = canvas.getBoundingClientRect();

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('initData')) {
    window.localStorage.setItem('initData', canvas.toDataURL());
  }
  pic.src = window.localStorage.getItem('initData');
  pic.onload = () => {
    let imageWidth = pic.width;
    let imageHeight = pic.height;
    if (imageHeight === imageWidth) {
      imageWidth = 512;
      imageHeight = 512;
      ctx.drawImage(pic, 0, 0, 512, 512);
    }
    if (imageWidth < imageHeight) {
      imageWidth = (pic.width * 512) / pic.height;
      imageHeight = 512;
      ctx.drawImage(pic,
        (512 - (pic.width * 512) / pic.height) / 2, 0, (pic.width * 512) / pic.height, 512);
    }
    if (imageWidth > imageHeight) {
      imageWidth = 512;
      imageHeight = (pic.height * 512) / pic.width;
      ctx.drawImage(pic, 0,
        (512 - (pic.height * 512) / pic.width) / 2, 512, (pic.height * 512) / pic.width);
    }
  };
});
