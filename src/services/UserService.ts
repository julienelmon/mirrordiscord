import axios from "./axios";
import { Axios, AxiosResponse } from 'axios';
import { User } from '../../server/model/User';

export const login = async (user: User) =>
    await axios.post(`/login`, user);

export const register = async (user: User) =>
    await axios.post("/register", user)

export const json = async (jsonData: any) => 
    await axios.post("/modifyjson", jsonData)

export const updatePassword = async (id: string, user: User) =>
    await axios.put("/changePassword/" + id, user)

export const updateEmail = async (id: string, user: User) =>
    await axios.put("/changeEmail/" + id, user)

export const getUsers = async (): Promise<AxiosResponse<User[]>> =>
    await axios.get("/users")

export const deleteUser = async (id: string): Promise<AxiosResponse<User>> =>
    await axios.delete("/users/" + id)