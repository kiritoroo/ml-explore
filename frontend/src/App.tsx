import React from 'react';
import { Navbar } from "@comp/Navbar";
import { Routes, Route, HashRouter, useLocation } from "react-router-dom"
import IntroPage from '@page/IntroPage';
import ModulesPage from '@page/ModulesPage';
import FaceDetectPage from '@page/FaceDetectPage';
import FaceRecogPage from '@page/FaceRecogPage';
import FaceMaskPage from '@page/FaceMaskPage';
import LPRecogPage from '@page/LPRecogPage';
import EnDigitPredictPage from '@page/EnDigitPredictPage';
import VnDigitPredictPage from '@page/VnDigitPredictPage';
import AnimalClfPage from '@page/AnimalClfPage';
import CaliHousePredictPage from '@page/CaliHousePredictPage';
import FruitClfPage from '@page/FruitClfPage';
import { isLoadingState } from '@store/atoms';
import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { Loading } from '@comp/Loading';

export const App = () => {
  const isLoading = useRecoilValue(isLoadingState)
  const location = useLocation();

  return (
    <React.Fragment>

      <AnimatePresence>
        { isLoading && <Loading/> }
      </AnimatePresence>

      <Navbar/>

      <AnimatePresence mode='sync'>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<ModulesPage/>}/>
            <Route path="/face-detect" element={<FaceDetectPage/>}/>
            <Route path="/face-recog" element={<FaceRecogPage/>}/>
            <Route path="/face-mask" element={<FaceMaskPage/>}/>
            <Route path="/lp-recog" element={<LPRecogPage/>}/>
            <Route path="/en-digit-predict" element={<EnDigitPredictPage/>}/>
            <Route path="/vn-digit-predict" element={<VnDigitPredictPage/>}/>
            <Route path="/animal-clf" element={<AnimalClfPage/>}/>
            <Route path="/cali-price-predict" element={<CaliHousePredictPage/>}/>
            <Route path="/fruit-clf" element={<FruitClfPage/>}/>
          </Routes>
        </AnimatePresence>
    </React.Fragment>
  )
}