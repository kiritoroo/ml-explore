import React, { useCallback } from "react";
import * as assets from '@asset/index';
import { useRecoilState, useSetRecoilState } from "recoil";
import { colorPrimaryState, isLoadingState, selectedModuleState } from "@store/atoms";
import * as S from '@style/comp/ModuleListItem.styled';
import * as M from '@motion/ModuleListItem.motion';
import { useNavigate } from 'react-router-dom'

interface moduleInfo {
  id: string
  label: string
  imagePath: string
  color: string
  url: string
}

interface Props {
  info: moduleInfo
}

export const ModuleListItem = ( props: Props ) => {
  const { info } = props;
  const [selectedModule, setSelectedModule] = useRecoilState(selectedModuleState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setColorPrimary = useSetRecoilState(colorPrimaryState);

  const navigate = useNavigate();

  const handleMouseEnter = useCallback((color: string) => {

  }, [])

  const handleMouseLeave = useCallback(() => {

  }, [])

  const handleSelectModule = useCallback(() => {
    setSelectedModule((prevstate) => prevstate === info.id ? null : info.id)
    setColorPrimary(info.color)
    setIsLoading(true);
    setTimeout(() => {
      navigate(info.url);
    }, 500)
  }, [info])

  return (
    <M.MotionContainer
      onClick={ handleSelectModule }
      onMouseEnter={() => handleMouseEnter(info.color) }
      onMouseLeave={ handleMouseLeave }
      color={ info.color }
      isSelected={ selectedModule ? selectedModule === info.id : true }>
      <S.StyledImageWrapper color={ info.color }>
        <S.StyledImage src={ info.imagePath }/>
      </S.StyledImageWrapper>
      <M.MotionLabelWrapper>
        <S.StyledWordsWrapper>
          { info.label.split("\n").map((word, index) => (
            <S.StyledWord key={index} color={info.color}>
              {word}
            </S.StyledWord>
          )) }
        </S.StyledWordsWrapper>
      </M.MotionLabelWrapper>
    </M.MotionContainer>
  )
}