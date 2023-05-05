import React, { useEffect } from 'react';
import { ModuleList } from '@comp/ModuleList';
import { useSetRecoilState } from 'recoil';
import { isLoadingState } from '@store/atoms';

export default function ModulesPage() {
  const setIsLoading = useSetRecoilState(isLoadingState);

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <React.Fragment>
      <ModuleList/>
    </React.Fragment>
  )
}