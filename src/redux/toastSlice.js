import { createSlice } from "@reduxjs/toolkit";
const initialState = {
        messages: [],
    };
    
// 在 API 回傳後透過 slice 設定的 action 新增吐司訊息（通知使用者結果）
    // - 在 slice 設定 reducers，並將 actions 解構後匯出
    // 1. pushMessage
    // 1. 可以透過 Date.now() 作為 id
const toastSlice =  createSlice({
    name: 'toast',
    initialState,
    reducers:{
        PushMessage(state, action){
            const {text, status} = action.payload;
            const id = Date.now();
            
            state.messages.push({
                id,text,status
            })
        },
        // 刪除舊的土司訊息
        removeMessage(state,action){
            const message_id = action.payload;
            // 透過message_id，到陣列裡面找index
            const index = state.messages.findIndex((message)=>message.id === message_id);

            // 如果index不是-1就把message刪掉
            if(index !== -1){
                state.messages.splice(index, 1);
            }
        }
    }
})

export const { PushMessage, removeMessage } = toastSlice.actions;
export default toastSlice.reducer;