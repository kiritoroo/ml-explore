import React, { useCallback, useEffect } from "react";
import * as assets from '@asset/index';
import { useRecoilState, useSetRecoilState } from "recoil";
import { colorPrimaryState, isLoadingState, selectedModuleState } from "@store/atoms";
import * as S from '@style/comp/ModuleListItem.styled';
import * as M from '@motion/ModuleListItem.motion';
import { useNavigate } from 'react-router-dom'
import { IModuleInfo } from '@type/index';

interface Props {
  info: IModuleInfo
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
    setSelectedModule(info)
    setColorPrimary(info.color)
    setIsLoading(true);
    setTimeout(() => {
      navigate(info.url);
    }, 300)
  }, [info])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <M.MotionContainer
      onClick={ handleSelectModule }
      onMouseEnter={() => handleMouseEnter(info.color) }
      onMouseLeave={ handleMouseLeave }
      color={ info.color }
      isSelected={ selectedModule ? selectedModule.id === info.id : true }>
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