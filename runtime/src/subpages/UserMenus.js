import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, Box, Button, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Draggable item component
function DraggableItem({ id, title }) {
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
      {title}
    </div>
  );
}

// Main component with containers and items
export default function MenuBuilder() {
  const [containers, setContainers] = useState([
    { id: 'menu1', title: 'Menu 1', items: [{ id: 'item1', title: 'Workflow Item 1' }, { id: 'item2', title: 'Workflow Item 2' }] },
    { id: 'menu2', title: 'Menu 2', items: [{ id: 'item3', title: 'Workflow Item 3' }, { id: 'item4', title: 'Workflow Item 4' }] },
  ]);

  const [selectedGroup, setSelectedGroup] = useState('');

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeContainer = containers.find(container => container.items.find(item => item.id === active.id));
    const overContainer = containers.find(container => container.items.find(item => item.id === over.id));

    if (activeContainer && overContainer && activeContainer.id !== overContainer.id) {
      // Moving items between containers
      const activeItems = [...activeContainer.items];
      const overItems = [...overContainer.items];
      const [movedItem] = activeItems.splice(activeItems.findIndex(item => item.id === active.id), 1);
      overItems.splice(overItems.findIndex(item => item.id === over.id), 0, movedItem);

      setContainers(containers.map(container => {
        if (container.id === activeContainer.id) return { ...container, items: activeItems };
        if (container.id === overContainer.id) return { ...container, items: overItems };
        return container;
      }));
    } else {
      // Moving items within the same container
      setContainers(containers.map(container => {
        if (container.id === activeContainer.id) {
          const newItems = arrayMove(
            activeContainer.items,
            activeContainer.items.findIndex(item => item.id === active.id),
            activeContainer.items.findIndex(item => item.id === over.id)
          );
          return { ...container, items: newItems };
        }
        return container;
      }));
    }
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    // Add logic to fetch data for the selected group from the backend
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2}>
        {/* Left side - Menu Builder */}
        <Grid item xs={12} md={8}>
          <Typography component="h2" variant="h6" color="blue" sx={{ mb: 2 }}>
            Menu Builder
          </Typography>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {containers.map((container) => (
              <Box key={container.id} sx={{ mb: 2, border: '1px solid #ccc', padding: '8px' }}>
                <Typography component="h3" variant="h6" color="primary">
                  {container.title}
                </Typography>
                <SortableContext
                  items={container.items.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {container.items.map(item => (
                    <DraggableItem key={item.id} id={item.id} title={item.title} />
                  ))}
                </SortableContext>
              </Box>
            ))}
          </DndContext>

          <Button variant="contained" sx={{ mt: 2 }}>
            Save Menu
          </Button>
        </Grid>

        {/* Right side - Group Selection */}
        <Grid item xs={12} md={4}>
          <Typography component="h2" variant="h6" color="blue" sx={{ mb: 2 }}>
            Group Menus
          </Typography>

          <Select
            value={selectedGroup}
            onChange={handleGroupChange}
            displayEmpty
            sx={{ width: '100%', mb: 2 }}
          >
            <MenuItem value="">
              <em>Which Group's Menus</em>
            </MenuItem>
            <MenuItem value="group1">Group 1</MenuItem>
            <MenuItem value="group2">Group 2</MenuItem>
          </Select>

          {/* Display the group details here */}
          <Box sx={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
            <Typography component="h3" variant="h6">
              Menu Details for {selectedGroup ? `Group ${selectedGroup}` : 'Selected Group'}
            </Typography>
            <ul>
              <li>Menu Item 1</li>
              <li>Menu Item 2</li>
              {/* Display more menus based on group */}
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
