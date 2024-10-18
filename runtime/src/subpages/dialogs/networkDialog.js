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

function NetworkDialog({ open, handleClose, isUploadComplete, onSubmit }) {
  // Set state for all fields from your Network model
  const [subnet, setSubnet] = useState('');
  const [vlan_id, setVlanId] = useState('');
  const [publicNetwork, setPublic] = useState('');
  const [firewalled, setFirewalled] = useState('');
  const [proxy, setProxy] = useState('');

  const [isFormComplete, setIsFormComplete] = useState(false); // Track if the form is complete

  // Validation to check if required fields are filled
  useEffect(() => {
    if (subnet.trim() && vlan_id.trim()) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [subnet, vlan_id]);

  const handleFormSubmit = () => {
    const formData = {
      subnet,
      vlan_id,
      public: publicNetwork,
      firwalled: firewalled,
      proxy,
    };
    onSubmit(formData);  // Pass data to the parent component
    handleClose();       // Close the dialog
  };

  return (
    <Dialog open={open} onClose={isUploadComplete ? handleClose : null} fullWidth maxWidth="sm">
      <DialogTitle>Add a Network</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subnet"
              variant="outlined"
              value={subnet}
              onChange={(e) => setSubnet(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="VLAN ID"
              variant="outlined"
              value={vlan_id}
              onChange={(e) => setVlanId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Public"
              variant="outlined"
              value={publicNetwork}
              onChange={(e) => setPublic(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Firewalled"
              variant="outlined"
              value={firewalled}
              onChange={(e) => setFirewalled(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Proxy"
              variant="outlined"
              value={proxy}
              onChange={(e) => setProxy(e.target.value)}
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

export default NetworkDialog;
