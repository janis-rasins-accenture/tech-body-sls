export interface CarouselSlidesBaseIF {
    title: string;
    link: string;
    description: string;
  }
  
  export interface CarouselSlidesIF extends CarouselSlidesBaseIF {
    carouselSlidesId: string;
    isActive?: number;
  }
  
  export interface InputCarouselSlidesCreateIF extends CarouselSlidesBaseIF {}
  
  export interface InputCarouselSlidesUpdateIF extends CarouselSlidesBaseIF {
    carouselSlidesId: string;
    isActive: number;
  }
  