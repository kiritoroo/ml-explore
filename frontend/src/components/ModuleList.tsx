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
    description: "Face Detection using the YuNet model. Users have the option to upload any image or use the webcam for detection, enabling the detection of multiple faces within a single image.",
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
    training: ['Kien Trung', 'Mai Tue'],
    dataset: ['Kien Trung', 'Mai Tue'],
    model: ['YuNet', 'LinearSVC'],
    description: "Face Recognition using the Yunet and LinearSVC model. Users have the option to upload any image or use the webcam for detection and recogniton. Can recognition Kien Trung, Mai Tue, Avicii and Martin Garrix face.",
    imagePath: assets.iconModuleFaceRecognitionPath,
    examplePath: assets.exampleModuleFaceRecognitionPath,
    color: '#9ED5A4',
    url: '/face-recog'
  },
  {
    id: "face-mask",
    label: "FACE Mask \nIdentification",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['CNN', 'Yolo'],
    description: "Face Mask Identification using the Yolo model allows users to upload images or utilize the webcam for real-time detection. It can detect multiple faces in a single image.",
    imagePath: assets.iconModuleFaceMaskIdentificationPath,
    examplePath: assets.exampleModuleFaceMaskIdentificationPath,
    color: '#F8CFCF',
    url: '/face-mask'
  },
  {
    id: "lp-recog",
    label: "LICENSE PLATE \nRecognition",
    training: ['Kien Trung', 'Mai Tue'],
    dataset: ['Kien Trung', 'Mai Tue'],
    model: ['CNN', 'VGG16'],
    description: "Recognition of license plates with the model VGG16, allowing users to upload any vehicle image.",
    imagePath: assets.iconModuleLicensePlateRecognitionPath,
    examplePath: assets.exampleModuleLicensePlateRecognitionPath,
    color: '#A57BAE',
    url: '/lp-recog'
  },
  {
    id: "en-digit-predict",
    label: "ENGLISH Digit Prediction",
    training: ['Mr. Tien Duc'],
    dataset: ['MNIST'],
    model: ['CNN'],
    description: "Prediction of English handwritten digits using MNIST dataset and CNN model. Users can draw numbers on the canvas.",
    imagePath: assets.iconModuleEnglishDigitPredictionPath,
    color: '#F87876',
    url: '/en-digit-predict'
  },
  {
    id: "vn-digit-predict",
    label: "VIETNAMESE \nDigit Prediction",
    training: ['Kien Trung', 'Mai Tue'],
    dataset: ['Kien Trung', 'Mai Tue'],
    model: ['CNN'],
    description: "Prediction of handwritten digits in Vietnamese using CNN model. Users can draw on canvas.",
    imagePath: assets.iconModuleVietnameseDigitPredictionPath,
    color: '#80B9DB',
    url: '/vn-digit-predict'
  },
  {
    id: "animal-clf",
    label: "ANIMAL Classification",
    training: ['Kien Trung'],
    dataset: ['Kien Trung'],
    model: ['ResNet'],
    description: "Animal classification using ResNet model. Can classification animals such as Cats, Dogs, Cows, Elephants and Pandas",
    imagePath: assets.iconModuleAnimalClassificationPath,
    examplePath: assets.exampleModuleAnimalClassificationPath,
    color: '#ADA08C',
    url: '/animal-clf'
  },
  {
    id: "cali-price-predict",
    label: "Califonia House Price \nPrediction",
    training: ['Mr. Tien Duc'],
    dataset: ['Mr. Tien Duc'],
    model: ['Random Forest Regressor'],
    description: "Cali house price prediction using Random Forest Regression algorithm.",
    imagePath: assets.iconModuleCalifoniaHousePricePredictionPath,
    color: '#FDB650',
    url: '/cali-price-predict'
  },
  {
    id: "fruit-clf",
    label: "FRUIT Classification",
    training: ['Mr. Tien Duc'],
    dataset: ['Mr. Tien Duc'],
    model: ['Yolo5'],
    description: "Fruit classification using Yolo model. Fruits such as Jackfruit, Grapefruit, Toad, Orange and Star fruit can be classified.",
    imagePath: assets.iconModuleFruitClassificationPath,
    examplePath: assets.exampleModuleFruitClassificationPath,
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