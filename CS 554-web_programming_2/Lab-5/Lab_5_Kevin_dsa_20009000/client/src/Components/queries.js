import {gql} from '@apollo/client';


/*const GET_UNSPLASH_POSTS = gql`
    query getUnsplashPosts($pageNum: Int) {
        unsplashImages(pageNum: $pageNum) {
            id
            url
            posterName
            description
            userPosted
            binned
            numBinned
        }
    }
`;

const GET_BINNED_IMAGES = gql`
    query Query2 {
        binnedImages {
            id
            url
            posterName
            description
            userPosted
            binned
            numBinned
        }
    }
`;

const DELETE_IMAGE = gql`
    mutation Mutation3 ($id: ID!){
        deleteImage(id: $id) {
            id
            url
            posterName
            description
            userPosted
            binned
            numBinned
        }
    }
`;
*/
const GET_UNSPLASH_POSTS = gql`
    query getUnsplashPosts($pageNum: Int) {
        unsplashImages(pageNum: $pageNum) {
            id
            url
            posterName
            description
            userPosted
            binned
            
        }
    }
`;

const GET_BINNED_POSTS = gql`
    query getBinnedPosts {
        binnedImages {
            id
            url
            posterName
            description
            userPosted
            binned
            
        }
    }
`;




const GET_USER_POSTS = gql`
    query getUserPosts {
        userPostedImages {
            id
            url
            posterName
            description
            userPosted
            binned
            
        }
    }
`;

const UPLOAD_POST = gql`
    mutation Mutation1($url: String!, $description: String, $posterName: String) {
        uploadImage(url: $url, description: $description, posterName: $posterName) {
            id
            url
            posterName
            description
            userPosted
            binned
            
        }
    }
`; 

const UPDATE_IMAGE = gql`
    mutation Mutataion2($id: ID!, $url: String, $posterName: String, $description: String, $userPosted: Boolean, $binned: Boolean, $numBinned: Int) {
        updateImage(id: $id, url: $url, posterName: $posterName, description: $description, userPosted: $userPosted, binned: $binned, numBinned: $numBinned) {
            id
            url
            posterName
            description
            userPosted
            binned
            
        }
    }
`;

const DELETE_IMAGE = gql`
    mutation Mutation3 ($id: ID!){
        deleteImage(id: $id) {
            id
            url
            posterName
            description
            userPosted
            binned
            
           
        }
    }
`;


const GET_TOP_TEN_POST = gql`
    query Query4{
        getTopTenBinnedPosts {
            id
            url
            posterName
            description
            userPosted
            binned
            numBinned
        }
    }
`;

const queries = {
    GET_UNSPLASH_POSTS,
    GET_BINNED_POSTS,
    GET_USER_POSTS,
    UPLOAD_POST,
    UPDATE_IMAGE,
    DELETE_IMAGE,
    GET_TOP_TEN_POST
}

export default queries