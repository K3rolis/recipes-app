export type CreateCommentProps = {
  id?: number;
  userId?: number;
  description: string;
  postedDate: string;
  userName: string;
  showActions: boolean;
  edit: boolean;
};
