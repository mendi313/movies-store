'use client';
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

const ContentContext = createContext<{
  movies: Movie[];
  subscriptions: string[];
  editedUser: User | null;
  setEditedUser: Dispatch<SetStateAction<User | null>>;
  setSubscriptions: Dispatch<SetStateAction<string[]>>;
  setMovies: Dispatch<SetStateAction<Movie[]>>;
}>({
  movies: [],
  subscriptions: [],
  editedUser: null,
  setEditedUser: () => {},
  setMovies: () => {},
  setSubscriptions: () => {},
});

function Context({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  return (
    <ContentContext.Provider value={{ editedUser, setEditedUser, movies, setMovies, subscriptions, setSubscriptions }}>
      {children}
    </ContentContext.Provider>
  );
}

export default Context;

export const ContextValue = () => useContext(ContentContext);
