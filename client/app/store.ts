import { configureStore } from '@reduxjs/toolkit'
import lobbyReducer from 'lobby/[id]/lobbySlice'

export const store = configureStore({
    reducer: {
      lobby: lobbyReducer,
    }
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

