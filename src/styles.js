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

  ${'' /* background: hsla(200, 70%, 40%, .9); */}
`

export const FormWrapper = styled.div`

  border-radius: 5px;
  border: 2px solid hsla(240, 25%, 40%, .9);
  display: flex;
  flex-direction: column;
  background-color: hsla(${Math.floor(Math.random()*359)},50%,50%,.8);
  width: 100%;


  .header {
    display: flex;
    justify-content: space-between;
    h3 {
      margin: 0;
    }
    button {
      background: none;
      border: none;
    }
  }
`
