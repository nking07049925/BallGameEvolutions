import type { ComponentChildren, CSSProperties } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import "./Popover.css";
import { createPortal } from "preact/compat";
import { constrain } from "../util/Math";
import { joinClassNames } from "../util/Data";

export type PopoverProps = {
  children: ComponentChildren;
  content: ComponentChildren;
  enterDelay?: number;
  leaveDelay?: number;
  containerStyle?: string | CSSProperties;
  triggerStyle?: string | CSSProperties;
};

type PopoverPortalProps = {
  children: ComponentChildren;
  root?: HTMLElement | null;
};

const PopoverPortal = ({ children, root }: PopoverPortalProps) => {
  const popoverRoot = root ?? document.getElementById("popover-root");
  return popoverRoot && createPortal(children, popoverRoot);
};

export const Popover = ({
  children,
  content,
  enterDelay,
  leaveDelay,
  containerStyle,
  triggerStyle,
}: PopoverProps) => {
  enterDelay ??= 300;
  leaveDelay ??= 100;

  const [isVisible, setVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const enterTimeout = useRef<number | undefined>(undefined);
  const leaveTimeout = useRef<number | undefined>(undefined);

  const [pos, setPos] = useState<
    { top: number; left: number; overflowsRight: boolean } | undefined
  >(undefined);

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
      setPos(undefined);
      leaveTimeout.current = undefined;
      clearEnterTimeout();
    }, leaveDelay);
  };

  useEffect(() => clearAllTimeouts, []);

  const popoverRoot = document.getElementById("popover-root");

  const borderPadding = 16;

  const calcPos = () => {
    const popoverRootRect = popoverRoot?.getBoundingClientRect();
    const clientRect = triggerRef.current?.getBoundingClientRect();
    const popoverHeight = popoverRef.current?.clientHeight ?? 0;
    const popoverWidth = popoverRef.current?.clientWidth ?? 0;
    const containerTop = -(popoverRootRect?.top ?? 0);
    const containerWidth = popoverRootRect?.width ?? 0;

    const left = constrain(
      (clientRect?.left ?? 0) + (clientRect?.width ?? 0) / 2,
      borderPadding,
      containerWidth - borderPadding,
    );
    const top = constrain(
      (clientRect?.top ?? 0) + (clientRect?.height ?? 0) / 2 + containerTop,
      popoverHeight / 2 + containerTop + borderPadding,
      containerTop + window.innerHeight - popoverHeight / 2 - borderPadding,
    );

    const overflowsRight = left > containerWidth - popoverWidth;
    setPos({ left, top, overflowsRight });
  };

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
        <PopoverPortal root={popoverRoot}>
          <div
            id="popover-content"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={(ref) => {
              popoverRef.current = ref;
              if (!pos && ref) calcPos();
            }}
            class={joinClassNames(
              "popover-content",
              pos?.overflowsRight && "left",
            )}
            role="dialog"
            aria-modal="true"
            style={{
              left: pos?.left ?? 0,
              top: pos?.top ?? 0,
              visibility: pos ? "unset" : "hidden",
            }}
          >
            {content}
          </div>
        </PopoverPortal>
      )}
    </div>
  );
};
