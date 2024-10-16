import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
    width: 100,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
    editable: true,
  },
  {
    field: 'type',
    headerName: 'Product Type',
    sortable: true,
    width: 50,
  },
  {
    field: 'input',
    headerName: 'Input JSON',
    sortable: true,
    width: 200,
  },
  {
    field: 'output',
    headerName: 'Output JSON',
    sortable: true,
    width: 200,
  },
  {
    field: 'send',
    headerName: 'Product Type',
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
  const headers = { 'Accept': 'application/json' };
  if (sessionToken) {
    headers['Authorization'] = `Token ${sessionToken}`;
  } else {
    console.warn('No session token found in storage. This request might fail if authorization is required.');
  }
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
    headers
  }).catch(err => {
    console.error('Request failed:', err);
  });
}

export default class Permissions extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      _tasks: [],
      value: 0, // Initialize value to track the current tab
    };
  }

  componentDidMount(){
    // Call RESTful API
    callRestApi("users/",'GET',null).then( res => {
      this.setState({
        loading: true,
        _tasks: res.data,
      });
    });
  }

  // Handle tab change
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { loading, _tasks, value } = this.state;

    if (!loading) {
      return <h4>Loading...</h4>;
    }

    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography color="blue" component="h2" variant="h6" sx={{ mb: 2 }}>
            Permissions
          </Typography>

          {/* Tabs */}
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={this.handleChange}
              aria-label="Permissions"
              role="navigation"
            >
              <Tab label="Users" />
              <Tab label="Groups" />
              <Tab label="Tenants" />
              <Tab label="LDAP/AD Mapping" />
            </Tabs>
          </Box>

          {/* Button Group */}
          <ButtonGroup
            disableElevation
            variant="contained"
            color='inherit'
            size='small'
            sx={{ mt: 2 }}
          >
            <Button>Add Task</Button>
            <Button>Edit Selected</Button>
            <Button>Delete Selected</Button>
          </ButtonGroup>
        </Box>

        {/* Data Grid */}
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, mt: 3 }}>
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
          />
          <Copyright sx={{ my: 4 }} />
        </Box>
      </Box>
    );
  }
}
