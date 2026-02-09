import type { ComponentChildren, CSSProperties } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import "./Popover.css";

export type PopoverProps = {
  children: ComponentChildren;
  content: ComponentChildren;
  enterDelay?: number;
  leaveDelay?: number;
  containerStyle?: string | CSSProperties;
  triggerStyle?: string | CSSProperties;
  contentStyle?: string | CSSProperties;
};

export const Popover = ({
  children,
  content,
  enterDelay,
  leaveDelay,
  containerStyle,
  contentStyle,
  triggerStyle,
}: PopoverProps) => {
  enterDelay ??= 300;
  leaveDelay ??= 100;

  const [isVisible, setVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const enterTimeout = useRef<number | undefined>(undefined);
  const leaveTimeout = useRef<number | undefined>(undefined);

  const clearEnterTimeout = () => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
  };
  const clearLeaveTimeout = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
  };
  const clearAllTimeouts = () => {
    clearEnterTimeout();
    clearLeaveTimeout();
  };

  const handleMouseEnter = () => {
    clearAllTimeouts();
    enterTimeout.current = setTimeout(() => {
      setVisible(true);
      enterTimeout.current = undefined;
      clearLeaveTimeout();
    }, enterDelay);
  };

  const handleMouseLeave = () => {
    clearAllTimeouts();
    leaveTimeout.current = setTimeout(() => {
      setVisible(false);
      leaveTimeout.current = undefined;
      clearEnterTimeout();
    }, leaveDelay);
  };

  useEffect(() => clearAllTimeouts, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setVisible(false); // Close the popover if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="popover-container" style={containerStyle}>
      <div
        ref={triggerRef}
        class="popover-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
        style={triggerStyle}
      >
        {children}
      </div>
      {isVisible && (
        <div
          id="popover-content"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={popoverRef}
          class="popover-content"
          role="dialog"
          aria-modal="true"
          style={contentStyle}
        >
          {content}
        </div>
      )}
    </div>
  );
};
