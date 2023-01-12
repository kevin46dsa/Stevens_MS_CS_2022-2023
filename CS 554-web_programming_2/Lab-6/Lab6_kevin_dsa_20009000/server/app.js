// Pokemon api 

// image link 
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png


//const dataValidation = require("./dataValidation")
//Apollo Graph QL
const {ApolloServer, gql, UserInputError} = require('apollo-server');
const { GraphQLError } = require('graphql');
// Redis
const redis = require('redis');
const redisClient = redis.createClient();
redisClient.connect().then(() => {});

const axios = require('axios');

function checkNumber(number){  
    if(!number) throwerror("Input must be provided")
    if(number<0) throwerror("Input cannot be negative number")
    number = number.toString()
    if (number.trim().length === 0)
    throwerror('Input cannot be just spaces');
    number = Number(number) // Convert string to Int
	if(!number)	throwerror("Input Must Be a Number");
    if(!Number.isInteger(number)) throwerror(" Input Must Be an Integer")
    if (typeof number !== "number") throwerror('Input must be a number');
}

function throwerror(e){
    throw new GraphQLError(e, {
        extensions: {
          code: 'SOMETHING_BAD_HAPPENED',
          http: {
            status: 404,
          },
        },
      });
}

  const typeDefs = gql`
    
  type Query {
      pokemonPage(pageNum: Int): PokemonPageList
      pokemonById(id: Int): Pokemon
     
  }

    type PokemonPageList {
        next: String
        previous: String
        results: [PokemonPage]
    }

  type Pokemon {
      id: ID!
      pokemonName: String!
      type: [Types]
      height: Int
      weight: Int
      base_experience: Int
      image: String!

  }

  type Types {
        name: String! 
        url: String!
  }

  type PokemonPage {
    id: ID!
    pokemonName: String!
    image: String
    
}

`;

const resolvers = {
    Query:{
        pokemonPage: async (_,args)=>{
            
            let page = undefined

            checkNumber(args.pageNum)
           
                if(!args.pageNum){
                    page = 0
                    
                }
                else page = args.pageNum - 1

                
                // logic to check if page exists in cache
                const Exists = await redisClient.hGet('PageNumber', `${page}`)
                
                if(Exists) {
                    let pokemonPageData = await redisClient.hGet("PageNumber", `${page}`)
                    return JSON.parse(pokemonPageData)
                } 
                else {
                    let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`,{headers:{'accept-encoding':'*'}})
                
                if(data.results.length == 0)  {
                    throw new GraphQLError('No Data', {
                        extensions: {
                          code: 'SOMETHING_BAD_HAPPENED',
                          http: {
                            status: 404,
                          },
                        },
                      });
                }
                let results = data.results
                
                const pokemonPageData = results.map((pokemon) => {
                    
                    let [pokemonID] = pokemon.url.split('/').slice(-2,-1)
                    let pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`
                    
                    // add logic to check if the post is binned or no 
                    //let binned = await redisClient.hExists("userBin", post.id)
                    //binned = binned ? true:false
    
    
                    let restructurePokemonPage = {
                        id: pokemonID,
                        pokemonName: pokemon.name,
                        image: pokemonImage
                    } 
    
                    return restructurePokemonPage
    
                })

                data.results = pokemonPageData
                delete data.count;
                // logic if page does not exist in cache

                await redisClient.hSet("PageNumber",page, JSON.stringify(data))
    
                return data
                }


        },
        pokemonById: async (_,args)=>{
            
            //const binnedPosts = await redisClient.hGetAll("userBin");
            //let binnedPostsList = []
            checkNumber(args.id)
            
            // data validation 


            //logic to check if pokemon is in cache
            const Exists = await redisClient.hGet('Pokemon', `${args.id}`)
            if(Exists) {
                let pokemonData = await redisClient.hGet('Pokemon', `${args.id}`)
                    return JSON.parse(pokemonData)
            }
            else{
                // logic if pokemon is not in cache
                let data = undefined
            try{
                data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${args.id}`,{headers:{'accept-encoding':'*'}})
            }
            catch(e){
                throwerror("No Data")  
            }    
            //let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${args.id}`,{headers:{'accept-encoding':'*'}})
                
            // check if there is data in this route axios call
            data = data.data
            let types = data.types.map((type) => {
                let typenames = {
                    name: type.type.name,
                    url: type.type.url
                }
                return typenames
            });

            let restructurePokemonData = {
                id: data.id,
                pokemonName: data.name,
                type: types,
                height: data.height,
                weight: data.weight,
                base_experience: data.base_experience,
                image: data.sprites.front_default

            }

            await redisClient.hSet("Pokemon",`${args.id}`, JSON.stringify(restructurePokemonData))
            return restructurePokemonData
            }

            
        },
    },
   
    }


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});

