import styled from 'styled-components'
import { FormWrapper } from 'styles'


export const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: hsla(240, 70%, 70%, .9);
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

export const AddCharFormWrapper = styled(FormWrapper)`
  display: flex;
  flex-direction: column;
  background-color: hsla(${Math.floor(Math.random()*359)},50%,50%,.8);
  width: 100%;
`

export const EditCharacterFormWrapper = styled(FormWrapper)`
  background-color: hsla(${Math.floor(Math.random()*359)},50%,50%,.8);
  width: 100%;
`

export const EventNodeWrapper = styled.div`
  max-width:250px;

  .node {
    border: 1px solid black;
    ${'' /* padding: 0 10px; */}
    background: white;
    border-radius: 5px;
    text-align: center;
    overflow: hidden;

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
      background: hsla(200,50%,80%,.9);

      ${'' /* max-width: 150px; */}

    }
      ul{
        display: flex;
        justify-content: space-around;
        background: hsla(330,50%,50%,.9);
        padding: 0;
        margin: 0;

        li {
          list-style-type: none;
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

export const AddNodeFormWrapper = styled(FormWrapper)`

`

export const EditNodeFormWrapper = styled(FormWrapper)`
  background-color: hsla(${Math.floor(Math.random()*359)},50%,50%,.8);
  width: 100%;
`
