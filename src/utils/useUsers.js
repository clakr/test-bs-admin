import { createContext, useContext } from 'react';

export const UsersContext = createContext();

export const useUsers = () => useContext(UsersContext);
