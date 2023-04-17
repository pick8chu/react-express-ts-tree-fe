import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import { Home } from './component/home';
import { Tree } from './component/tree';

const LinkWrapper = styled.div`
  margin: 0 10px;
`;

const RoutesWrapper = styled.div`
  background-color: #282c34;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="App-header">
          <LinkWrapper>
            <Link to="/">Home</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to="/tree">Tree</Link>
          </LinkWrapper>
        </header>
        <RoutesWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tree" element={<Tree />} />
          </Routes>
        </RoutesWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
