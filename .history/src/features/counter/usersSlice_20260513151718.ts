import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
  users: string[];
}

const initialState: UsersState = {
  users: [],
};


const userSlice = createSlice({})
