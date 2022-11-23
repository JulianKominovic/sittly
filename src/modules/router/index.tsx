import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../navbar";
import Index, { INDEX } from "../index/index";
import Footer from "../layout/Footer";
import { useSettings } from "../../store/settingsStore";
import Querybar from "../layout/Querybar";
import Helper from "../layout/Helper";
import KeyboardHandlerComponent from "../../KeyboardHandlerComponent";

const Wrapper = styled.div<{ colorPallette: Record<string, string> }>`
  ${({ colorPallette }) =>
    Object.entries(colorPallette)
      .map(([key, value]) => {
        return `
      
*.scrollbar-track-gray-${key} {
  --scrollbar-track: ${value} !important;
}
*.scrollbar-thumb-gray-${key} {
  --scrollbar-thumb: ${value} !important;
}
*.bg-gray-${key} {
  background-color: ${value} !important;
}
&.bg-gray-${key} {
  background-color: ${value} !important;
}
*.outline-gray-${key} {
  outline-color: ${value} !important;
}
*.border-gray-${key} {
  border-color: ${value} !important;
}
*.text-gray-${key} {
  color: ${value} !important;
}
*.bg-slate-${key} {
  background-color: ${value} !important;
}
*.outline-slate-${key} {
  outline-color: ${value} !important;
}
*.border-slate-${key} {
  border-color: ${value} !important;
}
*.text-slate-${key} {
  color: ${value} !important;
}
*.bg-gray-${key},*.bg-gray-${key}::before,*.bg-gray-${key}::after,*.bg-gray-${key}::focus {
  background-color: ${value} !important;
}
*.outline-gray-${key},*.outline-gray-${key}::before,*.outline-gray-${key}::after,*.outline-gray-${key}::focus,*.focus:after:border-gray-${key} {
  outline-color: ${value} !important;
}
*.border-gray-${key},*.border-gray-${key}::before,*.border-gray-${key}::after,*.border-gray-${key}::focus {
  border-color: ${value} !important;
}
*.text-gray-${key},*.text-gray-${key}::before,*.text-gray-${key}::after,*.text-gray-${key}::focus {
  color: ${value} !important;
}
*.bg-slate-${key},*.bg-slate-${key}::before,*.bg-slate-${key}::after,*.bg-slate-${key}::focus {
  background-color: ${value} !important;
}
*.outline-slate-${key},*.outline-slate-${key}::before,*.outline-slate-${key}::after,*.outline-slate-${key}::focus {
  outline-color: ${value} !important;
}
*.border-slate-${key},*.border-slate-${key}::before,*.border-slate-${key}::after,*.border-slate-${key}::focus {
  border-color: ${value} !important;
}
*.text-slate-${key},*.text-slate-${key}::before,*.text-slate-${key}::after,*.text-slate-${key}::focus {
  color: ${value} !important;
}
`;
      })
      .join("\n")}
`;

function Searchbar() {
  const colorPallette = useSettings((state) => state.colorPallette);

  return (
    <Wrapper
      colorPallette={colorPallette}
      className="text-gray-300 rounded-2xl rounded-b-3xl border-2 border-gray-700 overflow-hidden"
      id="main"
    >
      <Querybar />
      <Navbar />
      <main className="w-full scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-800 scrollbar-rounded-lg scrollbar max-h-[280px] px-4 py-2 pb-10 overflow-hidden rounded-b-2xl">
        <Routes>
          <Route path="/" index element={<Index />} />
          {INDEX.map((route) => (
            <Route
              path={"/" + route.module}
              element={
                !route.entryPoint.onlyQuerybarFuncion &&
                route.entryPoint.indexComponent
              }
            />
          ))}
        </Routes>
      </main>
      <Helper />
      <Footer />
      <KeyboardHandlerComponent />
    </Wrapper>
  );
}

export default Searchbar;
