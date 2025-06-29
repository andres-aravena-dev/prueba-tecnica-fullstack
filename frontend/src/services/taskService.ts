import axios from 'axios';
import type { Task } from '../types/task';

const url = 'http://localhost:3000/api/tasks'; 

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(url);
  return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await axios.post(url, task);
  return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await axios.put(`${url}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${url}/${id}`);
};
