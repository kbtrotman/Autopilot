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


// pri_group = models.CharField(max_length=100, name="pri_grp")
// ad_groups = models.CharField(max_length=100, name="ad_grps")
// role = models.CharField(max_length=100, name="role")
// remote = models.BooleanField(default=False)
// dashboard = models.CharField(max_length=25, name="dashboard")
// favorites = models.CharField(max_length=100)


const columns = [
  {
    field: 'email',
    headerName: 'E-mail',
    width: 150,
    editable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 100,
    editable: true,
  },
  {
    field: 'is_staff',
    headerName: 'Staff?',
    type: 'boolean',
    width: 20,
    editable: true,
  },
  {
    field: 'is_admin',
    headerName: 'Admin?',
    type: 'boolean',
    sortable: true,
    width: 20,
  },
  {
    field: 'is_active',
    headerName: 'Enabled?',
    type: 'boolean',
    sortable: true,
    width: 20,
  },
  {
    field: 'is_tenant_admin',
    headerName: 'Tenant Admin?',
    type: 'boolean',
    sortable: true,
    width: 20,
  },
  {
    field: 'tenant',
    headerName: 'Tenant',
    sortable: true,
    width: 50,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'boolean',
    sortable: true,
    width: 50,
  },
  {
    field: 'location',
    headerName: 'Location',
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
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _data: [],
      value: 0, // Track the current tab
    };
  }

  componentDidMount() {
    // Load data for the initial tab on mount
    this.loadDataForTab(0);
  }

  // Function to load data based on the selected tab
  loadDataForTab = (tabIndex) => {
    this.setState({ loading: false });

    // Determine endpoint based on tab index
    let endpoint;
    switch (tabIndex) {
      case 0:
        endpoint = "users/";
        break;
      case 1:
        endpoint = "groups/";
        break;
      case 2:
        endpoint = "tenants/";
        break;
      case 3:
        endpoint = "ldap/";
        break;
      default:
        endpoint = "users/"; // Default to users if no match
    }

    // Make the API call
    callRestApi(endpoint, 'GET', null).then((res) => {
      if (res && res.data) {
        this.setState({
          loading: true,
          _data: res.data,
        });
      } else {
        console.error(`Failed to load data for ${endpoint}`);
        this.setState({ loading: true, _data: [] });
      }
    }).catch(err => {
      console.error('Error fetching data:', err);
      this.setState({ loading: true, _data: [] });
    });
  };

  // Handle tab change
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    this.loadDataForTab(newValue);  // Load the corresponding data when the tab changes
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
            color="inherit"
            size="small"
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
            rows={this._data}
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
