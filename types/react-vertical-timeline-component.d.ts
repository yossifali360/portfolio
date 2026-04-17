declare module "react-vertical-timeline-component" {
  import type { ReactNode, CSSProperties } from "react";

  interface VerticalTimelineProps {
    animate?: boolean;
    className?: string;
    layout?: "1-column" | "1-column-left" | "1-column-right" | "2-columns";
    lineColor?: string;
    children: ReactNode;
  }

  interface VerticalTimelineElementProps {
    id?: string;
    className?: string;
    date?: string;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconStyle?: CSSProperties;
    iconOnClick?: () => void;
    contentStyle?: CSSProperties;
    contentArrowStyle?: CSSProperties;
    style?: CSSProperties;
    textClassName?: string;
    position?: string;
    visible?: boolean;
    shadowSize?: "small" | "medium" | "large";
    intersectionObserverProps?: Record<string, unknown>;
    onTimelineElementClick?: () => void;
    children?: ReactNode;
  }

  export const VerticalTimeline: (props: VerticalTimelineProps) => JSX.Element;
  export const VerticalTimelineElement: (props: VerticalTimelineElementProps) => JSX.Element;
}
