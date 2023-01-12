import React, {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import queries from "./queries";
import Post from "./Post";
import {Routes, Route, useNavigate} from 'react-router-dom'
import {
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
    Button,
    SendIcon
  } from '@material-ui/core';

  const useStyles = makeStyles({
    button: {
      background:'#f50057',
      color: '#001411',
      fontWeight: 'bold',
      fontSize: 12,
    },
    delbutton: {
      background:'#f50057',
      color: '#001411',
      fontWeight: 'bold',
      fontSize: 12,
    },
  });



export default function MyPosts() {
  const classes = useStyles();
  const navigate = useNavigate();
    
    const { loading, error, data ,refetch} = useQuery(queries.GET_USER_POSTS, {
      fetchPolicy: `cache-and-network`
    })

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    

    const uploadNewPost = ()=>{
      navigate('/new-post');
      
  }
  
    if(data){
      return (
        <div>
        <h1>MyPosts</h1>
        <br/>
        <br/>
       
        <Button className={classes.button} variant="contained" size="large" color="secondary" onClick= {uploadNewPost }>
        Upload New Post !! 
            </Button>
        <br/>
        <br/>
        
        <Grid container  direction="column"
      justifyContent="space-evenly"
      alignItems="center">
            <Post data={data} refetch={refetch}/>   
        </Grid>  
        </div>
      )
    }
    
}