import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introducere from './pages/Introducere'
import Rezultate from "./pages/Rezultate";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Introducere />} />
        <Route path='rezultate' element={<Rezultate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
