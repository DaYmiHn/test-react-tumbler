import { useState, useEffect } from 'react';
import io from "socket.io-client";
import styled, { ThemeProvider } from "styled-components";

const socket: SocketIOClient.Socket = io('http://localhost:5000');

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.bgc};
  
  transition: background-color 500ms linear;
`

const Button = styled.div`
  cursor: pointer;
  width: 148px;
  height: 148px;
  border-radius: 9999px;
  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.button};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.span`
  user-select: none;
  color: ${props => props.theme.text};
  font-size: 2rem;
`

Main.defaultProps = {
  theme: {
    day: "palevioletred"
  }
}

const theme = {
  ligth: {
    bgc: "#c1c8c7",
    border: "#d49c6b",
    button: "#f6fafb",
    text: "#5e6668"
  },
  dark: {
    bgc: "#252b31",
    border: "#d49c6b",
    button: "#d49c6b",
    text: "#5e6668"
  }
};

function App() {
  const [tumbler, setTumbler] = useState(false);
  
  useEffect(() => {
    socket.on('toogle', (data:{value:boolean}) => setTumbler(data.value));
    socket.emit('getInitialState', (data:boolean)=>{
      setTumbler(data)
    });
  },[])

  let toogle = () => {
    socket.emit('toogle', {value: !tumbler});
  }
  
  return (
    <ThemeProvider theme={theme[tumbler ? 'ligth' : 'dark']}>
      <Main>
        <Button className="button"  onClick={() => toogle()}>
          <Text>
            {
              tumbler ? 'ON' : 'OFF'
            }
          </Text>
        </Button>
      </Main>
    </ThemeProvider>
  );
}

export default App;
