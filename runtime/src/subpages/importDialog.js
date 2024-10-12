import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ImportDialog = ({ open, handleClose, importResults }) => (
  <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
    <DialogTitle>API Import Results</DialogTitle>
    <DialogContent dividers>
      {importResults ? (
        <Typography variant="body1">
          {importResults}
        </Typography>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No results to display yet....
        </Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default ImportDialog;
