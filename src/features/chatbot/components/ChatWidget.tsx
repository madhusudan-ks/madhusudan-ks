// src/features/chatbot/components/ChatWidget.tsx
import React, { useState, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import type { ChatMessage } from '../types/chatbot.types';
import { matchQuestion } from '../services/intentMatcher';
import ChatPanel from './ChatPanel';
import styles from './ChatWidget.module.scss';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      // Focus return when closing
      if (!next && launcherRef.current) {
        setTimeout(() => launcherRef.current?.focus(), 50);
      }
      return next;
    });
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (launcherRef.current) {
      setTimeout(() => launcherRef.current?.focus(), 50);
    }
  }, []);

  const handleClearChat = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  const handleSendMessage = useCallback((userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    const timeString = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: timeString,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Micro-delay (220ms) for natural conversational feel
    setTimeout(() => {
      const matchResult = matchQuestion(trimmed);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: matchResult.response.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        links: matchResult.response.links,
        tags: matchResult.response.tags,
        suggestions: matchResult.response.suggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 220);
  }, []);

  return (
    <div className={styles.chatbotRoot}>
      {/* Floating Chat Panel */}
      <ChatPanel
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearChat={handleClearChat}
        isTyping={isTyping}
      />

      {/* Floating Action Button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggleOpen}
        className={`${styles.launcherButton} ${isOpen ? styles.open : ''}`}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio chat assistant'}
        aria-expanded={isOpen}
        title="Chat with Madhusudan's Portfolio Assistant"
      >
        <span className={styles.launcherPulse} aria-hidden="true" />
        <Icon
          icon={isOpen ? 'ph:x-bold' : 'ph:chat-teardrop-dots-fill'}
          className={styles.launcherIcon}
        />
      </button>
    </div>
  );
};

export default ChatWidget;
