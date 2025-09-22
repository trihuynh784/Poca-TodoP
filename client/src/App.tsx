import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/pages/Home";
import _404NotFound from "@/pages/404NotFound";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<_404NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
