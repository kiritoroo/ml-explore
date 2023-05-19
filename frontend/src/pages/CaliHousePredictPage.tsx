import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import * as S from '@style/page/CaliHousePredictPage.styled';
import { LineCanvas } from '@comp/LineCanvas';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoadingState, isScrolledState, selectedModuleState } from '@store/atoms';
import { ButtonBack } from '@comp/ButtonBack';
import { useNavigate } from 'react-router-dom';
import { GETCaliHouseData, GETCaliHouseRandPredict } from '@api/apiService';
import { TableData } from '@comp/TableData';
import { ButtonPredict } from '@comp/ButtonPredict';
import { ArrayData } from '@comp/ArrayData';
import { CircleCanvas } from '@comp/CircleCanvas';

export default function CaliHousePredictPage() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setIsScrolled = useSetRecoilState(isScrolledState);
  const selectedModule = useRecoilValue(selectedModuleState);
  const [caliHouseData, setCaliHouseData] = useState<any>(null);
  const [predictData, setPredictData] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

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

  useEffect(() => {
    GETCaliHouseData((data: any) => {
      startTransition(() => {
        setCaliHouseData(data)
      })
    })
  }, [])

  const handleButtonPredictClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    GETCaliHouseRandPredict((data: any) => {
      startTransition(() => {
        setPredictData(data)
      })
    })
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
                algorithm
              </S.StyledTagLabel> 
              {selectedModule?.model.map((item) => (
                <S.StyledBadge key={item} color={ selectedModule?.color }>{item}</S.StyledBadge>
              ))}
            </S.StyledTag>
          </S.StyledModuleInfoWrapper>
            
          <S.StyledControlWrapper>
            <ButtonPredict
                onClick={ handleButtonPredictClick }/>
          </S.StyledControlWrapper>
        
        </S.StyledLeftGridWrapper>
        <S.StyledRightGridWrapper>
          { caliHouseData && <TableData data={ caliHouseData }/> }
          { predictData && <TableData data={ { data: predictData.data } }/> }
          { predictData && <ArrayData header={ "y test" } data={ predictData.y_test }/> }
          { predictData && <ArrayData header={ "y pred" } data={ predictData.y_pred }/> }
        </S.StyledRightGridWrapper>
      </S.StyledGridWrapper>}
      <CircleCanvas color={ selectedModule?.color }/>
    </S.StyledContainer>
  )
}