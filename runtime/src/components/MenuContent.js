import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import {mainListItems, secondaryListItems, SubListItems, SubListItemsSect2} from '../subpages/Menu-Lists';
import Collapse from '@mui/material/Collapse';

export default function MenuContent() {
  const [open, setOpen] = useState({}); // Track collapse state for each item

  const handleToggle = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* First Section: Main List Items */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => handleToggle(index)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>

            {/* Nested Items for Collapsible Menus */}
            {item.nest === 'True' && (
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {SubListItems.filter((subItem) => subItem.list === index).map((subItem, subIndex) => (
                    <ListItem key={subIndex} component={Link} to={subItem.target}>
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </ListItem>
        ))}
      </List>

      {/* Second Section: Secondary List Items */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }} >
            <ListItemButton onClick={() => handleToggle(`secondary-${index}`)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}> </ListItemText>
            </ListItemButton>

            {/* Nested Items for Collapsible Menus in Secondary List */}
            {item.nest === 'True' && (
              <Collapse in={open[`secondary-${index}`]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {SubListItemsSect2.filter((subItem) => subItem.list === index).map((subItem, subIndex) => (
                    <ListItem key={subIndex} component={Link} to={subItem.target}>
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

