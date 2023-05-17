import React, { useEffect } from "react";
import { ModuleListItem } from "@comp/ModuleListItem";
import * as assets from '@asset/index';
import * as S from '@style/comp/ModuleList.styled';
import * as M from '@motion/ModuleList.motion';
import { useSetRecoilState } from "recoil";
import { isScrolledState, selectedModuleState } from "@store/atoms";
import { IModuleInfo } from '@type/index';

interface Props {}

const moduleInfoList: IModuleInfo[]  = [
  {
    id: "face-detect",
    label: "FACE Detection",
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    training: [''],
    dataset: [''],
    model: ['YuNet'],
    imagePath: assets.iconModuleFaceDetectionPath,
    examplePath: assets.exampleModuleFaceDetectionPath,
    color: '#7F97B6',
    url: '/face-detect'
  },
  {
    id: "face-recog",
    label: "FACE Recognition",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['YuNet', 'LinearSVC'],
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    imagePath: assets.iconModuleFaceRecognitionPath,
    color: '#9ED5A4',
    url: '/face-recog'
  },
  {
    id: "face-mask",
    label: "FACE Mask \nIdentification",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['CNN', 'Yolo'],
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    imagePath: assets.iconModuleFaceMaskIdentificationPath,
    color: '#F8CFCF',
    url: '/face-mask'
  },
  {
    id: "lp-recog",
    label: "LICENSE PLATE \nRecognition",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['CNN', 'Yolo'],
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    imagePath: assets.iconModuleLicensePlateRecognitionPath,
    color: '#A57BAE',
    url: '/lp-recog'
  },
  {
    id: "en-digit-predict",
    label: "ENGLISH Digit Prediction",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['CNN', 'Yolo'],
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    imagePath: assets.iconModuleEnglishDigitPredictionPath,
    color: '#F87876',
    url: '/en-digit-predict'
  },
  {
    id: "vn-digit-predict",
    label: "VIETNAMESE \nDigit Prediction",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['CNN', 'Yolo'],
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    imagePath: assets.iconModuleVietnameseDigitPredictionPath,
    color: '#80B9DB',
    url: '/vn-digit-predict'
  },
  {
    id: "animal-clf",
    label: "ANIMAL Classification",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['CNN', 'Yolo'],
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    imagePath: assets.iconModuleAnimalClassificationPath,
    color: '#ADA08C',
    url: '/animal-clf'
  },
  {
    id: "cali-price-predict",
    label: "Califonia House Price \nPrediction",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['CNN', 'Yolo'],
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    imagePath: assets.iconModuleCalifoniaHousePricePredictionPath,
    color: '#3C3C3C',
    url: '/cali-price-predict'
  },
  {
    id: "fruit-clf",
    label: "FRUIT Classification",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['CNN', 'Yolo'],
    description: "The quick brown fox jumps over the lazy dog is an English-language pangram—a phrase that contains all of the letters of the alphabet.",
    imagePath: assets.iconModuleFruitClassificationPath,
    color: '#009A96',
    url: '/fruit-clf'
  }
]

export const ModuleList = ( props: Props ) => {
  const setSelectedmodule = useSetRecoilState(selectedModuleState);
  const setIsScrolled = useSetRecoilState(isScrolledState);

  useEffect(() => {
    setSelectedmodule(null);
  }, [])

  const handleScroll = (event: any) => {
    const div = event.target;
    if (div.scrollTop > 50) {
      setIsScrolled(true)
    }
    if (div.scrollTop < 20) {
      setIsScrolled(false)
    } 
  };

  return (
    <S.StyledContainer onScroll={ handleScroll }>
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