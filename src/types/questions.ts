export interface QuestionBaseIF {
    question: string;
    answer: string;
  }
  
  export interface QuestionIF extends QuestionBaseIF {
    questionId: string;
    isActive?: number;
    sortIndex?: number;
  }
  
  export interface InputQuestionCreateIF extends QuestionBaseIF {}
  
  export interface InputQuestionUpdateIF extends QuestionIF {}
  