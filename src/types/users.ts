export interface UserIF {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  userName: string;
  isActive?: number;
}
export interface UserBaseIF {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  userName: string;
}

export interface InputUserCreateIF extends UserBaseIF {}

export interface InputUserUpdateIF extends UserBaseIF {
  userId: string;
  isActive: number;
}
