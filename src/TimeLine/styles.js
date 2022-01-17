import styled from 'styled-components'

export const EventNodeWrapper = styled.div`

  div.content {
    border: 1px solid black;
    ${'' /* padding: 10px; */}
    background: white;
    border-radius: 5px;
    min-width:150px;
    text-align: center;

  }

  .react-flow__handle{
    background: #555;
    ${'' /* background:red; */}
    height: 10px;
    width: 10px;
  }

  span {
    font-size: 12px;
  }


  nav {
    background: hsla(0, 50%, 50%, .2);
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`
