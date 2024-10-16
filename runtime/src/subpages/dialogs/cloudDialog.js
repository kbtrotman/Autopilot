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

function CloudDialog({ open, handleClose, isUploadComplete, onSubmit }) {
  // Set state for all fields from your Cloud model
  const [vendor, setVendor] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [terraform, setTerraform] = useState(false);
  const [api_only, setApiOnly] = useState(false);

  const [isFormComplete, setIsFormComplete] = useState(false); // Track if the form is complete

  // Validation to check if required fields are filled
  useEffect(() => {
    if (vendor.trim() && login.trim() && password.trim()) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [vendor, login, password]);

  const handleFormSubmit = () => {
    const formData = {
      vendor,
      login,
      password,
      terraform,
      api_only,
    };
    onSubmit(formData);  // Pass data to the parent component
    handleClose();       // Close the dialog
  };

  return (
    <Dialog open={open} onClose={isUploadComplete ? handleClose : null} fullWidth maxWidth="sm">
      <DialogTitle>Add a Cloud Provider</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Vendor"
              variant="outlined"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Login"
              variant="outlined"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={terraform}
                  onChange={(e) => setTerraform(e.target.checked)}
                />
              }
              label="Supports Terraform?"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={api_only}
                  onChange={(e) => setApiOnly(e.target.checked)}
                />
              }
              label="API Only Access?"
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

export default CloudDialog;
