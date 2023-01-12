import logo from '../Assets/logo.svg';
import './App.css';
//import Card from './Card';
import MyBin from './MyBin';
import MyPosts from './MyPosts';
import Images from './Images';
import NewPost from './NewPost';
import Popularity from './Popularity';
import {
  Card,
  Button,
  ButtonGroup,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
  } from '@material-ui/core';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  useQuery,
} from "@apollo/client";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div className="App">
    <header className="App-header">
            {/* <Navbar/> */}
            <img src={logo} className="App-logo" alt="logo" />
            <p>Binterest</p>
    </header>
    <div className= "navbar">
            
            {/* <hr/>  */}
            
            {/* <hr/> */}
            
            
            <ButtonGroup variant="text" aria-label="text button group">
  <Button><Link className='showlink' id='bin'to='/my-bin'>
              my bin
            </Link></Button>
  <Button><Link className='showlink' to='/'>
              images
            </Link> </Button>
  <Button><Link className='showlink' to='/my-posts'>
              my posts
            </Link></Button>
            <Button><Link className='showlink' to='/popularity'>
              popularity
            </Link></Button>
</ButtonGroup>
          </div>
          <div className='App-body'>
            <Routes>
              <Route path='/' element={< Images />} />
              <Route path='/my-bin' element={< MyBin />} />
              <Route path='/my-posts' element={< MyPosts />} />
              <Route path='/new-post' element={< NewPost />} />
              <Route path='/popularity' element={< Popularity />} />
            </Routes>
          </div>
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
