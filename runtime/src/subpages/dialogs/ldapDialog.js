import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';

function LDAPDialog({ open, handleClose, isUploadComplete, onSubmit }) {
  const [scriptArguments, setScriptArguments] = useState('');
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [notify, setNotify] = useState(false);
  const [email, setEmail] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false); // Track if the form is complete

  useEffect(() => {
    // Check if required fields are filled
    if (product.trim() && description.trim()) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [product, description]); // Depend on product and description state

  const handleFormSubmit = () => {
    const formData = {
      arguments: scriptArguments,
      product,
      description,
      notify,
      email,
    };
    onSubmit(formData);  // Pass data to the parent component
    handleClose();       // Close the dialog
  };

  return (
    <Dialog open={open} onClose={isUploadComplete ? handleClose : null} fullWidth maxWidth="sm">
      <DialogTitle>Add an LDAP or AD Map</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Arguments"
              variant="outlined"
              value={scriptArguments}
              onChange={(e) => setScriptArguments(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product"
              variant="outlined"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
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
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={notify}
                  onChange={(e) => setNotify(e.target.checked)}
                />
              }
              label="Notify uploader on use?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email(s) to Notify"
              variant="outlined"
              placeholder="Enter comma-separated emails"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default LDAPDialog;
