import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, Box, Button, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import axios from 'axios';

// Draggable TextField component
function DraggableTextField({ id, value, onChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    margin: '4px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TextField
        label="Menu Item"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onChange(id, e.target.value)}  // Handle text changes
      />
    </div>
  );
}


// Main component with containers and items
export default function MenuBuilder() {

  const [containers, setContainers] = useState([]);  // Store the menu structure
  const [groups, setGroups] = useState([]);  // Store the available groups
  const [selectedGroup, setSelectedGroup] = useState('');  // Track selected group
  const [loading, setLoading] = useState(false);
  const [newHeading, setNewHeading] = useState('');  // For the next new heading
  const [headingCount, setHeadingCount] = useState(2);  // Track number of headings (initially 2)

  // Menu name derived from group name
  const [menuName, setMenuName] = useState('New Menu');  // Example menu name from group

  const API_URL = 'http://backend:8000/api';


  // Default scaffold menu data to use when there's no menu built yet
  const defaultMenuData = [
    {
      id: 'menu1',
      title: 'Menu 1',
      items: [
        { id: 'item1', title: 'Item 1', children: [] },
        { id: 'item2', title: 'Item 2', children: [] },
      ],
    },
    {
      id: 'menu2',
      title: 'Menu 2',
      items: [
        { id: 'item3', title: 'Item 3', children: [] },
        { id: 'item4', title: 'Item 4', children: [] },
      ],
    },
  ];

  // Fetch groups from the backend when the component mounts
  useEffect(() => {
    axios.get(`${API_URL}/groups/`)
      .then((response) => {
        setGroups(response.data); // Assuming response.data contains the array of groups
        setMenuName(groups.group_name);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
      });
  }, []);

  // Sensors to detect dragging
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  // Handle heading (container title) updates
  const handleHeadingUpdate = (id, newTitle) => {
    const updatedContainers = containers.map(container =>
      container.id === id ? { ...container, title: newTitle } : container
    );
    setContainers(updatedContainers);
  };

  // Handle adding a new heading
  const handleAddHeading = () => {
    if (headingCount < 7 && newHeading) {
      const newContainerId = `menu${headingCount + 1}`;  // Create unique ID for new menu
      const newContainer = { id: newContainerId, title: newHeading, items: [] };

      setContainers([...containers, newContainer]);
      setHeadingCount(headingCount + 1);
      setNewHeading('');  // Clear the new heading textbox
    }
  };

  // Handle menu name update
  const handleMenuNameUpdate = (e) => {
    setMenuName(e.target.value);
  };

  // Fetch the menu JSON when a group is selected
  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    setLoading(true);

    // Fetch menu for the selected group
    axios.get(`${API_URL}/usermenus/get/${groupId}/`)
      .then(response => {
        console.log(response.data);
        const { menu_json } = response.data;
        // Check if the menu_json is null or undefined, and if so, set default scaffold data
        if (!menu_json || menu_json.length === 0) {
          console.log('No menu found, displaying default scaffold menu.');
          setContainers(defaultMenuData);
        } else {
          setContainers(menu_json);  // Set the containers state with the fetched JSON
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user menu:', error);
        setLoading(false);
      });
  };

  // Save the current menu structure to the backend
  const handleSaveMenu = () => {
    if (!selectedGroup) {
      alert('Please select a group first');
      return;
    }
    
    axios.post(`${API_URL}/usermenus/add/${selectedGroup}/`, {
      menu_json: containers
    })
      .then(response => {
        alert('Menu saved successfully!');
      })
      .catch(error => {
        console.error('Error saving menu:', error);
      });
  };

  // Handle text change in the TextField
  const handleTextChange = (itemId, newValue) => {
    const updatedContainers = containers.map((container) => ({
      ...container,
      items: container.items.map((item) =>
        item.id === itemId ? { ...item, title: newValue } : item
      ),
    }));
    setContainers(updatedContainers);
  };

  // Function to handle drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Find the container that contains the active item
    let activeContainer, activeItem, activeItemIndex;
    for (let container of containers) {
      activeItemIndex = container.items.findIndex(item => item.id === active.id);
      if (activeItemIndex !== -1) {
        activeContainer = container;
        activeItem = container.items[activeItemIndex];
        break;
      }
    }

    // Find the container where the item is being dropped
    let overContainer, overItemIndex;
    for (let container of containers) {
      overItemIndex = container.items.findIndex(item => item.id === over.id);
      if (overItemIndex !== -1) {
        overContainer = container;
        break;
      }
    }

    // Move items between containers or reorder within the same container
    if (activeContainer && overContainer) {
      const updatedContainers = [...containers];

      if (activeContainer === overContainer) {
        // Reorder within the same container
        const updatedItems = arrayMove(activeContainer.items, activeItemIndex, overItemIndex);
        activeContainer.items = updatedItems;
      } else {
        // Move item to a different container
        activeContainer.items.splice(activeItemIndex, 1);  // Remove from the old container
        overContainer.items.splice(overItemIndex, 0, activeItem);  // Add to the new container
      }

      setContainers(updatedContainers);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2}>
        {/* Left side - Menu Builder */}
        <Grid item xs={12} md={8}>
          <Typography component="h2" variant="h6" color="blue" sx={{ mb: 2 }}>
            Menu Builder
          </Typography>
          {/* Save button */}
          <Button variant="contained" onClick={handleSaveMenu} sx={{ mt: 3 }}>
            Save Menu
          </Button>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'flex-start',
              }}
            >
              {containers.map((container) => (
                <Box
                  key={container.id}
                  sx={{
                    width: '300px',
                    padding: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>{container.title}</Typography>

                  <SortableContext items={container.items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    {container.items.map((item) => (
                      <DraggableTextField
                        key={item.id}
                        id={item.id}
                        value={item.title}
                        onChange={handleTextChange}
                      />
                    ))}
                  </SortableContext>
                </Box>
              ))}
            </Box>
          </DndContext>
        </Grid>

        {/* Right side - Group Selection */}
        <Grid item xs={12} md={4}>
          <Typography component="h2" variant="h6" color="blue" sx={{ mb: 2 }}>
            Group Menu Edit
          </Typography>

          <Select
            value={selectedGroup}
            onChange={handleGroupChange}
            displayEmpty
            sx={{ width: '100%', mb: 2 }}
          >
            <MenuItem value="">
              <em>Select group first...</em>
            </MenuItem>

            {/* Dynamically create MenuItems based on groups data */}
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
          {/* Display loading spinner if needed */}
          {loading && <Typography>Loading menu...</Typography>}
          
          {/* Display the group details here */}
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px', width: '300px', border: '1px solid #ccc', backgroundColor: '#f4f4f4' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Menu Properties</Typography>

            {/* Display menus based on group */}
            {/* Textbox for editing the menu name (derived from groups.group_name) */}
            <TextField
              label="Menu Name"
              value={menuName}
              onChange={handleMenuNameUpdate}
              fullWidth
              sx={{ mb: 3 }}
            />
            {/* Textboxes for editing the existing headings (container titles) */}
            {containers.map((container, index) => (
              <Box key={container.id} sx={{ mb: 2 }}>
                <TextField
                  label={`Heading ${index + 1}`}
                  value={container.title}
                  onChange={(e) => handleHeadingUpdate(container.id, e.target.value)}
                  fullWidth
                />
              </Box>
            ))}

            {/* New heading input (appears when headingCount < 7) */}
            {headingCount < 7 && (
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="New Heading"
                  value={newHeading}
                  onChange={(e) => setNewHeading(e.target.value)}
                  fullWidth
                />
              </Box>
            )}

            {/* Add button - Disabled if already 7 headings */}
            <Button
              variant="contained"
              onClick={handleAddHeading}
              disabled={headingCount >= 7 || !newHeading}
              sx={{ mt: 2 }}
            >
              Add Heading
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
