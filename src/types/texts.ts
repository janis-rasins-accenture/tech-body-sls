export interface TextBaseIF {
    title: string;
    text: string;
  }
  
  export interface TextIF extends TextBaseIF {
    textId: string;
    isActive?: number;
  }
  
  export interface InputTextCreateIF extends TextBaseIF {}
  
  export interface InputTextUpdateIF extends TextBaseIF {
    textId: string;
    isActive: number;
  }
  