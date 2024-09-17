namespace TODO {
  type GetTodosResponse = ITodos[];
  type GetTodosRequest = void;

  type PostTodosResponse = ITodos[];
  type PostTodosRequest = ITodos;

  type PatchTodoResponse = ITodos[];
  type PatchTodoRequest = {
    _id: number | null;
    data: ITodos;
  };

  type DeleteTodoResponse = void;
  type DeleteTodoRequest = number;

  type DeleteTodosResponse = [];
  type DeleteTodosRequest = void;
}
