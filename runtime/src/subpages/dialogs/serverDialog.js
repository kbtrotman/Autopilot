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

function ServerDialog({ open, handleClose, isUploadComplete, onSubmit }) {
  // Set state for all fields from your model
  const [sname, setSName] = useState('');
  const [ip, setIP] = useState('');
  const [description, setDescription] = useState('');
  const [term_ip, setTermIP] = useState('');
  const [o_s, setOS] = useState('');
  const [serial, setSerial] = useState('');
  const [hw_vendor, setHWVendor] = useState('');
  const [hw_type, setHWType] = useState('');
  const [cpu_count, setCPUCount] = useState('');
  const [memory, setMemory] = useState('');
  const [datacenter, setDatacenter] = useState('');
  const [dc_row, setDCRow] = useState('');
  const [dc_rack, setDCRack] = useState('');
  const [dc_u_num, setDCUNum] = useState('');
  const [virtual, setVirtual] = useState(false);
  
  const [isFormComplete, setIsFormComplete] = useState(false); // Track if the form is complete

  // Validation to check if the required fields are filled
  useEffect(() => {
    if (sname.trim() && ip.trim() && o_s.trim()) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [sname, ip, o_s]); // Add other fields as required for validation

  const handleFormSubmit = () => {
    const formData = {
      sname,
      ip,
      description,
      term_ip,
      o_s,
      serial,
      hw_vendor,
      hw_type,
      cpu_count,
      memory,
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
      <DialogTitle>Add a Server</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Server Name"
              variant="outlined"
              value={sname}
              onChange={(e) => setSName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="IP Address"
              variant="outlined"
              value={ip}
              onChange={(e) => setIP(e.target.value)}
              required
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
              label="Virtual Server?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              label="Operating System"
              variant="outlined"
              value={o_s}
              onChange={(e) => setOS(e.target.value)}
              required
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
              label="CPU Count"
              variant="outlined"
              type="number"
              value={cpu_count}
              onChange={(e) => setCPUCount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Memory (GB)"
              variant="outlined"
              type="number"
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
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

export default ServerDialog;

