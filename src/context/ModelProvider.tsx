import gsap from "gsap";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getRandomElement } from "../lib/utils";

export const models = ["Blond", "Stout", "Ipa", "Neipa"] as const;

export const modelColors: Record<
  ModelType,
  { primary: string; secondary: string }
> = {
  Stout: { primary: "#AE6667", secondary: "#7ECF86" },
  Ipa: { primary: "#6F8E99", secondary: "#FF834F" },
  Blond: { primary: "#75846A", secondary: "#F9AF42" },
  Neipa: { primary: "#596F61", secondary: "#D397B1" },
};

type Config = {
  duration: gsap.TweenValue;
  ease: gsap.EaseString | gsap.EaseFunction;
};

export const modelTransitionConfig: Config = {
  duration: 1,
  ease: "sine.out",
};

type ModelType = (typeof models)[number];

type ModelContextType = {
  activeModel: ModelType;
  inactiveModels: ModelType[];
  nextModel: () => void;
  previousModel: () => void;
};

const ModelContext = createContext<ModelContextType | null>(null);

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};

const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeModel, setActiveModel] = useState<ModelType>(
    getRandomElement(models)
  );

  const isChangingModel = useRef(false);

  const nextModel = () => {
    if (isChangingModel.current) return;

    isChangingModel.current = true;

    gsap.delayedCall(Number(modelTransitionConfig.duration), () => {
      isChangingModel.current = false;
    });

    const currentIndex = models.indexOf(activeModel);
    const nextIndex = (currentIndex + 1) % models.length;
    setActiveModel(models[nextIndex]);
  };

  const previousModel = () => {
    if (isChangingModel.current) return;

    isChangingModel.current = true;

    gsap.delayedCall(Number(modelTransitionConfig.duration), () => {
      isChangingModel.current = false;
    });

    const currentIndex = models.indexOf(activeModel);
    const previousIndex = (currentIndex - 1 + models.length) % models.length;
    setActiveModel(models[previousIndex]);
  };

  const inactiveModels = models.filter((model) => model !== activeModel);

  useEffect(() => {
    gsap.set(":root", { "--model-color": modelColors[activeModel].secondary });
  }, [activeModel]);

  return (
    <ModelContext.Provider
      value={{ activeModel, inactiveModels, nextModel, previousModel }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
