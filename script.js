//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Returns a promise that resolves with the loaded <img> element,
// or rejects with a descriptive error message if the download fails.
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download image: ${url}`);
  });
}

function downloadImages() {
  // Reset UI state
  output.innerHTML = "";
  error.textContent = "";
  loading.style.display = "block";

  const promises = images.map((image) => downloadImage(image.url));

  Promise.all(promises)
    .then((loadedImages) => {
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      error.textContent = err;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

btn.addEventListener("click", downloadImages);