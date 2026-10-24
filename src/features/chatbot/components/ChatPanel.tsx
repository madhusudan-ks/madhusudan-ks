// src/features/chatbot/components/ChatPanel.tsx
import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import type { ChatMessage } from '../types/chatbot.types';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import styles from './ChatWidget.module.scss';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  isTyping: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onClearChat,
  isTyping,
}) => {
  // Listen for Escape key to close chat
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <aside
      className={styles.chatPanel}
      role="region"
      aria-label="Portfolio Chat Assistant"
    >
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.avatarWrapper}>
            <Icon icon="ph:robot-duotone" />
            <div className={styles.statusDot} title="Online" />
          </div>
          <div className={styles.headerTitles}>
            <span className={styles.botName}>Portfolio Assistant</span>
            <span className={styles.botSubtitle}>Madhusudan K S • Factual Guide</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={onClearChat}
            className={styles.headerBtn}
            aria-label="Clear chat conversation"
            title="Reset conversation"
          >
            <Icon icon="ph:arrow-counter-clockwise-bold" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.headerBtn}
            aria-label="Close chat assistant"
            title="Close"
          >
            <Icon icon="ph:x-bold" />
          </button>
        </div>
      </header>

      {/* Message List */}
      <ChatMessageList
        messages={messages}
        isTyping={isTyping}
        onSelectSuggestion={onSendMessage}
      />

      {/* Input Field */}
      <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
    </aside>
  );
};

export default ChatPanel;
