import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")? JSON.parse(localStorage.getItem("pastes")): []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => { 
      const paste = action.payload;
      const existedTitle = state.pastes.some((state) => state.title === paste.title)
      if (paste.content == '') {
        toast.error("Content Cannot Be Empty")
        return;
      }
      if (paste.title == '') {
        toast.error("Title Cannot Be Empty")
        return;
      }

      if (existedTitle) {
        toast.error("Same Title Paste Already Existed")
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully")
    },
    updateToPaste: (state, action) => { 
      const paste = action.payload;
      const index = state.pastes.findIndex((state) => state._id === paste._id)
      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste Updates Successfully")
      }
    },
    resetAllPastes: (state, action) => { 
      state.pastes = []
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success("Paste Reseted Successfully")
    },
    removePaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((state) => state._id === paste)
      if(index >= 0) {
        state.pastes.splice(index, 1)
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste Deleted Successfully")
      }
      console.log("delete")
    }
  },
});

export const { addToPaste, updateToPaste, resetAllPastes, removePaste } = pasteSlice.actions;
export default pasteSlice.reducer;
