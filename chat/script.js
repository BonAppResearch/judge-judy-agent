document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    // API configuration
    const API_URL = 'https://autonome.alt.technology/judy-wtucvi/d26fcfdf-fb35-0972-958b-61d7a545d389/message';
    const AUTH_HEADER = 'Basic anVkeTpSa2ZIZWJxandM';

    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to send message to API
    async function sendMessage(text) {
        try {
            sendButton.disabled = true;
            messageInput.disabled = true;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': AUTH_HEADER
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            // Handle the array response format and extract text
            if (Array.isArray(data) && data.length > 0 && data[0].text) {
                addMessage(data[0].text, false);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, I encountered an error. Please try again.', false);
        } finally {
            sendButton.disabled = false;
            messageInput.disabled = false;
            messageInput.focus();
        }
    }

    // Event listeners
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            sendMessage(message);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = messageInput.value.trim();
            if (message) {
                addMessage(message, true);
                sendMessage(message);
                messageInput.value = '';
            }
        }
    });

    // Focus input on load
    messageInput.focus();
}); 