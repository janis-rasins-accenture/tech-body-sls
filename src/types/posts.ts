export interface PostBaseIF {
  title: string;
  text: string;
  imageUrl?: string;
}

export interface PostIF extends PostBaseIF {
  postId: string;
  isActive: number;
  userId: string;
  unixTimestamp: number;
}

export interface InputPostsCreateIF extends PostBaseIF {}

export interface InputPostsUpdateIF {
  postId: string;
  title?: string;
  text?: string;
  imageUrl?: string;
  isActive?: number;
  userId?: string;
  unixTimestamp?: number;
}

export interface PostsByUserPathParams {
  userId: string;
}

export interface PostUpdatePathParams {
  postId: string;
}
