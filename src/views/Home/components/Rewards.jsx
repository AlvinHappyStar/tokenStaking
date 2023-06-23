import React from 'react'
import styled from 'styled-components'
// import { useContractContext } from '../../../providers/ContractProvider'
// import { useAuthContext } from '../../../providers/AuthProvider'
import { useBalances, useTokenApprovalStatus, useApprovalStatus } from 'state/staking/hooks'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { callClaim } from 'utils/calls/tokenStaking'
import { useWeb3Context } from 'hooks/useWeb3Context'

const StyledArea = styled.div`
  margin-top: 20px;
  width: 100%;
  // background: #ffffff30;
  border-radius: 20px;
  color : ${props => props.theme.colors.activeTextColor};
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
`

const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px;
  border-bottom: 1px solid ${props => props.theme.colors.bottomborderColor};
  font-size: 18px;
`

const RewardNumber = styled.div`
  color: ${props => props.theme.colors.inputTextColor};
`

const StyledButton = styled.button`
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

const Rewards = (props) => {
  const { poolID } = props
  // const { wrongNetwork } = useContractContext()
  // const { address } = useAuthContext()  
  const web3Context = useWeb3Context()
  const balance = useBalances();

  

  const handleClaim = async () => {
    let pid = poolID;
    
    if (web3Context?.provider && web3Context?.account) {
      await callClaim(web3Context?.provider, web3Context?.account, pid)
    }
  }

  return (
    <StyledArea>
      <Container>
        <Title>Rewards</Title>
        <StyledInfo>
          <div>Claimable</div>
          <RewardNumber>{`${getFullDisplayBalance(new BigNumber(balance.pendingReward))}`}</RewardNumber>
        </StyledInfo>
        <StyledButton onClick={handleClaim}>Claim</StyledButton>
      </Container>
    </StyledArea>
  )
}

export default Rewards