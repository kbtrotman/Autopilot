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

function ApplianceDialog({ open, handleClose, isUploadComplete, onSubmit }) {
  // Set state for all fields from your Appliance model
  const [aname, setAName] = useState('');
  const [type, setType] = useState('');
  const [pri_ip, setPriIP] = useState('');
  const [sec_ip, setSecIP] = useState('');
  const [term_ip, setTermIP] = useState('');
  const [serial, setSerial] = useState('');
  const [hw_vendor, setHWVendor] = useState('');
  const [hw_type, setHWType] = useState('');
  const [datacenter, setDatacenter] = useState('');
  const [dc_row, setDCRow] = useState('');
  const [dc_rack, setDCRack] = useState('');
  const [dc_u_num, setDCUNum] = useState('');
  const [virtual, setVirtual] = useState(false);
  
  const [isFormComplete, setIsFormComplete] = useState(false); // Track if the form is complete

  // Validation to check if required fields are filled
  useEffect(() => {
    if (aname.trim() && pri_ip.trim() && type.trim()) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [aname, pri_ip, type]);

  const handleFormSubmit = () => {
    const formData = {
      aname,
      type,
      pri_ip,
      sec_ip,
      term_ip,
      serial,
      hw_vendor,
      hw_type,
      datacenter,
      dc_row,
      dc_rack,
      dc_u_num,
      virtual,
    };
    onSubmit(formData);  // Pass data to the parent component
    handleClose();       // Close the dialog
  };

  return (
    <Dialog open={open} onClose={isUploadComplete ? handleClose : null} fullWidth maxWidth="sm">
      <DialogTitle>Add an Appliance</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Appliance Name"
              variant="outlined"
              value={aname}
              onChange={(e) => setAName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Type"
              variant="outlined"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Primary IP Address"
              variant="outlined"
              value={pri_ip}
              onChange={(e) => setPriIP(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Secondary IP Address"
              variant="outlined"
              value={sec_ip}
              onChange={(e) => setSecIP(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Terminal IP Address"
              variant="outlined"
              value={term_ip}
              onChange={(e) => setTermIP(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Serial Number"
              variant="outlined"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hardware Vendor"
              variant="outlined"
              value={hw_vendor}
              onChange={(e) => setHWVendor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hardware Type"
              variant="outlined"
              value={hw_type}
              onChange={(e) => setHWType(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Datacenter"
              variant="outlined"
              value={datacenter}
              onChange={(e) => setDatacenter(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Datacenter Row"
              variant="outlined"
              value={dc_row}
              onChange={(e) => setDCRow(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Datacenter Rack"
              variant="outlined"
              value={dc_rack}
              onChange={(e) => setDCRack(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Datacenter U Number"
              variant="outlined"
              value={dc_u_num}
              onChange={(e) => setDCUNum(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={virtual}
                  onChange={(e) => setVirtual(e.target.checked)}
                />
              }
              label="Virtual Appliance?"
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

export default ApplianceDialog;
