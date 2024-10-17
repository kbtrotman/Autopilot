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


function UserDialog({ open, handleClose, isUploadComplete, onSubmit }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isTenantAdmin, setIsTenantAdmin] = useState(false);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [tenant, setTenant] = useState(0);
  const [priGroup, setPriGroup] = useState('');
  const [adGroups, setAdGroups] = useState('');
  const [role, setRole] = useState('');
  const [remote, setRemote] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false); // Track if form is complete

  useEffect(() => {
    // Check if required fields are filled
    if (email.trim() && name.trim()) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [email, name]); // Depend on required fields

  const handleFormSubmit = () => {
    const formData = {
      email,
      name,
      is_staff: isStaff,
      is_admin: isAdmin,
      is_active: isActive,
      is_superuser: isSuperuser,
      is_tenant_admin: isTenantAdmin,
      description,
      phone,
      location,
      tenant,
      pri_group: priGroup,
      ad_groups: adGroups,
      role,
      remote,
    };
    onSubmit(formData);  // Pass data to the parent component
    handleClose();       // Close the dialog
  };

  return (
    <Dialog open={open} onClose={isUploadComplete ? handleClose : null} fullWidth maxWidth="sm">
      <DialogTitle>User Information Upload</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isStaff}
                  onChange={(e) => setIsStaff(e.target.checked)}
                />
              }
              label="Is Staff"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="Is Admin"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              }
              label="Is Active"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSuperuser}
                  onChange={(e) => setIsSuperuser(e.target.checked)}
                />
              }
              label="Is Superuser"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTenantAdmin}
                  onChange={(e) => setIsTenantAdmin(e.target.checked)}
                />
              }
              label="Is Tenant Admin"
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
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tenant ID"
              type="number"
              variant="outlined"
              value={tenant}
              onChange={(e) => setTenant(parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Primary Group"
              variant="outlined"
              value={priGroup}
              onChange={(e) => setPriGroup(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="AD Groups"
              variant="outlined"
              value={adGroups}
              onChange={(e) => setAdGroups(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Role"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={remote}
                  onChange={(e) => setRemote(e.target.checked)}
                />
              }
              label="Remote"
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

export default UserDialog;

