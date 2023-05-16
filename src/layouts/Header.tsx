import React, { useState } from 'react'
import styled from 'styled-components'
import WalletConnectButton from 'components/WalletConnectButton'

const StyledHeader = styled.div`
  display: flex;
  height: 110px;
  align-items: center;
  justify-content: space-between;
  padding-left:50px;
  padding-right:40px;
  background: ${props => props.theme.colors.background};
`

const StyledLogo = styled.div`
  height: 90px;

  @media (max-width: 450px) {
    height: 0px;
  }
`

const Header = () => {

  return (
    <StyledHeader>
      <StyledLogo>
        <a href="/">
          <img height='100%' src="/images/rotate-10s.png" alt="logo" />
        </a>
      </StyledLogo>
      <WalletConnectButton />
    </StyledHeader>
  )
}

export default Header