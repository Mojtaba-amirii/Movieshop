import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
  type FC,
} from "react";

type AnimationContextType = {
  animationTriggered: boolean;
  setAnimationTriggered: (value: boolean) => void;
};

const AnimationContext = createContext<AnimationContextType>({
  animationTriggered: false,
  setAnimationTriggered: (value: boolean) => {
    console.warn("setAnimationTriggered function is not implemented", value);
  },
});

export const AnimationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [animationTriggered, setAnimationTriggered] = useState(false);

  const value = useMemo(
    () => ({ animationTriggered, setAnimationTriggered }),
    [animationTriggered],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
