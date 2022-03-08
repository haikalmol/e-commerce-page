import { Link } from 'react-router-dom';
import menuIcon from '../../images/icon-menu.svg';
import menuClose from '../../images/icon-close.svg';
import deleteIcon from '../../images/icon-delete.svg';
import cartIcon from '../../images/icon-cart.svg';
import avatar from '../../images/image-avatar.png';
import { useEffect, useState } from 'react';
import { images } from '../../utils';
import useItemContext from '../../context/useItemContext';

const links = ['Collections', 'Men', 'Women', 'About', 'Contact'];

export default function Header({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  // const [showCheckoutSmall, setShowCheckoutSmall] = useState(false);

  const context = useItemContext();

  const handleOpenClick = (e) => {
    if (!e.target.classList.contains('sidenav-sm')) {
      setIsOpen(false);
      onOpen(isOpen);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOpenClick);
    }
    return () => document.removeEventListener('click', handleOpenClick);
  }, [isOpen]);

  return (
    <>
      <header className="fixed bg-white z-40 w-screen desktop:hidden">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4 px-6">
            <div
              className="z-40"
              onClick={() => {
                setIsOpen(!isOpen);
                onOpen(isOpen);
              }}
            >
              {isOpen ? (
                <img src={menuClose} alt="menu" className="h-4 w-4" />
              ) : (
                <img src={menuIcon} alt="menu" className="h-4 w-4" />
              )}
            </div>
            <Link
              to="/"
              className="font-kumb text-3xl tracking-normal font-extrabold list-none mb-1"
            >
              sneakers
            </Link>
          </div>
          <div className="flex space-x-4 items-center p-6">
            <div
              className="relative"
              onClick={() => setShowCheckout(!showCheckout)}
            >
              <img src={cartIcon} alt="cart" className="h-4 w-4" />
              <div className="absolute -right-1 -top-1 rounded-full h-3 w-3 p-1 bg-[#ff7d1a] text-[0.5rem] text-white flex items-center justify-center">
                {context.count ?? 0}
              </div>
            </div>
            <div>
              <img
                src={avatar}
                alt="cart"
                className="h-6 w-6 rounded-full relative"
              />
              <div
                className={`absolute z-[100] inset-x-4 top-[5rem] shadow-xl bg-white overflow-hidden rounded-md h-auto ${
                  showCheckout ? 'block' : 'hidden'
                }`}
              >
                <div className="text-black flex flex-col">
                  <h1 className="border-b p-5 font-semibold">Cart</h1>
                  {context.cart.length !== 0 ? (
                    <>
                      <div className="flex flex-col space-y-2">
                        {context.cart.map((item) => (
                          <div
                            key={item.itemId}
                            className="flex space-x-4 pt-4 items-center px-5"
                          >
                            <div className="h-12 w-12 rounded-md overflow-hidden">
                              <img
                                src={images[item.imageIndex].image}
                                alt="pix"
                              />
                            </div>
                            <div>
                              <h1 className="text-sm text-gray-600">
                                {item.itemName}
                              </h1>
                              <span className="text-sm text-gray-500">
                                {`$${item.amount} x ${item.itemCount}`}{' '}
                                <span className="font-extrabold">{`$${item.total}`}</span>{' '}
                              </span>
                            </div>
                            <img
                              onClick={() => {
                                context.removeFromCart(item.itemId);
                                context.reset();
                              }}
                              src={deleteIcon}
                              alt="delete"
                              className="cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="px-5 py-4">
                        <button
                          type="submit"
                          className="rounded-lg px-10 py-2 bg-[#ff7d1a] text-white text-center w-full h-10"
                        >
                          Checkout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full px-5 pt-12 pb-8">
                      <h1 className="font-bold text-gray-500 text-sm">
                        Your Cart is empty
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`sidenav-sm z-30 bg-white w-4/5 ${
            isOpen ? 'left-0' : 'left-[-100%]'
          } transition-all duration-500  h-screen text-white fixed top-0 flex flex-col items-start`}
        >
          <ul className="font-header flex flex-col mt-24 space-y-6 pl-6 text-black font-semibold">
            {links.map((link) => (
              <li key={link}>
                <Link to="/">{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <header className="extraSmall:hidden desktop:block w-screen px-28">
        <div className="flex justify-between items-center pt-10 pb-4 border-b">
          <div className="flex items-center space-x-8 text-black">
            <Link
              to="/"
              className="font-kumb text-3xl tracking-normal font-extrabold list-none mb-1"
            >
              sneakers
            </Link>
            <div className="flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link}
                  to="/"
                  className="block relative hover:after:absolute after:top-12 after:inset-x-0  after:h-1 after:w-full after:bg-[#ff7d1a]"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex space-x-7 items-center">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowCheckout(!showCheckout)}
            >
              <img src={cartIcon} alt="cart" className="h-5 w-5" />
              <div className="absolute -right-1 -top-1 rounded-full h-3 w-4 p-1 bg-[#ff7d1a] text-[0.7rem] text-white flex items-center justify-center">
                {context.count ?? 0}
              </div>
            </div>
            <div className="relative">
              <img
                src={avatar}
                alt="cart"
                className="cursor-pointer h-11 w-11 rounded-full overflow-hidden hover:border-[3px]  border-[#ff7d1a] border-opacity-[0.95]"
              />
              <div
                className={`close-checkout absolute shadow-xl bg-white w-80 right-0 overflow-hidden rounded-md h-auto ${
                  showCheckout ? 'block' : 'hidden'
                }`}
              >
                <div className="text-black flex flex-col">
                  <h1 className="border-b p-5 font-semibold">Cart</h1>
                  {context.cart.length !== 0 ? (
                    <>
                      <div className="flex flex-col space-y-2">
                        {context.cart.map((item) => (
                          <div
                            key={item.itemId}
                            className="flex space-x-4 pt-4 items-center px-5"
                          >
                            <div className="h-12 w-12 rounded-md overflow-hidden">
                              <img
                                src={images[item.imageIndex].image}
                                alt="pix"
                              />
                            </div>
                            <div>
                              <h1 className="text-sm text-gray-600">
                                {item.itemName}
                              </h1>
                              <span className="text-sm text-gray-500">
                                {`$${item.amount} x ${item.itemCount}`}{' '}
                                <span className="font-extrabold">{`$${item.total}`}</span>{' '}
                              </span>
                            </div>
                            <img
                              onClick={() => {
                                context.removeFromCart(item.itemId);
                                context.reset();
                              }}
                              src={deleteIcon}
                              alt="delete"
                              className="cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="px-5 py-4">
                        <button
                          type="submit"
                          className="rounded-lg px-10 py-2 bg-[#ff7d1a] text-white text-center w-full h-10"
                        >
                          Checkout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full px-5 pt-12 pb-8">
                      <h1 className="font-bold text-gray-500 text-sm">
                        Your Cart is empty
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
