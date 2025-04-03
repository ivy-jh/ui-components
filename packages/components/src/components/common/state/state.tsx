import * as React from 'react';
import { cn } from '@/utils/class-name';
import { dot, type DotVariants } from './state.css';
import { Flex } from '@/components/common/flex/flex';
import { type MessageData, Message } from '@/components/common/message/message';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/common/tooltip/tooltip';

type State = NonNullable<DotVariants>['state'];

export const evalDotState = (messages: Array<MessageData>, state: State) => {
  if (messages.find(({ variant }) => variant === 'error')) {
    return 'error';
  }
  if (messages.find(({ variant }) => variant === 'warning')) {
    return 'warning';
  }
  return state;
};

export type StateDotProps = DotVariants & { messages?: Array<MessageData> };

const StateDot = React.forwardRef<HTMLDivElement, StateDotProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ state, messages = [], className, ...props }, ref) => {
    const dotState = evalDotState(messages, state);
    return (
      <TooltipProvider>
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <div
              ref={ref}
              className={cn(dot({ state: dotState }), className, 'ui-state-dot')}
              data-state={dotState}
              role='status'
              {...props}
            />
          </TooltipTrigger>
          {messages.length > 0 && (
            <TooltipContent collisionPadding={10} sideOffset={10}>
              <Flex direction='column'>
                {messages.map((msg, index) => (
                  <Message key={index} {...msg} />
                ))}
              </Flex>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }
);
StateDot.displayName = 'StateDot';

export { StateDot };
