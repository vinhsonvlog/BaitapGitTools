const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.product-card');
const countdown = document.getElementById('countdown');
const imageInput = document.getElementById('imageInput');
const uploadPreview = document.getElementById('uploadPreview');
let previewUrls = [];

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter;

    cards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !matches);
    });
  });
});

// Simulate a running flash sale timer for UI preview purposes.
let secondsLeft = 8 * 60 * 60 - 1;

setInterval(() => {
  secondsLeft = Math.max(0, secondsLeft - 1);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  countdown.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);

if (imageInput && uploadPreview) {
  imageInput.addEventListener('change', () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    previewUrls = [];

    const files = Array.from(imageInput.files || []).filter((file) =>
      file.type.startsWith('image/')
    );

    if (!files.length) {
      uploadPreview.innerHTML = '<p class="upload-empty">No images selected yet.</p>';
      return;
    }

    uploadPreview.innerHTML = '';

    files.forEach((file) => {
      const fileUrl = URL.createObjectURL(file);
      previewUrls.push(fileUrl);

      const card = document.createElement('article');
      card.className = 'preview-card';

      const image = document.createElement('img');
      image.src = fileUrl;
      image.alt = file.name;

      const name = document.createElement('p');
      name.textContent = file.name;

      card.append(image, name);
      uploadPreview.append(card);
    });
  });
}
