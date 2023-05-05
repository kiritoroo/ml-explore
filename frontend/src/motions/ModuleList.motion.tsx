import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledModuleListItemWrapper
} from '@style/comp/ModuleList.styled'

interface IModuleListItemWrapperProps {
  children: React.ReactNode
  index: number
}
export const MotionModuleListItemWrapper: React.FC<IModuleListItemWrapperProps> = React.memo(( props ) => {
  const { children, index } = props;

  const transition = useRef<Transition>({
    duration: 0.8, delay: index * 0.05, type: 'keyframes'
  });

  const variants = useRef<Variants>({
    hide: { opacity: 0, x: '-50%' },
    enter: { opacity: 1, x: '0' }
  })

  return (
    <StyledModuleListItemWrapper
      variants={ variants.current }
      transition={ transition.current }
      initial='hide'
      animate='enter'
    >
      { children }
    </StyledModuleListItemWrapper>
  )
})