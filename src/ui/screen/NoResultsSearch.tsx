import { Container, Text } from "@nextui-org/react";
import React from "react";
import { VscSearchStop } from "react-icons/vsc";

type Props = {
  searchValue: string;
};

const NoResultsSearch = ({ searchValue }: Props) => {
  return (
    <Container
      alignItems="center"
      justify="center"
      css={{
        d: "flex",
        w: "100%",
        gap: "$6",
        h: "220px",
        ".icon": {
          fontSize: "$6xl",
          color: "$accents6",
        },
      }}
      direction="column"
    >
      <Text h2 color="$accents6">
        Sin resultados
      </Text>
      <VscSearchStop className="icon" />
      <Text color="$accents6">
        No se encontraron resultados para la busqueda: '{searchValue}'
      </Text>
    </Container>
  );
};

export default NoResultsSearch;
