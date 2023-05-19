import React, { useCallback, useRef } from "react";
import * as S from '@style/comp/ModalPredict.styled';
import { useRecoilState, useRecoilValue } from "recoil";
import { colorPrimaryState, isModalPredictShowState } from "@store/atoms";
import { MdOutlineClose } from 'react-icons/md';

interface Props {
  result: string
}

export const ModalPredict = (props: Props) => {
  const { result } = props;
  const colorPrimary = useRecoilValue(colorPrimaryState);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isShowModal, setIsShowModal] = useRecoilState(isModalPredictShowState);

  const handleContainerMouseClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current && modalRef.current) {
      if (!modalRef.current.contains(event.target as Node)) {
        setIsShowModal(false)
      }
    }
  }, [containerRef.current, modalRef.current])

  const handleIconCloseMouseClick = useCallback(() => {
    setIsShowModal(false)
  }, [])

  return (
    <S.StyledContainer ref={ containerRef } onClick={(e) => handleContainerMouseClick(e) }>
      <S.StyledModalWrapper ref={ modalRef }>
        <S.StyledIconCloseWrapper color={ colorPrimary } onClick={ handleIconCloseMouseClick }>
          <MdOutlineClose size={"20px"}/>
        </S.StyledIconCloseWrapper>
        <S.StyledPredicWrapper>
          <S.StyledResultLabel>Predict Result</S.StyledResultLabel>
          <S.StyledPredictResult color={ colorPrimary }>{ result }</S.StyledPredictResult>
        </S.StyledPredicWrapper>  
      </S.StyledModalWrapper>
    </S.StyledContainer>
  )
}