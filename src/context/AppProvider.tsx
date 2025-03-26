import { createContext, useContext, useState } from "react";

type AppContextType = {
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <AppContext.Provider value={{ isStarted, setIsStarted }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
