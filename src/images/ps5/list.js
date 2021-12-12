const subPath = 'ps5/'
export const list = [
  {
    title: 'The Last of Us Part II',
    images: [
      'IMG_0904.JPG-1024x.jpg',
      'IMG_0903.JPG-1024x.jpg',
      'IMG_0918.JPG-1024x.jpg',
      'IMG_0919.JPG-1024x.jpg',
      'IMG_0921.JPG-1024x.jpg',
      '7DFF35B2-737F-4.jpg-1024x.jpg',
      '4023A5F2-AC28-.jpg-1024x.jpg',
      'EC45EF84-ACB51.jpg-1024x.jpg',
      'IMG_0880.jpg-1024x.jpg',
      'IMG_0881.jpg-1024x.jpg',
      'IMG_0882.jpg-1024x.jpg',
      'IMG_0884.jpg-1024x.jpg',
      'IMG_0906.JPG-1024x.jpg',
      'IMG_0907.JPG-1024x.jpg',
      'IMG_0895.JPG-1024x.jpg',
    ],
  },
].map((e) => {
  e.images = e.images.map((el) => `${subPath}${el}`)
  return e
})
