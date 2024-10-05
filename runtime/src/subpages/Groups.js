import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import axios from 'axios';


let API_URL = 'http://localhost:8000/api';

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
    return axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
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
    callRestApi("groups/",'GET',null).then( res => {
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
            Tasks
          </Typography>


        <ButtonGroup
          disableElevation
          variant="contained"
          color='inherit'
          size='small'
        >
          <Button>Add Task</Button>
          <Button>Edit Selected</Button>
          <Button>Delete Selected</Button>
        </ButtonGroup>

        </ Box>

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        {/* cards */}

          <DataGrid
            autoHeight
            checkboxSelection
            container spacing={2} 
            columns={columns}
            rows={_tasks}
            resizablecolumns={true}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            density="compact"
            slotProps={{
              filterPanel: {
                filterFormProps: {
                  logicOperatorInputProps: {
                    variant: 'outlined',
                    size: 'small',
                  },
                  columnInputProps: {
                    variant: 'outlined',
                    size: 'small',
                    sx: { mt: 'auto' },
                  },
                  operatorInputProps: {
                    variant: 'outlined',
                    size: 'small',
                    sx: { mt: 'auto' },
                  },
                  valueInputProps: {
                    InputComponentProps: {
                      variant: 'outlined',
                      size: 'small',
                    },
                  },
                },
              },
            }} />

          <Copyright sx={{ my: 4 }} />
        </Box>
      </Box>
    );
  }
}
