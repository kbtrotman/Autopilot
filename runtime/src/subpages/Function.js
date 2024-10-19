import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import FlowChartCanvas from './flowchart/flowChartCanvas';
import axios from 'axios';


let API_URL = 'http://backend:8000/api';


  
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
    callRestApi("tasks/", 'GET', null).then((res) => {
      this.setState({
        loading: true,
        _tasks: res.data
      });
    });
  }



  render() {
    const { loading, _tasks } = this.state;

    if (!loading) {
      return <h4>Loading...</h4>;
    }

    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography color="blue" component="h2" variant="h6" sx={{ mb: 2 }}>
            Functions
          </Typography>
            <input
              accept=".yaml"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={this.handleFileChange} // File selection event
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Load Function
              </Button>
            </label>
            <Button variant="contained" component="span">Save Function</Button>
            <Button variant="contained" component="span">Delete Function</Button>
            <Button variant="contained" component="span">Clear Canvas</Button>
        </Box>

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          {/* DataGrid and other elements */}
          <FlowChartCanvas/>
          <Copyright sx={{ my: 4 }} />
        </Box>
      </Box>
    );
  }
}
