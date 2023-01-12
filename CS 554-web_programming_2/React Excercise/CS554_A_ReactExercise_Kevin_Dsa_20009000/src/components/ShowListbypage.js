import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  Button,
  ButtonGroup
} from '@material-ui/core';
import '../App.css';
import ErrorNoData from './error';


const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    border: '1px solid #1e8678',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
  },
  titleHead: {
    borderBottom: '1px solid #1e8678',
    fontWeight: 'bold'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  button: {
    color: '#1e8678',
    fontWeight: 'bold',
    fontSize: 12
  }
});


const Showlistbypage = () => {
  let {id} = useParams();
  if(id){
    
    id = parseInt(id)
  }
  const regex = /(<([^>]+)>)/gi;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(undefined);
  const [showsData, setShowsData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagenumber, setPageNumber] = useState(id);
  const [nextPageBool, setNextPageBool] = useState(false)
  const [apidata, setApiData] = useState(false)

  let card = null;
  
  const navigate = useNavigate();
 


  const Shownextpage = () =>{
    
    setPageNumber((pagenumber) => pagenumber + 1)
    
  //  navigate("/shows/page/" + pagenumber,{ replace: true })
   //window.location.href = `${props.base}/${props.first}`
  }

  const Showprevpage = () =>{
    if(pagenumber === 0) console.log("the page is zero") 
    else {
      setPageNumber((pagenumber) => pagenumber - 1)
     // navigate("/shows/page/" + pagenumber,{ replace: true })
    }
  }

  useEffect(() => {
    console.log('pagenumber useEffect fired');
    async function fetchData() {
      try {
        console.log(`Populating data for page`);
        const {data} = await axios.get(
          'http://api.tvmaze.com/shows?page=' + pagenumber
        );
        setApiData(true)
        setNextPageBool(true)
        setShowsData(data);
        setLoading(false);
      } catch (e) {
        console.log(e.response.status);
        console.log(e);
      }
      
        let futurepage = pagenumber + 1
        axios.get('http://api.tvmaze.com/shows?page=' + futurepage).then(response => {
          console.log("next page exists");
        }).catch(err => {
        if(err.response.status === 404 ) {
          setNextPageBool(false)
        }
          console.log("next page does not exist");
        })
      
    }
    if (pagenumber >= 0 || pagenumber) {
      console.log(`Pagenumber is set to ${pagenumber}`);
      navigate("/shows/page/" + pagenumber,{ replace: true })
      fetchData();
    }
  }, [pagenumber]);

  useEffect(() => {
    console.log('search useEffect fired');
    async function fetchData() {
      try {
        console.log(`in fetch searchTerm: ${searchTerm}`);
        const {data} = await axios.get(
          'http://api.tvmaze.com/search/shows?q=' + searchTerm
        );
        setSearchData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log('searchTerm is set');
      fetchData();
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };
  const buildCard = (show) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
        <Card className={classes.card} variant='outlined'>
          <CardActionArea>
            <Link to={`/shows/${show.id}`}>
              <CardMedia
                className={classes.media}
                component='img'
                image={
                  show.image && show.image.original
                    ? show.image.original
                    : noImage
                }
                title='show image'
              />

              <CardContent>
                <Typography
                  className={classes.titleHead}
                  gutterBottom
                  variant='h6'
                  component='h3'
                >
                  {show.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {show.summary
                    ? show.summary.replace(regex, '').substring(0, 139) + '...'
                    : 'No Summary'}
                  <span>More Info</span>
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  if (searchTerm) {
    card =
      searchData &&
      searchData.map((shows) => {
        let {show} = shows;
        return buildCard(show);
      });
  } else {
    card =
      showsData &&
      showsData.map((show) => {
        return buildCard(show);
      });
  }


  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div>
        <SearchShows searchValue={searchValue} />
        <br />
        <br />
        
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {pagenumber <= 0 ?  null : <Button onClick={Showprevpage}>Previous page</Button> }
        {nextPageBool === true ? <Button onClick={Shownextpage}>Next Page</Button>: null  }
        
        </ButtonGroup>
        

        <br />
        <br />
       
        <Grid container className={classes.grid} spacing={5}>
          {apidata ? card : <ErrorNoData></ErrorNoData>}
        </Grid>
      </div>
    );
  }
};

export default Showlistbypage;
