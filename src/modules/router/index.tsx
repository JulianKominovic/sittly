import styled from "styled-components";
import Navbar from "../navbar";
import Footer from "../layout/Footer";
import Querybar from "../layout/Querybar";
import Helper from "../layout/Helper";
import KeyboardHandlerComponent from "../../KeyboardHandlerComponent";
import { Route, Routes } from "react-router-dom";
import { useSettings } from "../../store/settingsStore";
import Index, { INDEX } from "../index/index";
import { PreloadTailwindClasses } from "../../ui/styles";

const Wrapper = styled.div<{ colorPallette: Record<string, string> }>`
  ${({ colorPallette }) =>
    colorPallette ||
    `--text-color-opaque: #4e4e4e;
  --text-color-normal: #7e7e7e;
  --text-color-light: #a7a7a7;
  --border-color-light: #f9fafb;
  --border-color-normal: #707070;
  --border-color-opaque: #3d3d3d;
  --background-color: #171717;
  --background-secondary-color:#101010;
  --background-footer:rgba(0,0,0,--tw-bg-opacity);
  `}
`;

function Searchbar() {
  const colorPallette = useSettings((state) => state.colorPallette);
  console.log(colorPallette);
  return (
    <Wrapper
      colorPallette={colorPallette}
      className="text-color-light rounded-2xl rounded-b-3xl border-2 border-color-opaque overflow-hidden background-primary"
      id="main"
    >
      <Querybar />
      <Navbar />
      <main className="w-full scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-800 scrollbar-rounded-lg scrollbar max-h-[280px] px-4 py-2 pb-10 overflow-hidden rounded-b-2xl">
        <Routes>
          <Route path="/" index element={<Index />} />
          {INDEX.map((mod) => (
            <Route path={"/" + mod.module}>
              {!mod.entryPoint.onlyQuerybarFuncion &&
                mod.entryPoint.routes.map((props) => <Route {...props} />)}
            </Route>
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
