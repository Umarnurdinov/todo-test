"use client";
import {
  useDeleteTodoMutation,
  useDeleteTodosMutation,
  useGetTodosQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
} from "@/redux/api/todo";
import { useUploadFileMutation } from "@/redux/api/upload";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const TodoList = () => {
  const {
    handleSubmit: handleSubmitAdd,
    register: registerAdd,
    reset: resetAdd,
  } = useForm<ITodo>();
  const {
    handleSubmit: handleSubmitEdit,
    register: registerEdit,
    reset: resetEdit,
    setValue,
  } = useForm<ITodo>();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [upload] = useUploadFileMutation();
  const [postTodo] = usePostTodoMutation();
  const [editMutation] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [deleteTodos] = useDeleteTodosMutation();
  const { data: getTodo = [] } = useGetTodosQuery();

  const onSubmit: SubmitHandler<ITodo> = async (data) => {
    try {
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);
      const { data: responseUrl } = await upload(formData);
      if (!responseUrl) {
        alert("Ошибка при загрузке");
      }
      const newData = {
        name: data.name,
        age: data.age,
        file: responseUrl?.url,
      };
      const { data: responseData, error } = await postTodo(newData);
      console.log(responseData);
      setTodos(responseData!);
      resetAdd();
    } catch (error) {
      console.log(error);
    }
  };
  const editHandler: SubmitHandler<ITodo> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);
    const { data: responseUrl } = await upload(formData);
    const newData = {
      name: data.name,
      age: data.age,
      file: responseUrl?.url,
    };
    const updateData = {
      _id: editId,
      data: newData,
    };
    const { data: responseData } = await editMutation(updateData);
    setTodos(responseData!);
    setEditId(null);
    resetEdit();
  };
  const deleteHandler = async (id: number) => {
    const { data: responseData } = await deleteTodo(id);
    setTodos(responseData!);
  };
  const deleteAllHandler = async () => {
    const { data: responseData } = await deleteTodos();
    setTodos(responseData!);
  };
  const fetchTodos = async () => {
    setTodos(getTodo);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <h1>Revert</h1>
      <form onSubmit={handleSubmitAdd(onSubmit)}>
        <input
          placeholder="Name"
          type="text"
          {...registerAdd("name", { required: true })}
        />
        <input
          placeholder="Age"
          type="number"
          {...registerAdd("age", { required: true })}
        />
        <input
          placeholder="File"
          type="file"
          {...registerAdd("file", { required: true })}
        />
        <button type="submit">Add Todo</button>
      </form>
      <br />
      <button onClick={() => deleteAllHandler()}>DeleteAll</button>
      {todos.map((el) => (
        <div key={el._id}>
          {editId === el._id ? (
            <>
              <Image src={el.file} width={500} height={300} alt="img" />
              <form onSubmit={handleSubmitEdit(editHandler)}>
                <input
                  placeholder="Name"
                  type="text"
                  {...registerEdit("name", { required: true })}
                />
                <input
                  placeholder="Age"
                  type="number"
                  {...registerEdit("age", { required: true })}
                />
                <input
                  placeholder="File"
                  type="file"
                  {...registerEdit("file", { required: true })}
                />
                <button type="submit">Save</button>
              </form>
            </>
          ) : (
            <>
              <Image src={el.file} width={500} height={300} alt="img" />
              <h5>{el.name}</h5>
              <button onClick={() => deleteHandler(el._id!)}>Delete</button>
              <button
                onClick={() => {
                  setEditId(el._id!);
                  setValue("name", el.name);
                  setValue("age", el.age);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default TodoList;
