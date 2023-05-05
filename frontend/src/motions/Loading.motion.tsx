import React, { useRef } from 'react';
import { 
  AnimatePresence,
  Transition,
  Variants
} from 'framer-motion';
import {
  StyledContainer,
  StyledDotWrapper,
  StyledDot
} from '@style/comp/Loading.styled'

interface IContainerProps {
  children: React.ReactNode
}
export const MotionContainer: React.FC<IContainerProps> = React.memo(( props ) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 0.3, delay: 0.1, ease: "easeInOut"
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0 },
    enter: { opacity: 1, transition: transition.current },
    exit: { opacity: 0, transition: transition.current }
  })

  return (
    <StyledContainer
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={ variants.current }
    >
      { children }
    </StyledContainer>
  )
})

interface IDotWrapperProps {
  children: React.ReactNode
}
export const MotionDotWrapper: React.FC<IDotWrapperProps> = ( props ) => {
  const { children } = props
  
  const transition = useRef<Transition>({
    staggerChildren: 0.2
  });
  
  const variants = useRef<Variants>({
    start: { transition: transition.current },
    end: { transition: transition.current }
  });

  return (
    <StyledDotWrapper 
      variants={ variants.current }
      initial="start"
      animate="end"
    >
      { children }
    </StyledDotWrapper>
  )
}

interface IDotProps {
  color: string
}
export const MotionDot: React.FC<IDotProps> = (props: IDotProps) => {
  const { color } = props;

  const transition = useRef<Transition>({
    duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut"
  });
  
  const variants = useRef<Variants>({
    start: { y: "0%" },
    end: { y: "100%" }
  });

  return (
    <StyledDot
      color={ color }
      variants={ variants.current } 
      transition={ transition.current }
    />
  )
}
