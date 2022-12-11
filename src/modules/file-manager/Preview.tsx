import { Container, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { getIconForFile, getIconForFolder } from "vscode-icons-js";
import { niceBytes } from "../../lib/niceBytes";
import Table from "../../ui/table";

type Props = {
  base64Img?: string;
  lastModified?: Date;
  name?: string;
  path?: string;
  extension?: string;
  size?: number;
};

const Preview = ({
  base64Img,
  lastModified,
  name,
  path,
  extension,
  size,
}: Props) => {
  return (
    <Container
      css={{
        m: "0",
        p: "0",
        w: "50%",
        h: "auto",
      }}
    >
      <Image
        objectFit="scale-down"
        css={{
          w: "auto",
          mx: "auto",
          h: "190px",
          maxW: "100%!important",
        }}
        src={
          base64Img ||
          `/public/icons/${
            extension === ""
              ? getIconForFolder(name)
              : getIconForFile(name + extension || "")
          }`
        }
        alt=""
      />
      {lastModified && (
        <Table
          id="preview-file"
          columns={["Item", "Valor"]}
          rows={[
            ["Nombre", name],
            ["Ubicacion", path],
            ["Extension", extension],
            [
              "Ultima modificacion",
              Intl.DateTimeFormat("es", {
                dateStyle: "long",
                timeStyle: "medium",
              }).format(lastModified),
            ],
            ["Tamaño", niceBytes(size)],
          ]}
        />
      )}
    </Container>
  );
};

export default Preview;
