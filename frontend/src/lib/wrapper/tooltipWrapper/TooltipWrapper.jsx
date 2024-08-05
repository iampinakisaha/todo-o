import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const TooltipWrapper = ({ children, displayText, triggerClassname = "", contentClassname = "" }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={`${triggerClassname}`}>
          {children}
        </TooltipTrigger>
        <TooltipContent className={`${contentClassname}`}>
          <p>{displayText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
