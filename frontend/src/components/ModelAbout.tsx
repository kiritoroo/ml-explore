import React, { useCallback, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { MdOutlineClose } from 'react-icons/md';
import { colorPrimaryState, isModalAboutShowState } from "@store/atoms";
import * as S from '@style/comp/ModelAbout.styled';
import * as M from '@motion/ModalAbout.motion';
import { AiFillGithub } from 'react-icons/ai';

interface Props {}

export const ModalAbout = (props: Props) => {
  const colorPrimary = useRecoilValue(colorPrimaryState);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isShowModal, setIsShowModal] = useRecoilState(isModalAboutShowState);

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
      <M.MotionModalWrapper ref={ modalRef }  isShow={ isShowModal }>
        <S.StyledIconCloseWrapper color={ colorPrimary } onClick={ handleIconCloseMouseClick }>
          <MdOutlineClose size={"20px"}/>
        </S.StyledIconCloseWrapper>

        <S.StyledInfoListWrapper>
          <S.StyledInfoWrapper style={{ marginBottom: 16 }}>
            <S.StyledInfoLabel>Project Advisor</S.StyledInfoLabel>
            <S.StyledInfoName color={ colorPrimary }>Mr. Trần Tiến Đức</S.StyledInfoName>
          </S.StyledInfoWrapper>
          <S.StyledInfoWrapper>
            <S.StyledInfoLabel>Member</S.StyledInfoLabel>
            <S.StyledInfoName color={ colorPrimary }>Lê Kiên Trung</S.StyledInfoName>
            <S.StyledInfoId color={ colorPrimary }>20110587</S.StyledInfoId>
            <S.StyledIconLinkWrapper color={ colorPrimary } href="https://github.com/kiritoroo" target="_blank">
              <AiFillGithub size={ "25px" }/>
            </S.StyledIconLinkWrapper>
          </S.StyledInfoWrapper>
          <S.StyledInfoWrapper>
            <S.StyledInfoLabel>Member</S.StyledInfoLabel>
            <S.StyledInfoName color={ colorPrimary }>Trần Mai Tuệ</S.StyledInfoName>
            <S.StyledInfoId color={ colorPrimary }>20110410</S.StyledInfoId>
            <S.StyledIconLinkWrapper color={ colorPrimary } href="https://github.com/kent0198" target="_blank">
              <AiFillGithub size={ "25px" }/>
            </S.StyledIconLinkWrapper>
          </S.StyledInfoWrapper>
        </S.StyledInfoListWrapper>
      </M.MotionModalWrapper>
    </S.StyledContainer>
  )
} 