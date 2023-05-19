import { isLoadingImageState, isLoadingState, isModalPredictShowState, isScrolledState, selectedModuleState } from '@store/atoms';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from '@style/page/AnimalClfPage.styled';
import { ButtonLoadImage } from '@comp/ButtonLoadImage';
import { ButtonBack } from '@comp/ButtonBack';
import { ImageCard } from '@comp/ImageCard';
import { LineCanvas } from '@comp/LineCanvas';
import { POSTImageAnimalPredict } from '@api/apiService';
import { ModalPredict } from '@comp/ModalPredict';

interface ImageRefs {
  setImage: React.Dispatch<React.SetStateAction<string>>
}

export default function AnimalClfPage() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setIsScrolled = useSetRecoilState(isScrolledState);
  const setIsLoadingImage = useSetRecoilState(isLoadingImageState);
  const selectedModule = useRecoilValue(selectedModuleState);
  const imageRef = useRef<ImageRefs>(null);
  const [isShowPredictModal, setIsShowPredictModal] = useRecoilState(isModalPredictShowState);
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

  const handleOnUploadImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          const input_b64 = String(reader.result) ?? ''
          imageRef.current?.setImage(input_b64)
          
          POSTImageAnimalPredict(
            String(reader.result) ?? '',
            (predict_result: any) => {
              setPredictResult(predict_result)
              setIsShowPredictModal(true)
            } 
          )
        }
      }
      reader.readAsDataURL(file)
    }
  }, [imageRef.current])

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
                model
              </S.StyledTagLabel> 
              {selectedModule?.model.map((item) => (
                <S.StyledBadge key={item} color={ selectedModule?.color }>{item}</S.StyledBadge>
              ))}
            </S.StyledTag>
          </S.StyledModuleInfoWrapper>

          <S.StyledControlWrapper>
            <ButtonLoadImage
              onUploadImage={ handleOnUploadImage }/>
          </S.StyledControlWrapper>
        
        </S.StyledLeftGridWrapper>
        <S.StyledRightGridWrapper>
          <ImageCard ref={ imageRef }/>
        </S.StyledRightGridWrapper>
      </S.StyledGridWrapper>}
      {isShowPredictModal && <ModalPredict result={ predictResult }/> }
      <LineCanvas color={ selectedModule?.color }/>
    </S.StyledContainer>
  )
}