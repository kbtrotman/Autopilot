import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Copyright from '../internals/components/Copyright';
import UploadDialog from "./uploadDialog";
import axios from 'axios';

let API_URL = 'http://backend:8000/api';


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


export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _scripts: [],
      selectedFile: null,
      dialogOpen: false,
      isUploadComplete: false,
      dialogData: {} // Add state to store dialog data
    };
  }

  componentDidMount() {
    // Fetch initial data on mount
    axios.get(`${API_URL}/scripts/`).then((res) => {
      this.setState({
        loading: true,
        _scripts: res.data,
      });
    });
  }

  // Open dialog
  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  // Close dialog
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  // Collect form data from dialog
  handleDialogSubmit = (data) => {
    this.setState({
      dialogData: data,
      dialogOpen: false,
    }, this.handleFileUpload); // Proceed to upload after closing dialog
  };

  // Handle file selection and open dialog after file is selected
  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ selectedFile: file }, this.openDialog);
    }
  };

  // Handle file upload
  handleFileUpload = async () => {
    const { selectedFile, dialogData } = this.state;

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Add additional dialog data to formData
    formData.append('arguments', dialogData.arguments);
    formData.append('product', dialogData.product);
    formData.append('description', dialogData.description);
    formData.append('notify', dialogData.notify);
    formData.append('email', dialogData.email);

    try {
      const response = await axios.post(`${API_URL}/scripts/api_upload/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully', response.data);
      this.setState({ selectedFile: null, isUploadComplete: true });
    } catch (error) {
      alert('Error uploading file', error);
      this.setState({ isUploadComplete: true });
    }
  };

  render() {
    const { loading, _tasks, dialogOpen, isUploadComplete } = this.state;

    if (!loading) {
      return <h4>Loading...</h4>;
    }

    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography color="blue" component="h2" variant="h6" sx={{ mb: 2 }}>
            Scripts
          </Typography>

          <input
            type="file"
            onChange={this.handleFileChange}
            accept=".py,.sh,.csh,.pl,ps1,vbs"
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
            Upload Script
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

          {/* Additional buttons and DataGrid can go here */}
        </Box>

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <DataGrid
            autoHeight
            checkboxSelection
            columns={columns}
            rows={this.state._scripts}
            pageSizeOptions={[10, 20, 50]}
            density="compact"
          />
          <Copyright sx={{ my: 4 }} />
        </Box>

        <UploadDialog
          open={dialogOpen}
          handleClose={this.handleDialogClose}
          isImportComplete={isUploadComplete}
          onSubmit={this.handleDialogSubmit}
        />
      </Box>
    );
  }
}