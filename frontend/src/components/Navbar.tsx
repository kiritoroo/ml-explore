import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { colorPrimaryState, isModalAboutShowState, isScrolledState, selectedModuleState } from '@store/atoms';
import * as S from '@style/comp/Navbar.styled';
import * as M from '@motion/Navbar.motion';
import { ModalAbout } from './ModelAbout';

interface Props {

}

export const Navbar = ( props: Props ) => {
  const isScrolled = useRecoilValue(isScrolledState);
  const selectedModule = useRecoilValue(selectedModuleState);
  const colorPrimary = useRecoilValue(colorPrimaryState);
  const [isShowAboutModal, setIsShowAboutModal] = useRecoilState(isModalAboutShowState);

  const handleAboutClick = useCallback(() => {
    setIsShowAboutModal(true);
  }, [])

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
            onClick={ handleAboutClick }
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
      { isShowAboutModal && <ModalAbout/> }
    </M.MotionContainer>
  )
}