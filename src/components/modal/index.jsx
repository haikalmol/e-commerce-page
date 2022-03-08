import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import close from '../../images/icon-close.svg';
import next from '../../images/icon-next.svg';
import nextActive from '../../images/icon-next-active.svg';
import prev from '../../images/icon-previous.svg';
import prevActive from '../../images/icon-previous-active.svg';
import { images, thumbnails } from '../../utils';

export default function Modal({ isOpen, setIsOpen }) {
  const [index, setIndex] = useState(0);
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const slide = (direction) => {
    if (direction === 'l') {
      setIndex(index === 0 ? 3 : index - 1);
      setLeftActive(true);
      setRightActive(false);
    }

    if (direction === 'r') {
      setIndex(index === 3 ? 0 : index + 1);
      setLeftActive(false);
      setRightActive(true);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="hidden desktop:block fixed inset-0 bg-black bg-opacity-75 w-screen h-screen">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="relative -mt-20">
          <img
            src={close}
            alt="close"
            className="absolute right-0 -top-8 h-5 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative">
            <div className="absolute flex items-center justify-between w-full h-full">
              <div
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center -ml-6 cursor-pointer"
                onClick={() => slide('l')}
              >
                {leftActive ? (
                  <img src={prevActive} alt="previous" className="h-4" />
                ) : (
                  <img src={prev} alt="previous" className="h-4" />
                )}
              </div>
              <div
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center -mr-6 cursor-pointer"
                onClick={() => slide('r')}
              >
                {rightActive ? (
                  <img src={nextActive} alt="next" className="h-4" />
                ) : (
                  <img src={next} alt="next" className="h-4" />
                )}
              </div>
            </div>

            {images.map((image, id) => (
              <div
                key={id}
                className={`w-[32rem] rounded-lg overflow-hidden ${
                  image.id === index ? 'block' : 'hidden'
                }`}
              >
                <img src={image.image} alt="pix" />
              </div>
            ))}
          </div>

          <div className="absolute left-20 mt-10">
            <div className="flex space-x-5 cursor-pointer">
              {thumbnails.map((thumbnail, id) => (
                <div
                  key={id}
                  className={`w-20 h-20 ${
                    thumbnail.id === index
                      ? 'opacity-40 border-[2.5px] bg-[#ff7d1a] border-[#ff7d1a] rounded-lg'
                      : ''
                  }`}
                  onClick={() => setIndex(thumbnail.id)}
                >
                  <img
                    src={thumbnail.thumbnail}
                    alt="thumbnail"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}
