import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from '@style/page/VnDigitPredictPage.styled';
import { isLoadingState, isModalPredictShow, isScrolledState, selectedModuleState } from '@store/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ButtonPredict } from '@comp/ButtonPredict';
import { ButtonClear } from '@comp/ButtonClear';
import { DrawCanvas } from '@comp/DrawCanvas';
import { ModalPredict } from '@comp/ModalPredict';
import { CircleCanvas } from '@comp/CircleCanvas';
import { ButtonBack } from '@comp/ButtonBack';
import { POSTVnDigitPredict } from '@api/apiService';

interface CanvasRefs {
  clearCanvas: () => void
  getImageb64: () => string
}

export default function VnDigitPredictPage() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setIsScrolled = useSetRecoilState(isScrolledState);
  const selectedModule = useRecoilValue(selectedModuleState);
  const canvasRef = useRef<CanvasRefs>(null);
  const [isShowPredictModal, setIsShowPredictModal] = useRecoilState(isModalPredictShow);
  const [predictResult, setPredictResult] = useState<string>('')

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    if (!selectedModule) {
      navigate('/')
    }

    return () => {
    }
  }, [])

  useEffect(() => {
    if (selectedModule) {
      setIsScrolled(false)
      setIsLoading(false)
    }
  }, [])

  const handleButtonPredictClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canvasRef.current) {
      POSTVnDigitPredict(
        canvasRef.current.getImageb64(),
        (predict_result: any) => {
          setPredictResult(predict_result)
          setIsShowPredictModal(true)
        }
      )
    }
  }, [canvasRef.current])

  const handleButtonClearClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  }, [canvasRef.current])

  return (
    <S.StyledContainer>
      <ButtonBack/>
      {!isLoading && selectedModule && 
      <S.StyledGridWrapper>
        <S.StyledLeftGridWrapper>

          <S.StyledModuleInfoWrapper>
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
          </S.StyledModuleInfoWrapper>

          <S.StyledControlWrapper>
            <ButtonPredict
              onClick={ handleButtonPredictClick }/>
            <ButtonClear
              onClick={ handleButtonClearClick }/>
          </S.StyledControlWrapper>
        
        </S.StyledLeftGridWrapper>
        <S.StyledRightGridWrapper>
          <DrawCanvas ref={ canvasRef }/>
        </S.StyledRightGridWrapper>
      </S.StyledGridWrapper>}
      {isShowPredictModal && <ModalPredict result={ predictResult }/> }
      <CircleCanvas color={ selectedModule?.color }/>
    </S.StyledContainer>
  )
}