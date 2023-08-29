import { RootState } from 'store'
import { ClientLobbyResponse } from '@flappyblock/shared'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'



const initialState: ClientLobbyResponse = {
    lobbyId: "0",
    players: [],
    playerId: "",
    type: "NONE",
}

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    updateLobby: (state, {payload}: PayloadAction<ClientLobbyResponse>) => {
      return payload;
    }
  }
})

export const { updateLobby } = lobbySlice.actions
export const selectLobby = (state: RootState) => state.lobby
export default lobbySlice.reducer

