import { isLoadingImageState, isLoadingState, isScrolledState, selectedModuleState } from '@store/atoms';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from '@style/page/FruitClfPage.styled';
import { ButtonBack } from '@comp/ButtonBack';
import { ButtonLoadImage } from '@comp/ButtonLoadImage';
import { ImageCard } from '@comp/ImageCard';
import { LineCanvas } from '@comp/LineCanvas';
import { POSTImageFruitPredict } from '@api/apiService';

interface ImageRefs {
  setImage: React.Dispatch<React.SetStateAction<string>>
}

export default function FruitClfPage() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setIsScrolled = useSetRecoilState(isScrolledState);
  const setIsLoadingImage = useSetRecoilState(isLoadingImageState);
  const selectedModule = useRecoilValue(selectedModuleState);
  const imageRef = useRef<ImageRefs>(null);

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
          
          POSTImageFruitPredict(
            String(reader.result) ?? '',
            (result_b64: string) => {
              imageRef.current?.setImage(result_b64)
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
            <ButtonLoadImage
              onUploadImage={ handleOnUploadImage }/>
          </S.StyledControlWrapper>
        
        </S.StyledLeftGridWrapper>
        <S.StyledRightGridWrapper>
          <ImageCard ref={ imageRef }/>
        </S.StyledRightGridWrapper>
      </S.StyledGridWrapper>}
      <LineCanvas color={ selectedModule?.color }/>
    </S.StyledContainer>
  )
}