import React from 'react';
import { useRecoilValue } from 'recoil';
import { colorPrimaryState, isScrolledState, selectedModuleState } from '@store/atoms';
import * as S from '@style/comp/Navbar.styled';
import * as M from '@motion/Navbar.motion';

interface Props {

}

export const Navbar = ( props: Props ) => {
  const isScrolled = useRecoilValue(isScrolledState);
  const selectedModule = useRecoilValue(selectedModuleState);
  const colorPrimary = useRecoilValue(colorPrimaryState);

  return (
    <M.MotionContainer
      isSelectedModule={ selectedModule ? true : false }>
      <M.MotionNavbarWrapper
        isScrolled={ isScrolled }>
        <M.MotionLogo
          isScrolled={ isScrolled }>
          ML Playground
        </M.MotionLogo>

        <S.StyledLinkListWrapper>
          <S.StyledLinkWrapper
            color={ colorPrimary }>
            about
          </S.StyledLinkWrapper>
          <S.StyledLinkWrapper
            color={ colorPrimary }>
            explore
          </S.StyledLinkWrapper>
        </S.StyledLinkListWrapper>
      </M.MotionNavbarWrapper>
      <M.MotionGradientBar isScrolled={ isScrolled }/>
    </M.MotionContainer>
  )
}