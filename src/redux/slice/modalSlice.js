import {createSlice} from '@reduxjs/toolkit'

const initialState={
  modal:false,
  modalgarment:false,
}

export const modalSlice =createSlice({
  name:'modal',
  initialState:initialState,
  reducers:{
    stateModal:(state, action)=>{
      const {modal}=action.payload;
      state.modal=modal;


    },
    stateModalGarment:(state, action)=>{
      const {modalgarment}=action.payload;
      state.modalgarment=modalgarment;
    }
  }
})

export const {stateModal, stateModalGarment}=modalSlice.actions
export default modalSlice.reducer