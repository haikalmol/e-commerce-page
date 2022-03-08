import { useState } from 'react';
import image1 from '../../images/image-product-1.jpg';
import image2 from '../../images/image-product-2.jpg';
import image3 from '../../images/image-product-3.jpg';
import image4 from '../../images/image-product-4.jpg';
import next from '../../images/icon-next.svg';
import prev from '../../images/icon-previous.svg';

const images = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
  { id: 4, image: image4 },
];

export default function index() {
  const [slide, setSlide] = useState(0);

  const changeSlide = (direction) => {
    if (direction === 'l') {
      setSlide(slide !== 0 ? slide - 1 : 3);
    }

    if (direction === 'r') {
      setSlide(slide === 3 ? 0 : slide + 1);
    }
  };

  return (
    <section className="desktop:hidden w-screen relative overflow-x-hidden pt-12">
      <div
        className={`w-[400vw] flex items-center justify-center transition-all ease-in-out duration-1000`}
        style={{ transform: `translateX(${-100 * slide}vw)` }}
      >
        {images.map(({ image, id }) => (
          <div key={id} className="w-[100vw]">
            <img src={image} alt="pix" className="object-center" />
          </div>
        ))}
      </div>

      <div className="absolute w-full extraSmall:top-48  mobile:top-1/2 flex justify-between extraSmall:px-2 mobile:px-4">
        <div
          className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
          onClick={() => changeSlide('l')}
        >
          <img src={prev} alt="prev" className="h-3" />
        </div>
        <div
          className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
          onClick={() => changeSlide('r')}
        >
          <img src={next} alt="next" className="h-3" />
        </div>
      </div>
    </section>
  );
}
