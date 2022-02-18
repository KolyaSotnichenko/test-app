import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

//firebase
import auth from '../../firebase'

const columns = [
    {field: 'id', headerName: 'ID'},
    {field: 'title', headerName: 'Title', width: 300},
]

function Home() {

  const [email, setEmail] = useState('')
  const [tableData, setTableData] = useState([])

  const navigate = useNavigate()

  const data = [
    { year: '1950', population: Math.random(3.0) },
    { year: '1960', population: Math.random(4.0) },
    { year: '1970', population: Math.random(4.0) },
    { year: '1980', population: Math.random(3.0) },
    { year: '1990', population: Math.random(4.0) },
    { year: '2000', population: Math.random(6.5) },
    { year: '2010', population: Math.random(7.0) },
  ];

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if(authToken) navigate('/analytics')

    if (!authToken) navigate('/')
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
        setEmail(user.email ?? '')
    })
  }, [])

  useEffect(() => {
    fetchCharacters()

    return () => {}
  }, [])

  const fetchCharacters = async () => {

    const url = "https://jsonplaceholder.typicode.com/photos"

    try {
        const response = await fetch(url)
        const json = await response.json()
        setTableData(json)
    } catch (error) {
        console.log(error)
    }
  }

  const signOut = () => {
      sessionStorage.removeItem('Auth Token')
      navigate('/')
  }

  return (
      <Container component='main' maxWidth="xl">

        <Typography component="h1" variant="h6">
            {email}
        </Typography>
        <Button
            type="button"
            variant="contained"
            onClick={signOut}
            sx={{ mt: 3, mb: 2}}
        >
            Exit
        </Button>
        <Grid container zeroMinWidth spacing={2}>
            <Grid item xs={12} md={6}>
                    <Chart
                    data={data}
                    >
                    <ArgumentAxis />
                    <ValueAxis />
                
                    <BarSeries valueField="population" argumentField="year" />
                    </Chart>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{height: 500}}>
                    <DataGrid 
                        rows={tableData}
                        columns={columns}
                        pageSize={10}
                    />
                </Box>
            </Grid>
        </Grid>
      </Container>
  )
}

export default Home