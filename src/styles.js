import styled from 'styled-components'


export const AppWrapper = styled.div`
  display: flex;

  @media (max-width:500px) {
    background: red !important;
    flex-direction: column;
  }

  background: hsla(240, 20%, 20%, .9);
`

export const TimeLineWrapper = styled.div`
  border: 2px solid grey;
  background: hsla(120, 20%, 20%, .9);
  width:100%;
  height: 975px;

  @media (max-width:500px) {
    height: 70vh;
  }
  ${'' /* height: calc(100% - 2px); */}
`
