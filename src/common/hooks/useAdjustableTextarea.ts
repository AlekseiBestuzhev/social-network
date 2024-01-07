import { RefObject, useRef } from 'react';

type UseAdjustableTextareaReturn = {
  textareaRef: RefObject<HTMLTextAreaElement>;
  adjustTextareaHeight: () => void;
};

/**
 * Generates a textarea with adjustable height based on its content.
 *
 * @param {number} maxHeight - the maximum height the textarea can have
 * @return {object} - an object containing the textareaRef and adjustTextareaHeight function
 */

export const useAdjustableTextarea = (maxHeight: number): UseAdjustableTextareaReturn => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      if (textareaRef.current.scrollHeight > maxHeight) {
        textareaRef.current.style.overflowY = 'scroll';
        textareaRef.current.style.height = `${maxHeight}px`;
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  };

  return { textareaRef, adjustTextareaHeight };
};
