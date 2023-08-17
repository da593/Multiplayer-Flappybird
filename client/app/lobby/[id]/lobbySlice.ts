import { RootState } from 'store'
import { LobbyResponse } from '@flappyblock/shared'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: LobbyResponse = {
    lobbyId: "0",
    players: [],
    playerId: "",
}

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    updateLobby: (state, {payload}: PayloadAction<LobbyResponse>) => {
      return payload;
    }
  }
})

export const { updateLobby } = lobbySlice.actions
export const selectLobby = (state: RootState) => state.lobby
export default lobbySlice.reducer

