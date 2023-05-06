import React, { useEffect } from 'react';
import { isLoadingState, isScrolledState, selectedModuleState } from '@store/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ButtonBack } from '@comp/ButtonBack';
import * as S from '@style/page/FaceRecogPage.styled';
import * as M from '@motion/FaceRecogPage.styled'
import { useNavigate } from 'react-router-dom';

export default function FaceRecogPage() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setIsScrolled = useSetRecoilState(isScrolledState);
  const selectedModule = useRecoilValue(selectedModuleState);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    if (!selectedModule) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (selectedModule) {
      setIsScrolled(false)
      setIsLoading(false)
    }
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
    </M.MotionContainer>
  )
}