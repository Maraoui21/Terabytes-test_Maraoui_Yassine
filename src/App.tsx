import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react";
import DataComponent from "./components/DataComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TabType } from "./models/enums";

const queryClient = new QueryClient()

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setValue(newValue);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{width:'80%',margin:'10px auto'}}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" {...a11yProps(0)}>
              <Tab style={{fontWeight:"bold",color:"#1b1b1bcc"}} label="STANDARD"   {...a11yProps(1)}/>
              <Tab style={{fontWeight:"bold",color:"#1b1b1bcc"}} label="ONLY RENOVATION" {...a11yProps(2)}/>
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <DataComponent type={TabType.STANDARD}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DataComponent type={TabType.ONLY_RENOVATION}/>
          </CustomTabPanel>
        </Box>
      </div>
    </QueryClientProvider>
  )
}

export default App
