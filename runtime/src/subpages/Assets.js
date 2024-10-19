import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ServerDialog from './dialogs/serverDialog';
import ApplianceDialog from './dialogs/applianceDialog';
import NetworkDialog from './dialogs/networkDialog';
import CloudDialog from './dialogs/cloudDialog';
import {serverColumns, applianceColumns, networkColumns, cloudColumns} from './dataGridColumns';
import axios from 'axios';

let API_URL = 'http://backend:8000/api';


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


export default class Assets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _data: [],
      value: 0, // Track the current tab
      columns: serverColumns,
      btn: "Server",
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
        endpoint = "servers/";
        columns = serverColumns;
        btn = "Server";
        break;
      case 1:
        endpoint = "appliances/";
        columns = applianceColumns;
        btn = "Appliance";
        break;
      case 2:
        endpoint = "networks/";
        columns = networkColumns;
        btn = "Network";
        break;
      case 3:
        endpoint = "clouds/";
        columns = cloudColumns;
        btn = "Cloud Vendor";
        break;
      default:
        endpoint = "servers/";
        columns = serverColumns;
        btn = "Server";
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
        endpoint = "servers/add/";
        break;
      case 1:
        endpoint = "appliances/add/";
        break;
      case 2:
        endpoint = "networks/add/";
        break;
      case 3:
        endpoint = "clouds/add/";
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
        return <ServerDialog open={isDialogOpen} handleClose={this.closeDialog} onSubmit={this.submitData} />;
      case 1:
        return <ApplianceDialog open={isDialogOpen} handleClose={this.closeDialog} onSubmit={this.submitData} />;
      case 2:
        return <NetworkDialog open={isDialogOpen} handleClose={this.closeDialog} onSubmit={this.submitData} />;
      case 3:
        return <CloudDialog open={isDialogOpen} handleClose={this.closeDialog} onSubmit={this.submitData} />;
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
            Assets
          </Typography>

          {/* Tabs */}
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={this.handleChange}
              aria-label="Permissions"
              role="navigation"
            >
              <Tab label="Servers" />
              <Tab label="Appliances" />
              <Tab label="Networks" />
              <Tab label="Clouds" />
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


