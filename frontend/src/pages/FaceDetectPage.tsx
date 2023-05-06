import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoadingState, isScrolledState, selectedModuleState } from '@store/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ButtonBack } from '@comp/ButtonBack';
import { AnimatePresence } from 'framer-motion';
import * as S from '@style/page/FaceDetectPage.styled';
import * as M from '@motion/FaceDetectPage.motion'
import { LineCanvas } from '@comp/LineCanvas';

export default function FaceDetectPage() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setIsScrolled = useSetRecoilState(isScrolledState);
  const selectedModule = useRecoilValue(selectedModuleState);

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedModule) {
      navigate('/')
    }
  }, [selectedModule])

  useEffect(() => {
    setIsScrolled(false)
    setIsLoading(false)
  }, [])

  return (
    <M.MotionContainer>
      <ButtonBack/>
      {!isLoading && selectedModule && 
      <S.StyledGridWrapper>
        <S.StyledLeftGridWrapper>
          <div>{selectedModule?.label}</div>
          <div>{selectedModule?.description}</div>
          <div>training: {selectedModule?.training}</div>
        </S.StyledLeftGridWrapper>
        <S.StyledRightGridWrapper>
          
        </S.StyledRightGridWrapper>
      </S.StyledGridWrapper>}
      <LineCanvas color={ selectedModule?.color ?? '#222222' } />
    </M.MotionContainer>
  )
}