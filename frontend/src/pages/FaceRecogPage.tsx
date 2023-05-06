import React, { useEffect } from 'react';
import { isLoadingState, isScrolledState, selectedModuleState } from '@store/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ButtonBack } from '@comp/ButtonBack';
import * as S from '@style/page/FaceRecogPage.styled';
import * as M from '@motion/FaceRecogPage.styled'
import { useNavigate } from 'react-router-dom';
import { CircleCanvas } from '@comp/CircleCanvas';

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
      <CircleCanvas color={ selectedModule?.color }/>
    </S.StyledContainer>
  )
}