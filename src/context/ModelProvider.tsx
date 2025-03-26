import gsap from "gsap";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getRandomElement } from "../lib/utils";

export const models = ["Ipa", "Blond", "Stout", "Neipa"] as const;

type ModelDetail = {
  name: string;
  ingredients: string;
  slogan: string;
  description: string;
  storageAdvice: string;
  color: string;
  calories: string;
  bitterness: string;
};

export const modelDetails: Record<ModelType, ModelDetail> = {
  Ipa: {
    name: "IPA",
    ingredients:
      "Water, Malt (Pale malt, oats), Hop (Columbus, Chinook, Citra), Yeast, Alcohol 5,5%",
    slogan: "Savour the pleasant bitterness of India Pale Ale",
    description:
      "This craft beer classic is brewed without fuss. With excellent quality water, grain, yeast and (a lot of) hops, we return to the essence of this icon. Our subtle flavours are meant to last, so have a seat, settle down and enjoy the moment.",
    storageAdvice: "4°C - 6°C",
    color: "6 EBC",
    calories: "160",
    bitterness: "38 IBU",
  },
  Blond: {
    name: "American Blonde",
    ingredients:
      "Water, Malt (Pale Malt), Hop (Saaz, Chinook, Idaho7), Yeast, Alcohol 5,5%",
    slogan: "Get carried away by our American Blonde",
    description:
      "Immerse in gezelligheid and allow yourself to be surprised. Open up all of your senses and sit back. It’s time to fully enjoy this moment. Breathe in, breathe out… No form of meditation can compete with this soothing natural blonde.",
    storageAdvice: "4°C - 6°C",
    color: "6 EBC",
    calories: "160",
    bitterness: "21 IBU",
  },
  Stout: {
    name: "Imperial Stout",
    ingredients:
      "Water, Malt (Pale malt. Cara120, wheat, mroast (650-1300), biscuit), Hop (pacific gem), Yeast, Alcohol 10%",
    slogan: "Explore the dark depths of Imperial Stout",
    description:
      "Is it still raining? No worries. Just take another deep dive into this full bodied-beer which delicately hits every side of your palette. Pure and honest. Damn delicious. Something about the little things in life…",
    storageAdvice: "8°C - 10°C",
    color: "130 EBC",
    calories: "160",
    bitterness: "21 IBU",
  },
  Neipa: {
    name: "Neipa",
    ingredients:
      "Water, Malt (Pale Malt, Wheat, Oats), Hop (Sabro, Mosaic), Yeast, Alcohol 6%",
    slogan: "Experience the smooth fruit sensation of New England Ipa",
    description:
      "Connect to a world that is packed with taste. From England to India, all the way up to the American tropics, where its bold flavours originate. Who needs coco rum when you can grab a beer like this?",
    storageAdvice: "4°C - 6°C",
    color: "7 EBC",
    calories: "180",
    bitterness: "23 IBU",
  },
};

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

export type ModelType = (typeof models)[number];

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
    getRandomElement(models),
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
