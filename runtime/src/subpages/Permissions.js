import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import UserDialog from './dialogs/userDialog';
import GroupDialog from './dialogs/groupDialog';
import TenantDialog from './dialogs/tenantDialog';
import LDAPDialog from './dialogs/ldapDialog';
import {userColumns, groupColumns, tenantColumns, ldapColumns} from './dataGridColumns';
import axios from 'axios';

let API_URL = 'http://backend:8000/api';


function callRestApi(endpoint, method, body) {
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
      columns: userColumns,
      btn: "User",
      isDialogOpen: false, // Track whether the dialog is open
    };
  }

  componentDidMount() {
    this.loadDataForTab(0); // Load data for the initial tab on mount
  }

  loadDataForTab = (tabIndex) => {
    this.setState({ loading: false });

    // Determine endpoint, columns, and button label based on tab index
    let endpoint;
    let columns;
    let btn;

    switch (tabIndex) {
      case 0:
        endpoint = "users/";
        columns = userColumns;
        btn = "User";
        break;
      case 1:
        endpoint = "groups/";
        columns = groupColumns;
        btn = "Group";
        break;
      case 2:
        endpoint = "tenants/";
        columns = tenantColumns;
        btn = "Tenant";
        break;
      case 3:
        endpoint = "ldap/";
        columns = ldapColumns;
        btn = "Mapping";
        break;
      default:
        endpoint = "users/";
        columns = userColumns;
        btn = "User";
    }

    // Make the API call
    callRestApi(endpoint, 'GET', null).then((res) => {
      this.setState({
        loading: true,
        _data: res?.data || [],
        columns: columns,
        btn: btn,
      });
    }).catch(err => {
      console.error('Error fetching data:', err);
      this.setState({ loading: true, _data: [] });
    });
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    this.loadDataForTab(newValue); // Load the corresponding data when the tab changes
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  // New function to handle form submissions
  submitData = (formData) => {
    let endpoint;
    switch (this.state.value) {
      case 0:
        endpoint = "users/add/";
        break;
      case 1:
        endpoint = "groups/add/";
        break;
      case 2:
        endpoint = "tenants/add/";
        break;
      case 3:
        endpoint = "ldap/map";
        break;
      default:
        return;
    }

    // Use callRestApi to post the form data
    callRestApi(endpoint, 'POST', formData).then(() => {
      this.closeDialog();
      this.loadDataForTab(this.state.value); // Reload the data to reflect the new item
    }).catch((error) => {
      console.error('Error adding new item:', error);
    });
  };

  renderDialog = () => {
    const { value, isDialogOpen } = this.state;

    switch (value) {
      case 0:
        return <UserDialog open={isDialogOpen} handleClose={this.closeDialog} onSubmit={this.submitData} />;
      case 1:
        return <GroupDialog open={isDialogOpen} handleClose={this.closeDialog} onSubmit={this.submitData} />;
      case 2:
        return <TenantDialog open={isDialogOpen} handleClose={this.closeDialog} onSubmit={this.submitData} />;
      case 3:
        return <LDAPDialog open={isDialogOpen} handleClose={this.closeDialog} onSubmit={this.submitData} />;
      default:
        return null;
    }
  };

  render() {
    const { loading, _data, columns, value, btn } = this.state;

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
            <Button onClick={this.openDialog}>Add {btn}</Button>
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
            rows={_data}
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

        {/* Dialog - Renders conditionally based on tab */}
        {this.renderDialog()}
      </Box>
    );
  }
}
