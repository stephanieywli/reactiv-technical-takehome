export type CarouselAspect = "landscape" | "portrait" | "square";

export type CarouselSection = {
  id: string;
  type: "carousel";
  images: string[];
  aspect: CarouselAspect;
};

export type TextSection = {
  id: string;
  type: "text";
  title: string;
  description: string;
  titleColor: string;
  descriptionColor: string;
};

export type CTASection = {
  id: string;
  type: "cta";
  label: string;
  link: string;
  buttonColor: string;
  labelColor: string;
};

export type Section = CarouselSection | TextSection | CTASection;

export type ScreenConfig = {
  sections: Section[];
};
