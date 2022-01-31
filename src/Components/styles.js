import styled from 'styled-components'



export const SidebarWrapper = styled.aside`
  width: calc(25vw);

  @media (max-width:500px) {
    height: 25vh;
  }
`

export const TimeLineWrapper = styled.section`
  border: 2px solid grey;
  background: hsla(120, 20%, 20%, .9);
  width: calc(75vw - 4px);
  height: calc(100vh - 4px);

  @media (max-width:500px) {
    height: 70vh;
  }
  ${'' /* height: calc(100% - 2px); */}
`
