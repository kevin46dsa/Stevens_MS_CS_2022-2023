import React, {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import queries from "./queries";
import Post from "./Post";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';





export default function MyBin() {

    const { loading, error, data ,refetch} = useQuery(queries.GET_BINNED_POSTS, {
      fetchPolicy: `cache-and-network`
    })
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
  
  
    return (
    <div>
    <h1>MyBin</h1>
    <br/>
    <br/>
    <Grid container  direction="column"
  justifyContent="space-evenly"
  alignItems="center">
        <Post data={data}refetch={refetch}/>   
    </Grid>

    </div>




  )
}
