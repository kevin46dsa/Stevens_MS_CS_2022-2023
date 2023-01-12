import React, {useEffect, useState} from "react";
import {
  Card,
  Button,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
  } from '@material-ui/core';
  import noImage from '../Assets/download.jpeg';
  import {useMutation} from '@apollo/client';
  import queries from "./queries";

  const useStyles = makeStyles({
    button: {
      background:'#f50057',
      color: '#001411',
      fontWeight: 'bold',
      fontSize: 12,
    },
    delbutton: {
      background:'#f2f2f2',
      color: '#001411',
      fontWeight: 'bold',
      fontSize: 12,
    },
  });




export default function Post(props) {
  //const[userPost, setUserPost] = useState(false)
  let card = null
  const [delImage] = useMutation(queries.DELETE_IMAGE, {onCompleted: props.refetch});
  const [binUnbinIamge] = useMutation(queries.UPDATE_IMAGE, {onCompleted: props.refetch});
  const classes = useStyles();
  

	const buildCard= (post) =>{
		return(  
		
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8} key={post.id}>
        <Card  variant='outlined'>
          
			<CardContent>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='h2'
                >
                  {`${post.description} by: ${post.posterName}`}
                </Typography>
              </CardContent>
			  
			  <CardMedia
                component='img'
                image={post.url ? post.url: noImage}
                title='post image'
              />
              <br/>
<br/>

{post.userPostPage? 
<div>{post.binned ? <Button className={classes.button} variant="contained" size="large" color="secondary" onClick={(e)=>{
                              e.preventDefault();
                              binUnbinIamge({
                                  variables: {
                                      id: post.id,
                                      url: post.url,
                                      description: post.description,
                                      posterName: post.posterName,
                                      userPosted: post.userPosted,
                                      binned: post.binned,
                                  }
                              })
                          }}>
  Remove From Bin
</Button>:<Button className={classes.button} variant="contained" size="large" color="secondary"onClick={(e)=>{
                              e.preventDefault();
                              binUnbinIamge({
                                  variables: {
                                      id: post.id,
                                      url: post.url,
                                      description: post.description,
                                      posterName: post.posterName,
                                      userPosted: post.userPosted,
                                      binned: post.binned,
                                  }
                              })
                          }}>
  Add To Bin
</Button>}<Button className={classes.delbutton} color="secondary" onClick={(e)=>{
                                e.preventDefault()
                                delImage({
                                    variables: {
                                        id: post.id
                                    }
                                }); 
                            }}>
            Delete Post
            </Button>
            </div>: post.binned ? <Button className={classes.button} variant="contained" size="large" color="secondary"onClick={(e)=>{
                              e.preventDefault();
                              binUnbinIamge({
                                  variables: {
                                      id: post.id,
                                      url: post.url,
                                      description: post.description,
                                      posterName: post.posterName,
                                      userPosted: post.userPosted,
                                      binned: post.binned,
                                  }
                              })
                          }}>
  Remove From Bin
</Button>:<Button className={classes.button} variant="contained" size="large" color="secondary" onClick={(e)=>{
                    e.preventDefault();
                    binUnbinIamge({
                        variables: {
                            id: post.id,
                            url: post.url,
                            description: post.description,
                            posterName: post.posterName,
                            userPosted: post.userPosted,
                            binned: post.binned,
                        }
                    })
                }} >
  Add To Bin
</Button>}
         
<br/>
<br/>
        </Card>
        </Grid>  
		)
	} 




	// create cards 
	if(props.data && props.data.unsplashImages){ 
		console.log(props.data.unsplashImages)
		card = props.data.unsplashImages.map((post)=>{
      return buildCard(post)
		})
		
	}
	else if(props.data.binnedImages){ 
		console.log(props.data.binnedImages)
		card = props.data.binnedImages.map((post)=>{
			return buildCard(post)
		})
	}
  else if(props.data.userPostedImages){
    { 
      console.log(props.data.userPostedImages)
      //setUserPost(true)
      card = props.data.userPostedImages.map((post)=>{
        let postDestructure = {...post}
        postDestructure.userPostPage = true
        return buildCard(postDestructure)
      })
    }
  }


	return(
			 card
		
	)

}
