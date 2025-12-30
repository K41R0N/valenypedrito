import { createContext, useContext, useState, ReactNode } from "react";

interface RSVPContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const RSVPContext = createContext<RSVPContextType | undefined>(undefined);

export function RSVPProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <RSVPContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </RSVPContext.Provider>
  );
}

export function useRSVP() {
  const context = useContext(RSVPContext);
  if (context === undefined) {
    throw new Error("useRSVP must be used within an RSVPProvider");
  }
  return context;
}
