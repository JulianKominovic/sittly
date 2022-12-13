import { Container, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { getIconForFile, getIconForFolder } from "vscode-icons-js";
import { niceBytes } from "../../lib/niceBytes";
import SidebarDetailsLayout from "../../ui/sidebar-details/SidebarDetails";

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
    <SidebarDetailsLayout
      imageSrc={
        base64Img ||
        `/public/icons/${
          extension === ""
            ? getIconForFolder(name)
            : getIconForFile(name + extension || "")
        }`
      }
      table={
        lastModified
          ? {
              id: "preview-file",
              columns: ["Item", "Valor"],
              rows: [
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
              ],
            }
          : {}
      }
    />
  );
};

export default Preview;
