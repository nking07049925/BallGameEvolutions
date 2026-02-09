import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import "./Popover.css";

export type PopoverProps = {
  children: ComponentChildren;
  content: ComponentChildren;
  enterDelay?: number;
  leaveDelay?: number;
};

export const Popover = ({
  children,
  content,
  enterDelay,
  leaveDelay,
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
    <div className="popover-container">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {children}
      </div>
      {isVisible && (
        <div
          id="popover-content"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={popoverRef}
          className="popover-content"
          role="dialog"
          aria-modal="true"
        >
          {content}
        </div>
      )}
    </div>
  );
};
