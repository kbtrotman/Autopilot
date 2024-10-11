import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
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

  
function callRestApi(endpoint, method = 'GET', body) {
  // Retrieve the session token from sessionStorage
  const sessionToken = window.sessionStorage.getItem('sessionToken');
  
  // Create the headers object
  const headers = {
      'Accept': 'application/json'  // You can add other headers here as needed
  };
  
  // Include the Authorization token if available
  if (sessionToken) {
      headers['Authorization'] = `Token ${sessionToken}`;
  } else {
      console.warn('No session token found in storage. This request might fail if authorization is required.');
  }

  // Make the axios call with the dynamic headers
  return axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data: body,
      headers  // Pass the headers object here
  }).catch(err => {
      console.error('Request failed:', err);
  });
}


export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _tasks: [],
      selectedFile: null // File state for file selection
    };
  }

  componentDidMount() {
    // CALL RESTful API
    callRestApi("scripts/", 'GET', null).then((res) => {
      this.setState({
        loading: true,
        _tasks: res.data
      });
    });
  }

  // Function to handle file selection
  handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ selectedFile: file }, () => {
        // Call the file upload function right after setting the file state
        this.handleFileUpload();
      });
    }
  };

  // Function to handle file upload
  handleFileUpload = async () => {
    const { selectedFile } = this.state;

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://backend:8000/api/scripts/api_upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully', response.data);
      // Clear the selected file after successful upload
      this.setState({ selectedFile: null });
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  render() {
    const { loading, _tasks } = this.state;

    if (!loading) {
      return <h4>Loading...</h4>;
    }

    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography color="blue" component="h2" variant="h6" sx={{ mb: 2 }}>
            Scripts
          </Typography>

          <ButtonGroup disableElevation variant="contained" color="inherit" size="small">
            <input
              accept=".yaml"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={this.handleFileChange} // File selection event
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                New API
              </Button>
            </label>
            <Button>Edit Selected</Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          {/* DataGrid and other elements */}
          <DataGrid
            autoHeight
            checkboxSelection
            columns={columns}
            rows={_tasks}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20, 50]}
            density="compact"
            slotProps={{
              filterPanel: {
                filterFormProps: {
                  logicOperatorInputProps: { variant: 'outlined', size: 'small' },
                  columnInputProps: { variant: 'outlined', size: 'small', sx: { mt: 'auto' } },
                  operatorInputProps: { variant: 'outlined', size: 'small', sx: { mt: 'auto' } },
                  valueInputProps: {
                    InputComponentProps: {
                      variant: 'outlined',
                      size: 'small',
                    },
                  },
                },
              },
            }}
          />
          <Copyright sx={{ my: 4 }} />
        </Box>
      </Box>
    );
  }
}