import React, { useState, useEffect } from "react";
import {useQuery, useMutation} from '@apollo/client';
import queries from './queries';
import {
    Card,
    Paper,
    TextField,
    Button
      
    } from '@material-ui/core';

export default function NewPost() {
    const [description, setDescription] = useState("");
    const [url, setURL] = useState("");
    const [posterName, setPosterName] = useState("");
    const [uploadImage, {data, loading, error}] = useMutation(queries.UPLOAD_POST);

    const formSubmit = (e)=>{
        e.preventDefault();
        //datavalidation        
        if(url.length === 0) alert("Please provide URL !");
        else if(posterName.length=== 0)alert("Please provide Poster Name!");
        else if(description.length=== 0)alert("Please provide Description!");
        else if(posterName.length=== 0)alert("Please provide Poster Name!");
        else {
                    uploadImage({
                        variables: {
                            description: description,
                            url: url,
                            posterName: posterName
                        }
                    }).then((res)=>{
                      setDescription("");
                    setURL("");
                    setPosterName("");
                    alert('Image Successfully Uploaded');
                    }).catch((x)=>{
                      alert(`Something went wrong:${x} `);
                    })
                    
    }
}
    
    const handleReset = () => {
        setDescription("")
        setURL("")
        setPosterName("")
    };
  
    return (
      <div>
    <h1>Add New Post</h1>
   
      <TextField
      id="URL"
        onChange={(e) => {
            setURL(e.target.value)}}
        value={url}
        label={"URL"} //optional
      />
      <TextField
      id="Description"
        onChange={(e) => {
            setDescription(e.target.value)}}
        value={description}
        label={"Description"} //optional
      />
      <TextField
      id="PosterName"
        onChange={(e) => {
            setPosterName(e.target.value)}}
        value={posterName}
        label={"Poster Name"} //optional
      />
      <Button onClick={formSubmit} type="submit">Submit</Button>
      <Button onClick={handleReset}>Reset</Button>
   
    </div>  
  )
}
