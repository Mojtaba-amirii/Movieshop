import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FC,
} from "react";

type AnimationContextType = {
  animationTriggered: boolean;
  setAnimationTriggered: (value: boolean) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined,
);

type AnimationProviderProps = {
  children: ReactNode;
};

export const AnimationProvider: FC<AnimationProviderProps> = ({ children }) => {
  const [animationTriggered, setAnimationTriggered] = useState(false);

  return (
    <AnimationContext.Provider
      value={{ animationTriggered, setAnimationTriggered }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
