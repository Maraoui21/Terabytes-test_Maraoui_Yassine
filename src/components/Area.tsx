import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FlagIcon from '@mui/icons-material/Flag';
import { Box, CardHeader, FormControl, IconButton, InputLabel, Menu, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import { AreaComponentProps } from '../models/Props';

export default function Area(props:AreaComponentProps) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        handleClose();
    };
    const handleDelete = () => {
        handleClose();
    };
    const  handleCollapseExpand = () => {

    }
    return (
        <Card sx={{ maxWidth: 345,padding:"0 20px",border:"1px solid #8080804f" }}>
            <CardHeader
            action={
                <IconButton
                    aria-label="settings"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                }
                title={<span style={{ fontSize: '1rem' }}>Direktekostnade...</span>}
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleCollapseExpand}>collapse/expand</MenuItem>
                <MenuItem onClick={handleEdit}>rename</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
            <CardContent>
                <Box>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                        <Typography sx={{fontSize:'0.9rem'}}>{props.name}</Typography>
                        <Box>
                            <EditIcon sx={{color:"#95989a",fontSize:'1.2rem',cursor:'pointer'}}/>
                            <DeleteIcon sx={{color:"#95989a",fontSize:'1.2rem',cursor:'pointer'}}/>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center',gap:'5px',justifyContent:'center'}}>
                        <CircleIcon sx={{color:"#14a014",fontSize:'1rem',cursor:'pointer'}} />
                        <Typography sx={{fontSize:'0.9rem'}}>{props.distributionKey.name}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions>
                <FlagIcon/>
                <FormControl sx={{ m: 1, minWidth: 120,width:'100%' }} size="small">
                    <InputLabel id="demo-select-small-label">{props.name}</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label={props.name}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>CHOICE 1</MenuItem>
                        <MenuItem value={20}>CHOICE 2</MenuItem>
                        <MenuItem value={30}>CHOICE 3</MenuItem>
                    </Select>
                </FormControl>
            </CardActions>
        </Card>
    )
}
