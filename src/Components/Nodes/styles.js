import styled from 'styled-components'

export const EventNodeWrapper = styled.div`
  .node {
    border: 1px solid black;
    ${'' /* padding: 0 10px; */}
    background: white;
    border-radius: 5px;
    max-width:350px;
    text-align: center;


    nav {
      display: flex;
      justify-content: space-between;
      .node-id {
        padding-left: 10px;
        text-transform: uppercase;
        font-size: 8px;
      }
    }

    .inner-content{
      padding: 0 10px;
      ${'' /* max-width: 150px; */}


      ul{
        background: hsla(330,50%,50%,.9);
        list-style: none;
        padding: 0;

      }
    }

  }

  .react-flow__handle{
    background: #555;
    ${'' /* background:red; */}
    height: 10px;
    width: 10px;
  }

  span {
    font-size: 12px;
    line-height: 8px;
  }


  nav {
    background: hsla(0, 50%, 50%, .2);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: calc(100%);

  }
`
