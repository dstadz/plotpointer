import styled from 'styled-components'


export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 425px) {
    flex-direction: column;
  }

  background: hsla(240, 20%, 20%, .9);
`

export const TimeLineWrapper = styled.div`
  border: 2px solid grey;
  background: hsla(120, 20%, 20%, .9);
  width:100%;
  height: 975px;
  ${'' /* height: calc(100% - 2px); */}
`
