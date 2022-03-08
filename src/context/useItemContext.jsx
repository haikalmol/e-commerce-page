import { useContext } from 'react';
import ItemContext from './ItemContext';

export default function useItemContext() {
  const context = useContext(ItemContext);

  if (context === undefined)
    throw new Error('This hook must be used within a context provider');

  return context;
}
