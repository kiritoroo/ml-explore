import React, { useEffect } from 'react';
import { ModuleList } from '@comp/ModuleList';
import { useSetRecoilState } from 'recoil';
import { colorPrimaryState, isLoadingState } from '@store/atoms';
import { LineCanvas } from '@comp/LineCanvas';

export default function ModulesPage() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setColorPrimary = useSetRecoilState(colorPrimaryState);

  useEffect(() => {
    setColorPrimary('#2e2e2e')
    setIsLoading(false)
  }, [])

  return (
    <React.Fragment>
      <ModuleList/>
      <LineCanvas color='#2e2e2e'/>
    </React.Fragment>
  )
}