import { BrowserRouter, Route, Routes } from "react-router-dom";
import Multi from "./Multi";
import Start from "./Start";
import Single from "./Single";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/single" element={<Single />} />
        <Route path="/multi" element={<Multi />} />
        <Route path="*" element={<Start />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
