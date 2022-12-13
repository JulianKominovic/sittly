import { Container, Image } from "@nextui-org/react";
import Icon from "../decoration/Icon";
import Table, { TableProps } from "../table";

type Props = {
  imageSrc?: string;
  icon?: string;
  table?: Partial<TableProps>;
  children: React.ReactNode;
};

const SidebarDetailsLayout = ({ imageSrc, icon, table, children }: Props) => {
  const shouldRenderSidebar =
    table?.columns?.length > 0 &&
    table?.rows?.length > 0 &&
    table?.rows?.some((row) => row[0] && row[1]);
  return (
    <Container
      css={{
        p: "0",
        m: "0",
        display: "flex",
        flexDirection: "row",
        h: "400px",
      }}
    >
      <Container
        css={{
          w: shouldRenderSidebar ? "50%" : "100%",
          m: "0",
          p: "0",
        }}
      >
        {children}
      </Container>
      {shouldRenderSidebar ? (
        <Container
          as="aside"
          css={{
            m: "0",
            p: "0",
            w: "50%",
            h: "auto",
          }}
        >
          {imageSrc ? (
            <Image
              objectFit="scale-down"
              css={{
                w: "auto",
                mx: "auto",
                h: "190px",
                maxW: "100%!important",
              }}
              src={imageSrc}
              alt=""
            />
          ) : (
            <Icon
              css={{
                mx: "auto",
              }}
              icon={icon}
              size="190px"
              iconSize="90px"
            />
          )}
          {table && <Table {...(table as TableProps)} />}
        </Container>
      ) : null}
    </Container>
  );
};

export default SidebarDetailsLayout;
