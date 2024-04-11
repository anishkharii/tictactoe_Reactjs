
import Game from "./game";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game/:firstPlayer" element={<Game type="player"/>} />
        <Route path="/bot" element={<Game type="bot"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;