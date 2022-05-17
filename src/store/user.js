import { createSlice } from '@reduxjs/toolkit'

var initialState = {
	data: {
		name: null,
		email: null
	},
	isLoading: true
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		handle(state, action) {
			state[action.payload.name] = action.payload.value
		},
		add(state, action) {
			state.data = action.payload
			state.isLoading = false
		},
		reset(state, action) {
			state.data = {
				name: null,
				email: null
			}
			state.isLoading = false
		},
		logout(state, action) {
			state.data = {
				name: '',
				email: ''
			}
		}
	},
	extraReducers: {},
})
export const { handle, add, reset, logout } = userSlice.actions

export default userSlice.reducer