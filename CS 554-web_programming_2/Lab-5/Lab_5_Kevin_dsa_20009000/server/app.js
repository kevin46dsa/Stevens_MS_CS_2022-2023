// unsplash api 
const { createApi, _internals } = require('unsplash-js');
const nodeFetch = require('node-fetch');
const dataValidation = require("./dataValidation")
//Apollo Graph QL
const {ApolloServer, gql} = require('apollo-server');
// Redis
const redis = require('redis');
const redisClient = redis.createClient();
redisClient.connect().then(() => {});
// UUID
const uuid = require('uuid');


const unsplash = createApi({
    accessKey: 'QCUGgvzwiZEpb0QHFNi73CjgOvMWQDg9zp1pP6u_aoc',
    fetch: nodeFetch,
  });

  const typeDefs = gql`
    
  type Query {
      unsplashImages(pageNum: Int): [ImagePost]
      binnedImages: [ImagePost]
      userPostedImages: [ImagePost] 
      getTopTenBinnedPosts: [ImagePost]  
  }

  type ImagePost {
      id: ID!
      url: String!
      posterName: String!
      description: String
      userPosted: Boolean!
      binned: Boolean!
      numBinned: Int!
  }
 
  type Mutation{
      uploadImage(url: String!, description: String, posterName: String): ImagePost
      updateImage(id: ID!, url: String, posterName: String, description: String, userPosted: Boolean, binned: Boolean, numBinned: Int): ImagePost
      deleteImage(id: ID!): ImagePost
  }
`;

const resolvers = {
    Query:{
        unsplashImages: async (_,args)=>{
            
           
                if(!args.pageNum){
                    args.pageNum = 1
                    
                }

                let data = await unsplash.photos.list({ page: args.pageNum, perPage: 10 })
                
                if(data.response.results.length == 0)  {
                    console.log("Error no Images");
                    return [];
                }
                data = data.response.results
                
                const imagePostData = data.map(async (post) => {
                    
                    let description = post.description ? post.description: "No Description"
                    
                    // add logic to check if the post is binned or no 
                    let binned = await redisClient.hExists("userBin", post.id)
                    binned = binned ? true:false
    
    
                    let restructurePost = {
                        id: post.id,
                        url: post.urls.regular,
                        posterName: post.user.username,
                        description: description,
                        userPosted: false,
                        binned: binned
                    } 
    
                    return restructurePost
    
                })
    
                return imagePostData
            
            

        },
        binnedImages: async ()=>{
            // can do this with hget all no needtocreate redis list
            //const binList = await redisClient.lRange("myBinList", 0, 500)
            const binnedPosts = await redisClient.hGetAll("userBin");
            let binnedPostsList = []

            for (const [key, value] of Object.entries(binnedPosts)) {
               
                binnedPostsList.push(JSON.parse(value))
              }


            return binnedPostsList
        },
        userPostedImages: async ()=>{
            const userPosts = await redisClient.hGetAll("userPosts");
            let userPostList = []

            for (const [key, value] of Object.entries(userPosts)) {
               
                userPostList.push(JSON.parse(value))
              }


            return userPostList
        },
        getTopTenBinnedPosts: async ()=>{},
    },
    Mutation:{
        uploadImage: async (_,args)=>{
           
                
                
            const description = dataValidation.checkString(args.description) 
            const url = dataValidation.checkURL(args.url)
            const posterName = dataValidation.checkString(args.posterName) 
            let id = uuid.v4()
            const newPost = {
                id: id,
                url: url,
                posterName: posterName,
                description: description,
                userPosted: true,
                binned: false
            }

            await redisClient.hSet("userPosts",id, JSON.stringify(newPost))
            // not sure if i need to make a list  

            return newPost
           

        },
        updateImage: async (_,args)=>{

            const postID = args.id
            // check if the post exists in bin
            const existsInBin = await redisClient.hExists("userBin", postID)
            let binned = existsInBin ? false:true // if existsInBin then set binned to false else true
            let userPostedBool = await redisClient.hExists("userPosts", postID)
            const updatedPost = {
                id: args.id,
                url: args.url,
                posterName: args.posterName,
                description: args.description,
                userPosted: args.userPosted,
                binned: binned
            }

            if(existsInBin){
                // remove from my bin database cache 
                await redisClient.hDel("userBin",postID)
                if(userPostedBool) await redisClient.hSet("userPosts", postID, JSON.stringify(updatedPost))  

            }
            else{
                    // add to my bin database cache 
                    await redisClient.hSet("userBin", postID, JSON.stringify(updatedPost))  
                    if(userPostedBool) await redisClient.hSet("userPosts", postID, JSON.stringify(updatedPost))  

            }

            return updatedPost


        },
        deleteImage: async (_,args)=>{

            const postID = args.id
            //const usersImage = await redisClient.hExists("userPosts", postID)
            const usersImage = await redisClient.hGet("userPosts", postID)
            
            if(usersImage){
            await redisClient.hDel("userPosts",postID)
            //check if post is in the binif exists del it from bin as well
            const existsInBin = await redisClient.hExists("userBin", postID)
            if(existsInBin) await redisClient.hDel("userBin",postID)
            return JSON.parse(usersImage)
            }
            else return null

        }
    }




}




const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});

