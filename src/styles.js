import styled from 'styled-components'


export const AppWrapper = styled.div`
  display: flex;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;roboto;

  @media (max-width:500px) {
    background: red !important;
    flex-direction: column;
  }

  background: hsla(240, 20%, 20%, .9);
`
