import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import { 
  StyledContainer,
  StyledNavbarWrapper,
  StyledLogo,
  StyledGradientBar
} from '@style/comp/Navbar.styled'

interface IContainerProps {
  children: React.ReactNode
  isSelectedModule: boolean
}
export const MotionContainer: React.FC<IContainerProps> = React.memo(( props) => {
  const { children, isSelectedModule } = props;

  const transition = useRef<Transition>({
    duration: 0.3, delay: 0.2, type: 'keyframes'
  });

  const variants = useRef<Variants>({
    selected: {  y: -20 },
    unselect: { y: 0 }
  })

  return (
    <StyledContainer
      variants={ variants.current }
      transition={ transition.current }
      initial='unselect'
      animate={ isSelectedModule ? 'selected' : 'unselect' }
    >
      { children }
    </StyledContainer>
  )
})

interface INavbarWrapperProps {
  children: React.ReactNode
  isScrolled: boolean
}
export const MotionNavbarWrapper: React.FC<INavbarWrapperProps> = React.memo(( props) => {
  const { children, isScrolled } = props;

  const transition = useRef<Transition>({
    duration: 0.4, type: 'keyframes'
  });

  const variants = useRef<Variants>({
    scrolled: {  margin: "2vh 5vw" },
    unscroll: { margin: "4vh 5vw" }
  })

  return (
    <StyledNavbarWrapper
      variants={ variants.current }
      transition={ transition.current }
      initial='unscroll'
      animate={ isScrolled ? 'scrolled' : 'unscroll' }
    >
      { children }
    </StyledNavbarWrapper>
  )
})

interface ILogoProps {
  children: React.ReactNode
  isScrolled: boolean
}
export const MotionLogo: React.FC<ILogoProps> = React.memo(( props) => {
  const { children, isScrolled } = props;

  const transition = useRef<Transition>({
    duration: 0.2
  });

  const variants = useRef<Variants>({
    scrolled: {  scale: 0.8 },
    unscroll: { scale: 1 }
  })

  return (
    <StyledLogo
      variants={ variants.current }
      transition={ transition.current }
      style={{ originX: 0, originY: 0 }}
      initial='unscroll'
      animate={ isScrolled ? 'scrolled' : 'unscroll' }
    >
      { children }
    </StyledLogo>
  )
})

interface IGradientBarProps {
  isScrolled: boolean
}
export const MotionGradientBar: React.FC<IGradientBarProps> = React.memo(( props) => {
  const { isScrolled } = props;

  const transition = useRef<Transition>({
    duration: 0.3
  });

  const variants = useRef<Variants>({
    scrolled: { y: 0 },
    unscroll: { y: "-120%" }
  })

  return (
    <StyledGradientBar
      variants={ variants.current }
      transition={ transition.current }
      initial='unscroll'
      animate={ isScrolled ? 'scrolled' : 'unscroll' }
    />
  )
})