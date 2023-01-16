import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePanel from "./GamePanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<GamePanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
