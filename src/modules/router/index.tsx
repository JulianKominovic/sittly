import styled from "styled-components";
import Navbar from "../navbar";
import Footer from "../layout/Footer";
import Querybar from "../layout/Querybar";
import Helper from "../layout/Helper";
import KeyboardHandlerComponent from "../../KeyboardHandlerComponent";
import { Route, Routes } from "react-router-dom";
import { useSettings } from "../../store/settingsStore";
import Index, { INDEX } from "../index/index";

import { Container } from "@nextui-org/react";

function Searchbar() {
  const colorPallette = useSettings((state) => state.colorPallette);
  return (
    <Container
      colorPallette={colorPallette}
      css={{
        borderRadius: 24,
        background: "$background",
        maxWidth: "none",
        overflowY: "hidden",
        px: "0",
      }}
      id="main"
      fluid
    >
      <Querybar />
      <Navbar />
      <Container
        as="main"
        css={{
          overflowY: "auto",
          overflowX: "visible",
          px: "$8",
          py: "$4",
          pb: "$20",
          maxHeight: "300px",
          maxW: "800px",
        }}
      >
        <Routes>
          <Route path="/" index element={<Index />} />
          {INDEX.map((mod) => (
            <Route path={"/" + mod.module}>
              {!mod.entryPoint.onlyQuerybarFuncion &&
                mod.entryPoint.routes.map((props) => <Route {...props} />)}
            </Route>
          ))}
        </Routes>
      </Container>
      <Footer />
      <KeyboardHandlerComponent />
    </Container>
  );
}

export default Searchbar;
