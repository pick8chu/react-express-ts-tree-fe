import './App.css';
import { Tree } from './component/tree';
import styled from 'styled-components';

const HomeDiv = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

function App() {
  return (
    <div className="App">
      <HomeDiv>
        <Tree />
      </HomeDiv>
    </div>
  );
}

export default App;
