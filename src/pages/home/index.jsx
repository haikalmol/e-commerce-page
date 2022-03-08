import { useState } from 'react';
import Header from '../../components/header';
import Main from '../../components/main';
import Slider from '../../components/slider';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (value) => {
    setIsOpen(!value);
  };

  return (
    <div>
      <Header onOpen={onOpen} />
      <div
        className={`${
          isOpen &&
          'after:w-screen after:bg-black/80 after:h-screen after:absolute after:inset-0'
        }`}
      >
        <Slider />
        <Main />
        {/* <Modal /> */}
      </div>
    </div>
  );
}
