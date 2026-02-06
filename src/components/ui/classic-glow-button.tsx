import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './ClassicGlowButton.css';

export interface ClassicGlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Content to display inside the button
   */
  children: ReactNode;
}

/**
 * Classic animated glow button with rainbow gradient border effect
 * Uses linear gradient with background-position animation for smooth color transitions
 *
 * @example
 * ```tsx
 * <ClassicGlowButton onClick={() => console.log('Clicked!')}>
 *   Hover me
 * </ClassicGlowButton>
 * ```
 */
export const ClassicGlowButton = React.forwardRef<HTMLButtonElement, ClassicGlowButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`glow-on-hover ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ClassicGlowButton.displayName = 'ClassicGlowButton';

export default ClassicGlowButton;