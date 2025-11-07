// フロントエンド用（APIレスポンス）
export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mongoose用（サーバーサイド）
export interface ITodo {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}