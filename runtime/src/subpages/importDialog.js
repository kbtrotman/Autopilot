import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';


function ImportDialog({ open, handleClose, importResults, isImportComplete }) {

  return (
    <Dialog open={open} onClose={isImportComplete ? handleClose : null} fullWidth maxWidth="sm">
      <DialogTitle>API Import Results</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {importResults ? (
            <Typography variant="body1">
              <pre>
              {importResults}
              </pre>
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No results to display yet....
            </Typography>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose} color="primary" disabled={!isImportComplete}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportDialog;
