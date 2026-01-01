import { createSlice } from '@reduxjs/toolkit'

const initialState = {
profile_url:null,
url:{},
scrollstate:false,
scrolltop:false,

}

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
getProfileUrl:(state,action)=>{
    state.profile_url=action.payload;
 },
  getLogout: (state) => {
      state.profile_url = null;  // remove profile image
    },
 getUrl:(state,action)=>{
    state.url=action.payload;
 },
 getScrollState:(state,action)=>{
state.scrollstate=action.payload;
 },
 getScrollTop:(state,action)=>{
  state.scrolltop=action.payload;
 },
  },
})

export const {getProfileUrl, getLogout, getUrl,getScrollState,getScrollTop} = homeSlice.actions

export default homeSlice.reducer