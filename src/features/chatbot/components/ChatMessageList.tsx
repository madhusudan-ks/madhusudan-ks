// src/features/chatbot/components/ChatMessageList.tsx
import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import type { ChatMessage } from '../types/chatbot.types';
import styles from './ChatWidget.module.scss';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onSelectSuggestion: (text: string) => void;
}

/**
 * Safely parses basic bold markdown (**text**) without unsanitized HTML injection.
 */
function renderFormattedText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return <strong key={index}>{inner}</strong>;
    }
    return part;
  });
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping,
  onSelectSuggestion,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div
      className={styles.messageList}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {/* Welcome Card on startup */}
      {messages.length === 0 && (
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeTitle}>
            <Icon icon="ph:sparkle-fill" style={{ color: 'var(--accent)' }} />
            <span>Portfolio Assistant</span>
          </div>
          <p className={styles.welcomeText}>
            Ask me anything about Madhusudan’s technical skills, featured projects, work history, or contact channels.
          </p>

          <div className={styles.quickPromptsLabel}>Suggested Topics</div>
          <div className={styles.suggestionsContainer}>
            {[
              '👋 Tell me about yourself',
              '💻 Key technical skills',
              '🚀 Featured projects',
              '💼 Work experience',
              '📫 How can I contact you?',
            ].map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSuggestion(prompt.replace(/^[^\w]+/, ''))}
                className={styles.suggestionChip}
                aria-label={`Ask: ${prompt}`}
              >
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Stream */}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`${styles.messageRow} ${
            msg.sender === 'user' ? styles.user : styles.bot
          }`}
        >
          <div className={styles.messageBubble}>
            {renderFormattedText(msg.text)}

            {/* Action Links */}
            {msg.links && msg.links.length > 0 && (
              <div className={styles.actionLinks}>
                {msg.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target={link.isExternal ? '_blank' : '_self'}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className={styles.actionLink}
                  >
                    <span>{link.label}</span>
                    {link.isExternal && (
                      <Icon icon="ph:arrow-square-out" fontSize={14} />
                    )}
                  </a>
                ))}
              </div>
            )}

            {/* Tags / Pills */}
            {msg.tags && msg.tags.length > 0 && (
              <div className={styles.tagsRow}>
                {msg.tags.map((tag, tIdx) => (
                  <span key={tIdx} className={styles.techTag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span className={styles.timestamp}>{msg.timestamp}</span>

          {/* Follow-up Suggestions under bot message */}
          {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
            <div className={styles.suggestionsContainer}>
              {msg.suggestions.map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => onSelectSuggestion(suggestion)}
                  className={styles.suggestionChip}
                  aria-label={`Ask follow up: ${suggestion}`}
                >
                  <Icon icon="ph:arrow-elbow-down-right" fontSize={13} />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Typing dots */}
      {isTyping && (
        <div className={`${styles.messageRow} ${styles.bot}`}>
          <div className={styles.typingIndicator} aria-label="Thinking...">
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessageList;
