import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { DataComponentProps } from "../models/Props";
import { useQuery } from "@tanstack/react-query";
import { DataService } from "../services/DataService";
import { DistributionKey, MainData, Node } from "../models/DataTypes";
import Area from "./Area";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DataHeader from "./DataHeader";

type CellType = {
  id: string;
  value: string;
};

type RowType = {
  cells: CellType[];
  total: number;
};

type SectionType = {
  name: string;
  distributionKey:DistributionKey,
  rows: RowType[];
};

const traverseNodes = (node: Node | undefined): CellType[] => {
  if (node === undefined) {
    return [
      {
        id: "",
        value: "",
      },
    ];
  }
  const currentCells = [
    {
      id: node.id,
      value: node.value,
    },
  ];

  if (node.hasSecondColumn) {
    currentCells.push({
      id: node.id,
      value: node.secondColumn,
    });
  }
  if (node.nodes.length === 0 || node.nodes.length > 1) {
    return [...currentCells];
  }
  const cells = traverseNodes(node.nodes[0]);
  return [...currentCells, ...cells];
};

const constructBodyTable = (mainData: MainData): SectionType[] => {
  const sections: SectionType[] = [];
  for (const section of mainData.data) {
    const rows: RowType[] = [];
    for (const item of section.nodes) {
      const cells = traverseNodes(item);
      rows.push({
        cells,
        total: item.calculatedValue,
      });
    }
    sections.push({
      name:section.name,
      distributionKey:section.distributionKey,
      rows,
    });
  }

  return sections;
};

const RenderSection = ({
  cellsLength,
  section,
}: {
  section: SectionType;
  cellsLength: number;
}) => {
  return (
    <>
      {section.rows.map((row, index) => {
        return (
          <TableRow key={index}>
            {(!(index > 0))?
            <TableCell rowSpan={section.rows.length}>
              <Area name={section.name} distributionKey={section.distributionKey}/>
            </TableCell>:null}
            {Array.from({ length: cellsLength }).map((_, index) => {
              const cell = row.cells[index] || {
                id: "",
                value: "Utvid alle",
              };
              return <TableCell key={index}>
                {
                  !(cell.id === "")?
                  <Accordion>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon sx={{color:"black"}}/>}>
                      <Typography>{cell.value}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      Empty
                    </AccordionDetails>
                  </Accordion>
                  :<Typography sx={{textAlign:'center',fontSize:'1.1rem',color:"#6f6f6f"}}>{cell.value}</Typography>
                }
              </TableCell>;
            })}
            <TableCell sx={{fontWeight:600}}>Kr {row.total}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};


export default function DataComponent(props: DataComponentProps) {
  const { data } = useQuery<MainData[]>({
    queryKey: ["data"],
    queryFn: DataService.getAllData,
    select: (data: MainData[]) => {
      return data.filter((item) => item.name === props.type);
    },
  });

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }
  const mainData = data[0];
  const bodyTable = constructBodyTable(mainData);
  const sumOfTotals = bodyTable.reduce((total, section) => {
    return total + section.rows.reduce((acc, row) => acc + row.total, 0);
  }, 0);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <DataHeader headers={mainData.headers} ALL_TOTAL={sumOfTotals} />
          <TableBody>
              {
                bodyTable.map((section, index) => {
                  return (
                      <RenderSection
                        key={index}
                        section={section}
                        cellsLength={mainData.headers.length}
                      />
                  )
                })
              }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
