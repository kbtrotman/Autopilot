import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import './formbuilder/css/style.css';
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


export default class Groups extends React.Component {

  constructor(props){
      super(props)
      this.state = {
          loading:false,
          _tasks:[]
      }
  }

  componentDidMount(){
    //CALL RESTful API
    callRestApi("forms/",'GET',null).then( res => {
        this.setState({
            loading:true,
            _tasks: res.data
        })
    });
  }


  render() {

    const {loading, _tasks} = this.state;

    if(!loading){
        return (
                <h4>Loading...</h4>
        )
    }

    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

        <Typography color="blue" component="h2" variant="h6" sx={{ mb: 2 }}>
            Forms
          </Typography>

          <Button>Add Form</Button>
          <Button>Edit Form</Button>
          <Button>Delete Form</Button>
          <Button>Clear Canvas</Button>

        </ Box>

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        {/* cards */}

            <ReactFormBuilder />

          <Copyright sx={{ my: 4 }} />
        </Box>
      </Box>
    );
  }
}