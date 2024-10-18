import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';

function GroupDialog({ open, handleClose, isUploadComplete, onSubmit }) {
  const [name, setGroup] = useState(''); // Renamed from 'name' to 'group' for permissions
  const [desc, setDescription] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false); // Track if the form is complete

  useEffect(() => {
    // Check if required fields are filled
    if (name.trim()) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [name]); // Depend on group and description state

  const handleFormSubmit = () => {
    const formData = {
      name,
      desc,
    };
    onSubmit(formData);  // Pass data to the parent component
    handleClose();       // Close the dialog
  };

  return (
    <Dialog open={open} onClose={isUploadComplete ? handleClose : null} fullWidth maxWidth="sm">
      <DialogTitle>Group Information Upload</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Group Name"
              variant="outlined"
              value={name}
              onChange={(e) => setGroup(e.target.value)}
              required // Optional for visual indicator
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              variant="outlined"
              value={desc}
              onChange={(e) => setDescription(e.target.value)}
              required // Optional for visual indicator
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary" disabled={!isFormComplete}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GroupDialog;
