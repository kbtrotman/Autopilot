import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Grid,
} from '@mui/material';

function TenantDialog({ open, handleClose, isUploadComplete, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false); // Track if the form is complete

  useEffect(() => {
    // Check if required fields are filled
    if (name.trim() && owner.trim()) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [name, owner]); // Depend on product and description state

  const handleFormSubmit = () => {
    const formData = {
      name,
      owner,
      description,
    };
    onSubmit(formData);  // Pass data to the parent component
    handleClose();       // Close the dialog
  };

  return (
    <Dialog open={open} onClose={isUploadComplete ? handleClose : null} fullWidth maxWidth="sm">
      <DialogTitle>Tenant Information Upload</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tenant Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tenant Owner"
              variant="outlined"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
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
              value={description}
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

export default TenantDialog;
