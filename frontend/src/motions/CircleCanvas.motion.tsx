import React, { useRef } from 'react';
import { 
  AnimatePresence,
  Transition,
  Variants
} from 'framer-motion';
import {
  StyledCanvasWrapper
} from '@style/comp/CircleCanvas.styled'

interface ICanvasWrapperProps {
  children: React.ReactNode
}
export const MotionCanvasWrapper: React.FC<ICanvasWrapperProps> = React.memo(( props ) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 0.3, delay: 0.2, ease: "easeInOut"
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
  })

  return (
    <StyledCanvasWrapper
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate="enter"
    >
      { children }
    </StyledCanvasWrapper>
  )
})
