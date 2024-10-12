import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import axios from 'axios';
import ImportDialog from './importDialog';


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
  const sessionToken = window.sessionStorage.getItem('sessionToken');
  
  const headers = {
    'Accept': 'application/json',
  };
  
  if (sessionToken) {
    headers['Authorization'] = `Token ${sessionToken}`;
  } else {
    console.warn('No session token found in storage. This request might fail if authorization is required.');
  }

  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
    headers,
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
      selectedFile: null,
      dialogOpen: false,  // State for dialog visibility
      importResults: '',  // State for dialog content
    };
  }

  componentDidMount() {
    callRestApi("tasks/", 'GET', null).then((res) => {
      this.setState({
        loading: true,
        _tasks: res.data,
      });
    });
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ selectedFile: file }, () => {
        this.handleFileUpload();
      });
    }
  };

  handleFileUpload = async () => {
    const { selectedFile } = this.state;
  
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const uploadResponse = await axios.post('http://backend:8000/api/tasks/api_upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      console.log('File uploaded:', uploadResponse.data);
  
      // Start SSE after upload
      const eventSource = new EventSource('http://backend:8000/api/import-log/');
      const messages = [];
  
      eventSource.onmessage = (event) => {
        const newMessage = event.data;
        messages.push(newMessage);
        this.setState({ importResults: messages.join("\n"), dialogOpen: true });
      };
  
      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        eventSource.close();
      };
  
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { loading, _tasks, dialogOpen, importResults } = this.state;

    if (!loading) {
      return <h4>Loading...</h4>;
    }

    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography color="blue" component="h2" variant="h6" sx={{ mb: 2 }}>
            Tasks
          </Typography>

          <ButtonGroup disableElevation variant="contained" color="inherit" size="small">
            <input
              accept=".yaml"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={this.handleFileChange}
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

        {/* Import Dialog */}
        <ImportDialog
          open={dialogOpen}
          handleClose={this.handleDialogClose}
          importResults={importResults}
        />
      </Box>
    );
  }
}
