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
    Button,
  } from '@material-ui/core';





export default function Images() {
    // Not sure if my bin would also have a page or get more fuinction
    const[pageNum, setPageNum] = useState(1)
    const { loading, error, data , refetch} = useQuery(queries.GET_UNSPLASH_POSTS,{
        variables: { pageNum: pageNum },
      });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)
    const GetMore = ()=>{
        console.log(pageNum)
        setPageNum(pageNum + 1)
    }
  
  
    return (
    <div>
    <h1>Explore</h1>
    <br/>
    <br/>
    <Grid container  direction="column"
  justifyContent="space-evenly"
  alignItems="center">
        <Post data={data}/>   
    </Grid>
    <Button variant="contained" onClick={GetMore} >Get More</Button>



    </div>




  )
}