import { StatusTypes } from "../utils";
import React from 'react'
import { TimeItemBase, ItemContent, Itemlabel, ItemTail, ItemHead } from "./wrapper";
import { getColor } from "../utils/getColor";
import { useTimelineContext } from "./context";
export interface TimeLineItemProps {
    className?: string;
    status?: 'success'|'error'|'default'|'disabled';
    color?:string
    dot?: React.ReactNode;
    pending?: boolean;
    last?:boolean
    position?: string;
    style?: React.CSSProperties;
    label?: React.ReactNode;
  }

  const TimelineItem: React.FC<TimeLineItemProps> = props => {
   const {mode}=useTimelineContext()
    const {
     
      className,
      status="default",
      children,
      last,
      pending=false,
      dot,
      color,
      label,
      position,
      ...restProps
    } = props;
  

    
  
    return (
      <TimeItemBase id="rong-timeline-item" {...restProps} className={className}>
      {label && <Itemlabel id="timeline-item-label" right={mode==="right"}>{label}</Itemlabel>}
       {!last&& <ItemTail pending={pending} right={mode==="right"}/>}
        <ItemHead
        id="timeline-item-dot"
          dot={dot?true:false}
          position={mode}
          pending={pending}
          color={color||getColor(status)}
        >
          {dot}
        </ItemHead>
        <ItemContent right={mode==="right"} label={label?true:false}>{children}</ItemContent>
      </TimeItemBase>
    );
  };
  

  
  export default TimelineItem;