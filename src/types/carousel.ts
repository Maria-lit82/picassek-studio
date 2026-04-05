export interface CarouselSlide {
  title: string;
  content: string;
  imagePrompt: string;
}

export interface CarouselContent {
  topic: string;
  slides: CarouselSlide[];
  caption: string;
}
