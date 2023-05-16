import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useWeb3Context } from 'hooks/useWeb3Context'
import { useStakingData } from 'state/staking/hooks'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import styled, { ThemeProvider } from "styled-components";

import darkTheme from "./themes/dark";
import lightTheme from "./themes/light";

import './App.css'
import Home from 'views/Home'
import Header from 'layouts/Header'

const StyledLogo = styled.img`
  height: 40px;
  position:absolute;
  top: 40px;
  right: 250px;
`


const App = () => {
  const web3Context = useWeb3Context()
  useStakingData(0, web3Context?.account)

  const stored = localStorage.getItem("isDarkMode");
  const [imgSrc, setImgSource] = useState(
    stored !== "false" ? "/images/sun.svg" : "/images/moon.png"
  )
  const [isDarkMode, setIsDarkMode] = useState(
    stored !== "false" ? true : false
  );

  return (
    <ThemeProvider theme={stored !== 'false' ? darkTheme : lightTheme}>
      <RefreshContextProvider>
        <Header />
        <StyledLogo src={imgSrc} alt="logo"
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              setImgSource(stored !== "false" ? "/images/moon.png" : "/images/sun.svg");
              localStorage.setItem("isDarkMode", isDarkMode? "false":"true");
            }}
          >
      </StyledLogo>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </RefreshContextProvider>
    </ThemeProvider>
  );
}

export default App;
