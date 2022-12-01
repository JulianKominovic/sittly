import { Container } from "@nextui-org/react";
import React from "react";
import { INDEX } from "../index";
import Link from "./components/Link";

function Navbar() {
  return (
    <Container
      as="nav"
      fluid
      css={{
        maxW: "none",
        px: "$6",
        display: "flex",
        ".navlink": {
          display: "flex",
          w: "fit-content",
          py: "$2",
          px: "$4",
          borderRadius: "$md",
        },
        ".active-navlink": {
          background: "$accents0",
          fontSize: "$md",
        },
        ".inactive-navlink": {
          background: "transparent",
          color: "$accents5",
          fontSize: "$md",
        },
      }}
    >
      {Object.values(INDEX)
        .filter(({ entryPoint }) => !entryPoint.onlyQuerybarFuncion)
        .map(({ module, displayName }, index) => (
          <Link index={index} key={module} id={module} title={displayName} />
        ))}
    </Container>
  );
}

export default Navbar;
