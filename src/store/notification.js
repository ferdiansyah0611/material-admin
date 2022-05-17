import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    data: [
        {
            message: 'Item A out of stock',
            created: Date.now()
        },
        {
            message: 'Item B out of stock',
            created: Date.now()
        },
        {
            message: 'Item C out of stock',
            created: Date.now()
        },
    ]
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        handle(state, action) {
            state[action.payload.name] = action.payload.value
        },
        add(state, action) {
            state.data.push(action.payload)
        }
    },
    extraReducers: {},
})
export const { handle, add } = notificationSlice.actions

export default notificationSlice.reducer