import {
  Box,
  InputAdornment,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { type FC } from "react";

type DataHeaderProps = {
  headers: string[];
  ALL_TOTAL:number
};

const DataHeader: FC<DataHeaderProps> = ({ headers,ALL_TOTAL }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: "13rem", backgroundColor: "#f7fafc" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{fontWeight:600}}>Area</Typography>
          </Box>
        </TableCell>
        {headers.map((header) => (
          <TableCell
            key={header}
            sx={{ width: "13rem", backgroundColor: "#f7fafc" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "600", marginBottom: "10px" }}>
                {header}
              </Typography>
              <TextField
                placeholder="Search"
                // value={searchTerms.organisation}
                // onChange={handleSearchChange("organisation")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                size="small"
                variant="outlined"
                sx={{
                  width: "100%",
                  backgroundColor: "#e8ebed",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                  borderBottom: "1px solid #171717",
                }}
              />
            </Box>
          </TableCell>
        ))}
        <TableCell sx={{ width: "13rem", backgroundColor: "#f7fafc" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", marginBottom: "10px" }}>
              Verdi
            </Typography>
            <TextField
                value={"Kr "+ALL_TOTAL}
                size="small"
                variant="outlined"
                sx={{
                  width: "100%",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "4px",
                  fontWeight:"600",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                    "& input": {
                      fontWeight: "600",
                    },
                  },
                }}
            />
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DataHeader;
