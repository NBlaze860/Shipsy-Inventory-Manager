import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

// Initial state for the analytics slice
const initialState = {
  messages: [],
  loading: false,
  error: null,
  isOpen: false,
};

// Async thunk for sending chat message
export const sendChatMessage = createAsyncThunk(
  "analytics/sendChatMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/analytics/chatbot", {
        prompt: message, // Backend expects 'prompt', not 'message'
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
    },
    addUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: "user",
        timestamp: new Date().toISOString(),
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send chat message actions
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        // Add bot response to messages - backend returns { reply }
        const botResponse =
          action.payload.reply ||
          action.payload.response ||
          action.payload.message ||
          "No response received";
        state.messages.push({
          id: Date.now() + 1,
          text:
            typeof botResponse === "string"
              ? botResponse
              : JSON.stringify(botResponse),
          sender: "bot",
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        // Handle error object properly
        let errorMessage = "Failed to send message";
        if (action.payload) {
          if (typeof action.payload === "string") {
            errorMessage = action.payload;
          } else if (action.payload.error) {
            errorMessage = action.payload.error;
          } else if (action.payload.message) {
            errorMessage = action.payload.message;
          }
        }
        state.error = errorMessage;
      });
  },
});

export const {
  toggleChat,
  closeChat,
  clearMessages,
  addUserMessage,
  clearError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
