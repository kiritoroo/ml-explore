import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import '@style/main.scss'
import { RecoilRoot } from 'recoil'
import { HashRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <HashRouter>
      <App />
    </HashRouter>
  </RecoilRoot>
)
