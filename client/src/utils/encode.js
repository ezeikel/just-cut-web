export const encodeData = (photo) => new Promise((resolve) => {
  const reader = new FileReader();

  reader.readAsDataURL(photo);

  reader.addEventListener('load', () => {
    resolve(reader.result);
  }, false);
});
