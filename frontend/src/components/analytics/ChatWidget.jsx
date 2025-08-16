/**
 * AI Chat Widget Component
 * 
 * Interactive chat interface for AI-powered product queries. Provides a floating
 * chat widget that allows users to ask natural language questions about their
 * product inventory and receive intelligent responses from the AI assistant.
 */

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleChat,
  closeChat,
  clearMessages,
  addUserMessage,
  sendChatMessage,
  clearError,
} from '../../store/analyticsSlice';

/**
 * ChatWidget Component
 * 
 * Floating chat interface that provides AI-powered assistance for product queries.
 * Features include message history, auto-scroll, error handling, and responsive design.
 * 
 * @component
 * @returns {JSX.Element} Chat widget with toggle button or full chat interface
 */
const ChatWidget = () => {
  const dispatch = useDispatch();
  
  // Extract chat state from Redux store
  const { messages, loading, error, isOpen } = useSelector((state) => state.analytics);
  
  // Local state for message input
  const [inputMessage, setInputMessage] = useState('');
  
  // Reference for auto-scrolling to latest messages
  const messagesEndRef = useRef(null);

  /**
   * Auto-scroll to Latest Message
   * 
   * Smoothly scrolls the chat container to show the most recent message.
   * Enhances user experience by keeping latest content visible.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll whenever new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear any existing errors when chat is opened
  useEffect(() => {
    if (isOpen && error) {
      dispatch(clearError());
    }
  }, [isOpen, error, dispatch]);

  /**
   * Handle Message Submission
   * 
   * Processes user message submission, adds message to chat history,
   * and sends to AI backend for processing. Handles errors gracefully.
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = inputMessage.trim();
    
    // Prevent empty message submission
    if (!message) return;

    // Add user message to chat immediately for responsive UI
    dispatch(addUserMessage(message));
    setInputMessage(''); // Clear input field

    // Send message to AI backend for processing
    try {
      await dispatch(sendChatMessage(message)).unwrap();
    } catch (error) {
      console.error('Failed to send message:', error);
      // Error handling is managed by Redux slice
    }
  };

  /**
   * Handle Chat History Clear
   * 
   * Clears all messages from the chat history, providing a fresh start
   * for new conversations.
   */
  const handleClearChat = () => {
    dispatch(clearMessages());
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => dispatch(toggleChat())}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Product Assistant</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleClearChat}
            className="text-indigo-200 hover:text-white transition-colors"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={() => dispatch(closeChat())}
            className="text-indigo-200 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm">
            <p>👋 Hi! I'm your product assistant.</p>
            <p>Ask me anything about your inventory!</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{typeof error === 'string' ? error : 'An error occurred'}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about your products..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;