export default function loadImage(url: string) {
  return new Promise((resolve, reject) => {

    const image = new Image()

    image.onload = resolve

    image.onerror = () => reject(new Error('Error when loading ' + url))

    image.src = url;
  })
}
