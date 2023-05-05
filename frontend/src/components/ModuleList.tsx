import React, { useEffect } from "react";
import { ModuleListItem } from "@comp/ModuleListItem";
import * as assets from '@asset/index';
import * as S from '@style/comp/ModuleList.styled';
import * as M from '@motion/ModuleList.motion';
import { useSetRecoilState } from "recoil";
import { selectedModuleState } from "@store/atoms";

interface Props {}

interface moduleInfo {
  id: string
  label: string
  imagePath: string
  color: string
  url: string
}

const moduleInfoList: moduleInfo[]  = [
  {
    id: "face-detect",
    label: "FACE Detection",
    imagePath: assets.iconModuleFaceDetectionPath,
    color: '#7F97B6',
    url: '/face-detect'
  },
  {
    id: "face-recog",
    label: "FACE Recognition",
    imagePath: assets.iconModuleFaceRecognitionPath,
    color: '#9ED5A4',
    url: '/face-recog'
  },
  {
    id: "face-mask",
    label: "FACE Mask \nIdentification",
    imagePath: assets.iconModuleFaceMaskIdentificationPath,
    color: '#F8CFCF',
    url: '/face-mask'
  },
  {
    id: "lp-recog",
    label: "LICENSE PLATE \nRecognition",
    imagePath: assets.iconModuleLicensePlateRecognitionPath,
    color: '#A57BAE',
    url: '/lp-recog'
  },
  {
    id: "en-digit-predict",
    label: "ENGLISH Digit Prediction",
    imagePath: assets.iconModuleEnglishDigitPredictionPath,
    color: '#F87876',
    url: '/en-digit-predict'
  },
  {
    id: "vn-digit-predict",
    label: "VIETNAMESE \nDigit Prediction",
    imagePath: assets.iconModuleVietnameseDigitPredictionPath,
    color: '#80B9DB',
    url: '/vn-digit-predict'
  },
  {
    id: "animal-clf",
    label: "ANIMAL Classification",
    imagePath: assets.iconModuleAnimalClassificationPath,
    color: '#ADA08C',
    url: '/animal-clf'
  },
  {
    id: "cali-price-predict",
    label: "Califonia House Price \nPrediction",
    imagePath: assets.iconModuleCalifoniaHousePricePredictionPath,
    color: '#3C3C3C',
    url: '/cali-price-predict'
  },
  {
    id: "fruit-clf",
    label: "FRUIT Classification",
    imagePath: assets.iconModuleFruitClassificationPath,
    color: '#009A96',
    url: '/fruit-clf'
  }
]

export const ModuleList = ( props: Props ) => {
  const setSelectedmodule = useSetRecoilState(selectedModuleState);
  
  useEffect(() => {
    setSelectedmodule(null);
  }, [])

  return (
    <S.StyledContainer>
      <S.StyledModuleListWrapper>
        {moduleInfoList.map((item, index) => (
          <M.MotionModuleListItemWrapper
            key={item.label}
            index={ index }>
            <ModuleListItem info={ item }/>
          </M.MotionModuleListItemWrapper>
        ))}
      </S.StyledModuleListWrapper>
    </S.StyledContainer>
  )
}