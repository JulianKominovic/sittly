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
        {columns?.map((col) => (
          <Table.Column>{col}</Table.Column>
        ))}
      </Table.Header>
      <Table.Body>
        {rows?.map((row, index) => (
          <Table.Row key={index + "col" + id}>
            {row.map((col) => (
              <Table.Cell
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
