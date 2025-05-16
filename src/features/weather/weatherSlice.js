import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async (loc = { lat: null, lon: null }) => {
    const path =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      loc.lat +
      "&lon=" +
      loc.lon +
      "&appid=c0cc93f437c4711351ed54397912472d";

    const response = await axios.get(path);

    const responseIcon =
      "https://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png";

    return {
      temperature: Math.round(response.data.main.temp - 272.15),
      description: response.data.weather[0].description,
      iconPath: responseIcon,
      min: Math.round(response.data.main.temp_min - 272.15),
      max: Math.round(response.data.main.temp_max - 272.15),
    };
  }
);
export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    value: {
      temperature: null,
      description: null,
      iconPath: null,
      min: null,
      max: null,
    },
    isLoading: true,
  },
  reducers: {
    testReducer: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      console.log(action.payload);
    },
  },

  extraReducers(builder) {
    builder
      .addCase("weatherApi/fetchWeather/pending", (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { getTempData } = weatherSlice.actions;

export default weatherSlice.reducer;
