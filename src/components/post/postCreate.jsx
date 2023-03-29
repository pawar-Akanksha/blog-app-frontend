import React, { useState } from "react";
import Header from "../header/header";
import "./postCreate.css"
import { useNavigate } from 'react-router-dom';
import fetching from '../../images/fetch.gif'

const CreatePost = () => {
  
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(title, image, author, description);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(("In handleSubmit>>> "));

    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);
    // formData.append('author', author);

    // try{
        await fetch('https://blogappbackend-frca.onrender.com/posts', {
        // await fetch('http://localhost:9000/posts', {
      method: 'POST',
      headers: {
        "Authorization":localStorage.getItem('token')
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setLoading(false);
        navigate("/posts")
      }).catch(e => {
        setLoading(false);
        console.log("err>>>> " + e);
      });

      // navigate("/posts")

    // }catch (e) {
    //     console.log("error: " + e)

    // }
      
  
  };

  const logoutFunc = () => {
    console.log(("Inside logout func"));
    localStorage.removeItem("token");
    navigate("/")
  }



    return (
        <>
            <Header/>
            <div className="navbar" style={{float: "right", marginLeft: "10px"}}>
                <span style={{paddingRight: "50px"}} onClick={() => navigate("/posts")}>Home</span>
                <span style={{paddingRight: "50px"}} onClick={() => navigate("/createpost")}>Create</span>
                <span style={{paddingRight: "50px"}} onClick={() => logoutFunc()}>Logout</span>
            </div>
            <div className="create-post-container">
              {loading ? <img className="loader" src={fetching} alt='loading...' /> : ''}
                {/* <section className="post-create-box">
                    <div>
                <label >Title:  
                    <input className="create-text" type="text" onChange={(e) => setTitle(e.target.value)} />
                </label> <br/>
                </div>
                 <div>
                <label >photo:  
                    <input className="create-img" type="file" onChange={(e) =>  setImage(e.target.files[0])} />
                </label> <br/>
                </div>
                 <div>
                <label >Description:  
                    <input className="create-desc" type="text" onChange={(e) =>  setDescription(e.target.value)} />
                </label> <br/>
                <label >Author: {localStorage.getItem('name')}
                </label> <br/>
                <button className="create-btn" onClick={(e) => handleSubmit(e)}>Create</button>
                </div>
                 
                </section> */}

<section className="post-create-box">
    <table>
        <tr>
            <td>
                <label>Title:</label>
            </td>
            <td>
                <input className="create-text" type="text" onChange={(e) => setTitle(e.target.value)} />
            </td>
        </tr>
        <tr>
            <td>
                <label>Photo:</label>
            </td>
            <td>
                <input className="create-img" type="file" onChange={(e) =>  setImage(e.target.files[0])} />
            </td>
        </tr>
        <tr>
            <td>
                <label>Description:</label>
            </td>
            <td>
                <input className="create-desc" type="text" onChange={(e) =>  setDescription(e.target.value)} />
            </td>
        </tr>
        <tr>
            <td>
                <label>Author:</label>
            </td>
            <td>
                {localStorage.getItem('name')}
            </td>
        </tr>
        <tr>
            <td colSpan="2">
                <button className="create-btn" onClick={(e) => handleSubmit(e)}>Create</button>
            </td>
        </tr>
    </table>
</section>
            </div>
            
        </>
    )
}

export default CreatePost;