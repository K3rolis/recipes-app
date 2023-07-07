export type CommentProps = {
  id: number;
  postedDate: string;
  description: string;
  userId: number;
  recipeId: number;
  user: {
    username: string;
  };
};

// class Comment {
//   constructor(
//     public id: number,
//     public userName: string,
//     public postedDate: string,
//     public showActions: boolean,
//     public description: string,
//     public userId: number,
//     public recipeId: number
//   ) {
//     this.id = id;
//     this.userName = userName;
//     this.postedDate = postedDate;
//     this.showActions = showActions;
//     this.description = description;
//     this.userId = userId;
//     this.recipeId = recipeId;
//   }
// }

// type CommentParamsType = ConstructorParameters<typeof Comment>;

// export type CommendId = CommentParamsType[0];
