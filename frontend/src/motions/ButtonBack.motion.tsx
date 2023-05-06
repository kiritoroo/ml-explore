import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import { 
  StyledContainer
} from '@style/comp/ButtonBack.styled'

interface IContainerProps {
  children: React.ReactNode
  color: string
  onClick: () => void
}
export const MotionContainer: React.FC<IContainerProps> = React.memo(( props) => {
  const { children, color, onClick } = props;

  const transition = useRef<Transition>({
    duration: 0.3
  });

  const variants = useRef<Variants>({
    hide: { opacity: 1, x: "-120%" },
    enter: { opacity: 1, x: 0 }
  })

  return (
    <StyledContainer
      onClick={ onClick }
      color={ color }
      variants={ variants.current }
      transition={ transition.current }
      initial='hide'
      animate='enter'
      exit='hide'
    >
      { children }
    </StyledContainer>
  )
})