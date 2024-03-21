import {createSlice} from '@reduxjs/toolkit'

const initialState={
  name:"",
  role:""
}

export const userSlice =createSlice({
  name:'user',
  initialState:initialState,
  reducers:{
    addUser:(state, action)=>{
      const {name, role}=action.payload;
      state.name=name;
      state.role=role
    },
    changeName:(state, action)=>{
      state.name=action.payload;
    },
    changeRole:(state, action)=>{
      state.role=action.payload;
    },
    deleteUser:(state, action)=>{
      state.name=" ";
      state.role=" "
},
  }
})

export const {addUser,changeName,changeRole, deleteUser}=userSlice.actions
export default userSlice.reducer