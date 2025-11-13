import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCharacter } from "../../services/Character";
import { CharactersState } from "../../types/Character";
import { FormatAllCharacter } from "../../utils";

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCharacter();
      return FormatAllCharacter(response.results);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch characters");
    }
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default charactersSlice.reducer;
