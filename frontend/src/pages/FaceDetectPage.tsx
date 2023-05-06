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
    <S.StyledContainer>
      <ButtonBack/>
      {!isLoading && selectedModule && 
      <S.StyledGridWrapper>
        <S.StyledLeftGridWrapper>
          <S.StyledModuleLabel color={ selectedModule?.color }>{selectedModule?.label}</S.StyledModuleLabel>
          <S.StyledModuleDesc>{selectedModule?.description}</S.StyledModuleDesc>

          <S.StyledTag>
            <S.StyledTagLabel>
              training
            </S.StyledTagLabel> 
            {selectedModule?.training.map((item) => (
              <S.StyledBadge key={item} color={ selectedModule?.color }>{item}</S.StyledBadge>
            ))}
          </S.StyledTag>
          <S.StyledTag>
            <S.StyledTagLabel>
              dataset
            </S.StyledTagLabel> 
            {selectedModule?.dataset.map((item) => (
              <S.StyledBadge key={item} color={ selectedModule?.color }>{item}</S.StyledBadge>
            ))}
          </S.StyledTag>
          <S.StyledTag>
            <S.StyledTagLabel>
              model
            </S.StyledTagLabel> 
            {selectedModule?.model.map((item) => (
              <S.StyledBadge key={item} color={ selectedModule?.color }>{item}</S.StyledBadge>
            ))}
          </S.StyledTag>
        </S.StyledLeftGridWrapper>
        <S.StyledRightGridWrapper>
          
        </S.StyledRightGridWrapper>
      </S.StyledGridWrapper>}
      <LineCanvas color={ selectedModule?.color }/>
    </S.StyledContainer>
  )
}