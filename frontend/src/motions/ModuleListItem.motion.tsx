import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledContainer,
  StyledLabelWrapper
} from '@style/comp/ModuleListItem.styled'

interface IContainerProps {
  children: React.ReactNode
  color: string
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}
export const MotionContainer: React.FC<IContainerProps> = React.memo(( props ) => {
  const {children, color, isSelected, onClick, onMouseEnter, onMouseLeave } = props;

  const transition = useRef<Transition>({
    duration: 0.4
  });

  const variants = useRef<Variants>({
    hide: { opacity: 0, pointerEvents: 'none' },
    show: { opacity: 1, pointerEvents: 'all' }
  })

  return (
    <StyledContainer
      onClick={ onClick }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
      color={ color }
      variants={ variants.current }
      transition={ transition.current }
      initial='show'
      animate={ isSelected ? 'show' : 'hide' }
    >
      { children }
    </StyledContainer>
  )
})


interface ILabelWrapperProps {
  children: React.ReactNode
}
export const MotionLabelWrapper: React.FC<ILabelWrapperProps> = React.memo(( props ) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 1
  });

  const variants = useRef<Variants>({
    hide: { opacity: 0, x: '-50%' },
    enter: { opacity: 1, x: '0' }
  })

  return (
    <StyledLabelWrapper
      variants={ variants.current }
      transition={ transition.current }
      initial='hide'
      animate='enter'
    >
      { children }
    </StyledLabelWrapper>
  )
})
