import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'reelhouse-watchlist';
const WatchlistContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isSaved = (type, id) => items.some((i) => i.type === type && i.id === id);

  const toggle = (item) =>
    setItems((prev) =>
      prev.some((i) => i.type === item.type && i.id === item.id)
        ? prev.filter((i) => !(i.type === item.type && i.id === item.id))
        : [...prev, item]
    );

  return (
    <WatchlistContext.Provider value={{ items, isSaved, toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);