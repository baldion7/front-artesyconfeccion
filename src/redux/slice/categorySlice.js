import {createSlice} from '@reduxjs/toolkit'

const initialState={
  name:"",
}

export const categorySlice =createSlice({
  name:'category',
  initialState:initialState,
  reducers:{
    addCategory:(state, action)=>{
      const {name}=action.payload;
      state.name=name;

    }
  }
})

export const {addCategory}=categorySlice.actions
export default categorySlice.reducer