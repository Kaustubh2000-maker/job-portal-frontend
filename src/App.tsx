import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Start always on Login */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
