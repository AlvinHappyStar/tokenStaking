import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Pools } from '../../config/constant'
import StakeCard from './components/StakeCard'
import Rewards from './components/Rewards'

import { useWeb3Context } from 'hooks/useWeb3Context'
import { useStakingData } from 'state/staking/hooks'

const StyledHomeArea = styled.div`
  // max-width: 1280px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${props => props.theme.colors.background} url(/images/star.png) repeat top center;

  @media (max-width: 1030px) {
    width: 105%;
    height: auto;
    flex-direction: column;
  }

  
`

const StyledLeftArea = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledRightArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -20px;
`

const CardArea = styled.div`
  width: 100%;
  max-width: 520px;
`

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ImageRotate = styled.img`
  // position: absolute;
  animation: spin 45s linear infinite;
  
` 

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${props => props.theme.colors.activeTextColor};
  margin-bottom: 40px;
`

const SubTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: ${props => props.theme.colors.activeTextColor};
`

const StyledDaySelectItem = styled.div<{ active: boolean }>`
  color: ${props => !props.active ? props.theme.colors.disableTextColor : props.theme.colors.activeTextColor} ;
  background: ${props => props.theme.colors.buttonBackground};
  padding: 10px;
  margin: 0 10px;
  border-radius: 10px;
  min-width: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  : hover{
    background: ${props => props.theme.colors.hoverBackground};
  }
`


const Home = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0)

  const web3Context = useWeb3Context()
  useStakingData(activeDayIndex, web3Context?.account)

  useEffect(() => {
  }, [activeDayIndex])

  const handleSelectLockDay = (value: number) => {
    setActiveDayIndex(value)
  }

  const stored = localStorage.getItem("isDarkMode");
  const [imgSrc, setImgSource] = useState(
    stored !== "false" ? "/images/star.png" : "/images/cloud.png"
  )

  return (

    <StyledHomeArea>
      {/* <StyledLeftArea>
        <ImageRotate src="/images/rotate-10s.png" alt="" />
      </StyledLeftArea> */}
      <StyledRightArea>
        <Title>Stake and Earn</Title>
        <Flex>
          <SubTitle>Lock Days:</SubTitle>
          {Pools.map((item, index) => {
            return (
              <StyledDaySelectItem onClick={() => { handleSelectLockDay(index) }} key={item.lockDay} active={activeDayIndex === index} >{item.lockDay}</StyledDaySelectItem>
            )
          })}
        </Flex>
        <Flex>
          <CardArea>
            <StakeCard poolID={activeDayIndex} />
            <Rewards poolID={activeDayIndex} />
          </CardArea>
        </Flex>
      </StyledRightArea>

    </StyledHomeArea >
  )
}

export default Home