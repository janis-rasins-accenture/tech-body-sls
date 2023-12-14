export interface CarouselSlidesBaseIF {
    title: string;
    link: string;
    description: string;
  }
  
  export interface CarouselSlidesIF extends CarouselSlidesBaseIF {
    carouselSlidesId: string;
    isActive?: number;
    sortIndex?: number;
  }
  
  export interface InputCarouselSlidesCreateIF extends CarouselSlidesBaseIF {}
  
  export interface InputCarouselSlidesUpdateIF extends CarouselSlidesBaseIF {
    carouselSlidesId: string;
    isActive: number;
  }
  