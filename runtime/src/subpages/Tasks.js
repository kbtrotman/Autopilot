import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Copyright from '../internals/components/Copyright';
import axios from 'axios';
import ImportDialog from './importDialog';

const API_URL = 'http://backend:8000/api';

const columns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 10 },
  {
    field: 'sname',
    headerName: 'Short name',
    width: 150,
    editable: false,
  },
  {
    field: 'hrname',
    headerName: 'Human-readable name',
    width: 50,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 50,
    editable: true,
  },
  {
    field: 'type',
    headerName: 'Product Type',
    sortable: true,
    width: 50,
  },
  {
    field: 'yaml_file',
    headerName: 'OpenAPI Def File',
    sortable: true,
    width: 50,
  },
  {
    field: 'input',
    headerName: 'Input JSON',
    sortable: true,
    width: 50,
  },
  {
    field: 'output',
    headerName: 'Output JSON',
    sortable: true,
    width: 50,
  },
  {
    field: 'send',
    headerName: 'Notify of Use?',
    type: 'boolean',
    sortable: true,
    width: 50,
  },
  {
    field: 'email',
    headerName: 'Contact E-mails',
    sortable: true,
    width: 200,
  },
];


const callRestApi = (endpoint, method = 'GET', body) => {

  const headers = {
    'Accept': 'application/json',
  };

  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
    headers,
  }).catch(err => {
    console.error('Request failed:', err);
  });
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [importResults, setImportResults] = useState('');
  const [isImportComplete, setIsImportComplete] = useState(false);

  useEffect(() => {
    callRestApi("tasks/", 'GET', null).then((res) => {
      if (res && res.data) {
        setTasks(res.data);
      } else {
        console.error("Failed to load tasks data.");
      }
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleFileUpload(file);
    }
    event.target.value = ''; // reset the file input
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    try {
      const uploadResponse = await axios.post(`${API_URL}/tasks/api_upload/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('File uploaded:', uploadResponse.data);

      // Start SSE after upload
      const eventSource = new EventSource(`${API_URL}/events/`);

      eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("Received message:", data.text);

          // Open the dialog on the first message
          if (!dialogOpen) {
            setDialogOpen(true);
            setIsImportComplete(false); // Reset completion status
          }

          // Append each message to importResults
          setImportResults(prevResults => prevResults + '\n' + data.text);

          // If the message indicates completion, update the import status
          if (data.text.includes("Import complete") || data.text.includes("Error")) {
            setIsImportComplete(true);
          }
      };
      
      eventSource.onerror = (error) => {
          console.error('SSE error:', error);
          eventSource.close();
      };
      
      // Kick off the import process
      fetch(`${API_URL}/import/`)
          .then(response => response.json())
          .then(data => {
              console.log("Import initiated:", data);
          })

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography color="blue" component="h2" variant="h6" sx={{ mb: 2 }}>
        Tasks
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".yaml,.json"
        id="file-input"
        style={{ visibility: 'hidden', position: 'absolute' }} 
      />
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={() => {
          document.getElementById('file-input').click();
        }}
      >
        Upload API Definition
      </Button>

      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() => {
          document.getElementById('meth-edit').click();
        }}
      >
        Edit Selected
      </Button>

      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={() => {
          document.getElementById('meth-edit').click();
        }}
      >
        Delete Selected
      </Button>

      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}> 
      <DataGrid
        autoHeight
        checkboxSelection
        columns={columns}
        rows={tasks}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        density="compact"
      />
        <Copyright sx={{ my: 4 }} />
      </Box>

      { /* Import Dialog */ }

      <ImportDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        importResults={importResults}
        isImportComplete={isImportComplete}
      />
    </Box>
  );
}

