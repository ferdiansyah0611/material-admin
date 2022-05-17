import { configureStore } from '@reduxjs/toolkit'
// reducer
import appReducer from './app'
import themeReducer from './theme'
import userReducer from './user'
import notification from './notification'

var store = configureStore({
	reducer: {
		app: appReducer,
    theme: themeReducer,
    user: userReducer,
    notification
	},
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        // ignoredActions: ['app/setmyproject'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        // ignoredPaths: ['items.dates'],
      },
    }),
})

export default store