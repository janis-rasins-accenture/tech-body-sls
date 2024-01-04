export interface UserBaseIF {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  userName: string;
  password: string;
}

export interface UserIF extends UserBaseIF {
  userId: string;
  isActive?: number;
  isAdmin: number;
}

export interface InputUserCreateIF extends UserBaseIF {}

export interface InputUserUpdateIF {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;
  userName?: string;
  password?: string;
}

export interface UserAuthIF {
  email: string;
  password: string;
}

export interface UserPathParams {
  userId: string;
}
