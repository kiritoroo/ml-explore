import React, { useRef, forwardRef } from 'react';
import { Transition, Variants } from 'framer-motion';
import {
  StyledModalWrapper  
} from '@style/comp/ModelAbout.styled';

interface IModalWrapperProps {
  children: React.ReactNode;
  isShow: boolean;
}
export const MotionModalWrapper = forwardRef<HTMLDivElement, IModalWrapperProps>((props, ref) => {
  const { children, isShow } = props;

  const transition = useRef<Transition>({
    duration: 0.3, type: 'keyframes'
  })

  const variants = useRef<Variants>({
    show: { y: 0 },
    hide: { y: "100%" }
  })

  return (
    <StyledModalWrapper
      ref={ref}
      variants={ variants.current }
      transition={ transition.current }
      initial="hide"
      animate={ isShow ? "show" : "hide" }
      exit="hide"
    >
      { children }    
    </StyledModalWrapper>
  )
})
