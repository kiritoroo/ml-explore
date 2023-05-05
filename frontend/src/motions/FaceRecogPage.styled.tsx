import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledContainer
} from '@style/page/FaceRecogPage.styled'

interface IContainerProps {
  children: React.ReactNode
}
export const MotionContainer: React.FC<IContainerProps> = React.memo(( props) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 0
  });

  const variants = useRef<Variants>({
    hide: {},
    enter: {}
  })

  return (
    <StyledContainer
      variants={ variants.current }
      transition={ transition.current }
      initial='enter'
      animate='enter'
      exit='hide'
    >
      { children }
    </StyledContainer>
  )
})