import { Table } from "@nextui-org/react";
export type TableProps = {
  columns: string[];
  rows: string[][];
  id: string;
};

const SittlyTable = ({ columns, rows, id }: TableProps) => {
  if (!columns || !rows) return null;
  return (
    <Table
      compact
      css={{
        fontSize: "0.8rem",
      }}
    >
      <Table.Header>
        {columns?.map((col, index) => (
          <Table.Column key={id + "c" + index}>{col}</Table.Column>
        ))}
      </Table.Header>
      <Table.Body>
        {rows?.map((row, index) => (
          <Table.Row key={index + "r" + id}>
            {row.map((col, i) => (
              <Table.Cell
                key={i + "cr" + id}
                css={{
                  py: "$2",
                  px: "$1",
                }}
              >
                {col}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export { SittlyTable as default };
