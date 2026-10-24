// src/features/chatbot/components/ChatInput.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import styles from './ChatWidget.module.scss';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus input when mounted or enabled
  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setInput('');

    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [input, disabled, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto-adjust height up to max
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 100);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const isSendDisabled = disabled || !input.trim();

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about skills, projects, experience..."
          className={styles.chatTextarea}
          rows={1}
          maxLength={400}
          aria-label="Ask a question about Madhusudan's portfolio"
          disabled={disabled}
        />
      </div>

      <button
        type="button"
        onClick={handleSend}
        disabled={isSendDisabled}
        className={styles.sendButton}
        aria-label="Send message"
      >
        <Icon icon="ph:paper-plane-right-fill" />
      </button>
    </div>
  );
};

export default ChatInput;
