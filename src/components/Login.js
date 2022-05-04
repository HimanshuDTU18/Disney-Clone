import React from 'react'
import styled from 'styled-components'

function Login() {
  return(
  <Container>
    <Content>
      <BgImage>

      </BgImage>
    </Content>
  </Container>
  )
  }

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;


const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
height: 100%;
background-size:cover;
background-repeat: no-repeat;
position: absolute;
top:0;
right: 0;
left: 0;
z-index: -1;
background-image:url("images/Login-background.jpg");
`


export default Login