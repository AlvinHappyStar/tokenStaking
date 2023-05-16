import React, { useCallback, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import BigNumber from 'bignumber.js'
import { Pools } from '../../../config/constant'
import { useBalances, useTokenApprovalStatus, useApprovalStatus } from 'state/staking/hooks'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useWeb3Context } from 'hooks/useWeb3Context'
import { callApproveForAmount } from 'utils/calls/token'
import { callStakeToken, callUnstakeToken } from 'utils/calls/tokenStaking'

const StyledArea = styled.div`
  width: 100%;
  border-radius: 20px;
  color: ${props => props.theme.colors.activeTextColor};
`

const Container = styled.div`
  padding: 30px;
`

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;  
`

const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.bottomborderColor};
  font-size: 18px;
`

const StyledInputArea = styled.div`
  margin-top: 20px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-radius: 40px;
`

const StyledInput = styled.input`
  background: transparent;
  border-bottom: 1px solid #FFFFFF;
  margin-right: 15px;
  width: 100%;
  outline: none;
  color: ${props => props.theme.colors.inputTextColor};
  font-size: 18px;

  &:focus {
    border-bottom: 1px solid #d02ef0;
  }
  &:active {
    border:none;
  }

  WebkitAppearance: "none",
  margin: 0,
  MozAppearance: "textfield",
`

const StyledGetButton = styled.button`
  min-width: 170px;
  background: ${props => props.theme.colors.buttonBackground};
  border: none;
  cursor: pointer;
  // color: #152c57;
  color: ${props => props.theme.colors.activeTextColor};
  border-radius: 40px;
  font-weight: bold;
  font-size: 16px;
  padding: 0px 15px;

  : hover{
    background: ${props => props.theme.colors.hoverBackground};
  }
`

const StyledButton = styled.button`
  width: 100%;
  min-width: 170px;
  background: ${props => props.theme.colors.buttonBackground};
  border: none;
  cursor: pointer;
  // color: #152c57;
  color: ${props => props.theme.colors.activeTextColor};
  border-radius: 40px;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 15px;
  margin-top: 10px;

  : hover{
    background: ${props => props.theme.colors.hoverBackground};
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotateImage = styled.img`
  animation: ${rotate} 2s linear infinite;
  width: 23px;
  margin-left: 5px;
`

const RewardNumber = styled.div`
  color: ${props => props.theme.colors.inputTextColor};
`

const Info = (props) => {
  const { title, value } = props

  return (
    <StyledInfo>
      <div>{title}</div>
      <RewardNumber>{value}</RewardNumber>
    </StyledInfo>
  )
}

const BakedCard = (props) => {
  const web3Context = useWeb3Context()
  const { poolID } = props
  const activedPool = Pools[poolID]
  const regInput = React.useRef();
  const [approveProgress, setApproveProgress] = useState(false)
  
  useApprovalStatus(web3Context?.account, approveProgress)

  const approvalStatus = useTokenApprovalStatus();

  const balance = useBalances();

  useEffect(() => {

    if (approvalStatus[0]) {
      setApproveProgress(false)
    }

    console.log("eagle: approvalStatus[0]", approvalStatus[0])
  }, [approvalStatus, approvalStatus[0]])



  const handleStake = async () => {
    let pid = poolID;
    let amount = regInput.current.value;

    if (web3Context?.provider && web3Context?.account) {
      await callStakeToken(web3Context?.provider, web3Context?.account, pid, amount)
    }
  }

  const handleUnstake = async () => {
    let pid = poolID;
    
    if (web3Context?.provider && web3Context?.account) {
      await callUnstakeToken(web3Context?.provider, web3Context?.account, pid)
    }
  }

  const handleApprove = async () => {
    setApproveProgress(true)

    const amount = regInput.current.value;
    try {
      if (web3Context?.provider && web3Context?.account) {
        await callApproveForAmount(web3Context?.provider, web3Context?.account, amount)
        setApproveProgress(false)
      }
    } catch {
      setApproveProgress(false)
    }
  }

  return (
    <StyledArea>
      <Container>
        <Title>My Stats</Title>
        <div>
          <Info title="Total Staked Value" value={`${getFullDisplayBalance(new BigNumber(balance.totalStakedBalance))} `} />
          <Info title="APR" value={`${activedPool.apr}%`} />
          <Info title="Staked Amount" value={`${getFullDisplayBalance(new BigNumber(balance.stakedAmount))} `} />
          <Info title="Your Balance" value={`${getFullDisplayBalance(new BigNumber(balance.walletBalance))} `} />
          <StyledInputArea>
            <StyledInput
              ref={regInput}
              type="number"
              min={0}
              placeholder = {0.0}
            />
            {
              approvalStatus[0] == 0 ?
              <StyledGetButton onClick={handleApprove}>
                { approveProgress ? 'Approving...' : 'Approve' }
              </StyledGetButton>
              :
              <StyledGetButton onClick={handleStake}>Stake</StyledGetButton>
            }
          </StyledInputArea>
        </div>
        <StyledButton onClick={handleUnstake}>Unstake</StyledButton>
      </Container>
    </StyledArea>
  )
}

export default BakedCard