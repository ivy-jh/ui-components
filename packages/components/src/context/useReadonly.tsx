import { createContext, useContext, type ReactNode } from 'react';

const ReadonlyContextInstance = createContext({ readonly: false });

export const ReadonlyProvider = ({ readonly, children }: { readonly: boolean; children: ReactNode }) => {
  return <ReadonlyContextInstance.Provider value={{ readonly }}>{children}</ReadonlyContextInstance.Provider>;
};

export const useReadonly = (): boolean => useContext(ReadonlyContextInstance).readonly;
