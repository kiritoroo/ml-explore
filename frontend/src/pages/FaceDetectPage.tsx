import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoadingImageState, isLoadingState, isScrolledState, selectedModuleState } from '@store/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ButtonBack } from '@comp/ButtonBack';
import { AnimatePresence } from 'framer-motion';
import * as S from '@style/page/FaceDetectPage.styled';
import * as M from '@motion/FaceDetectPage.motion'
import { LineCanvas } from '@comp/LineCanvas';
import { ImageCard } from '@comp/ImageCard';
import { ButtonLoadImage } from '@comp/ButtonLoadImage';
import { GETStopStreamFaceDetect, GETStartStreamFaceDetect, POSTImageFaceDetect } from '@api/apiService'
import { ButtonVideoStream } from '@comp/ButtonVideoStream';

interface ImageRefs {
  setImage: React.Dispatch<React.SetStateAction<string>>
}

export default function FaceDetectPage() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setIsScrolled = useSetRecoilState(isScrolledState);
  const setIsLoadingImage = useSetRecoilState(isLoadingImageState);
  const selectedModule = useRecoilValue(selectedModuleState);
  const imageRef = useRef<ImageRefs>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedModule) {
      navigate('/')
    }

    return () => {
      GETStopStreamFaceDetect()
    }
  }, [selectedModule])

  useEffect(() => {
    setIsScrolled(false)
    setIsLoading(false)
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
          
          GETStopStreamFaceDetect()
          POSTImageFaceDetect(
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

  const handleOnVideoStreamClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsLoadingImage(true)
    GETStartStreamFaceDetect(
      (stream_url: string) => {
        imageRef.current?.setImage(stream_url)
        setTimeout(() => {
          setIsLoadingImage(false)
        }, 500);
      }
    )
  }, [])

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
            <ButtonVideoStream
              onClick={ handleOnVideoStreamClick }/>
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