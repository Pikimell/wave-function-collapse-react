export const rotateImage = (imageUrl, rotation = 0) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      const radians = (rotation * Math.PI) / 180;
      const swapSide = Math.abs(rotation) % 180 === 90;
      const canvas = document.createElement('canvas');
      canvas.width = swapSide ? image.height : image.width;
      canvas.height = swapSide ? image.width : image.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context is not available'));
        return;
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);

      resolve(canvas.toDataURL('image/png'));
    };

    image.onerror = reject;
    image.src = imageUrl;
  });

export const mirrorImage = (imageUrl, axis = 'horizontal') =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context is not available'));
        return;
      }

      ctx.save();
      if (axis === 'horizontal') {
        ctx.scale(-1, 1);
        ctx.drawImage(image, -image.width, 0);
      } else {
        ctx.scale(1, -1);
        ctx.drawImage(image, 0, -image.height);
      }
      ctx.restore();

      resolve(canvas.toDataURL('image/png'));
    };

    image.onerror = reject;
    image.src = imageUrl;
  });
