import React, { useEffect, useState } from "react";
import "./navigation.css"
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

 const Navbar = () => {
    const navigate = useNavigate();

    if(!localStorage.getItem("token")) {
        navigate("/");
    }

    const [blogData, setdata] = useState([]);
    const [isReadMore, setIsReadMore] = useState([]);
    console.log(isReadMore)



    useEffect(() => {
        fetch("https://blogappbackend-frca.onrender.com/posts",{
        // fetch("http://localhost:9000/posts",{
            headers: {
            "Authorization": localStorage.getItem("token")
        }}).then(res => {
            return res.json();
        }).then(data => {
            setdata(data)
        })
    }, [navigate])

    const logoutFunc = () => {
        console.log(("Inside logout func"));
        localStorage.removeItem("token");
        navigate("/")
    }

    function handleRead(e, i) {
        const newIsReadMore = [...isReadMore];
        newIsReadMore[i] = !newIsReadMore[i];
        setIsReadMore(newIsReadMore);
      }
      

    
    return (
        <>
            <Header/>
            <div className="navbar" style={{float: "right", marginLeft: "10px"}}>
                <span style={{paddingRight: "50px"}}>Home</span>
                <span style={{paddingRight: "50px"}} onClick={() => navigate("/createpost")}>Create</span>
                <span style={{paddingRight: "50px"}} onClick={() => logoutFunc()}>Logout</span>
            </div>
            <div className="content-container">
                {blogData.map((data, i) => {
                    isReadMore.push(true)
                    return ( 
                        isReadMore[i] ? <div className="content" key={i}>
                                <b className="title">{data.title}</b> <br/>
                                <p onClick={(e) => handleRead(e, i)}   
                                className="description">
                                    {data.description.length > 200 ?(
                                        isReadMore[i] ? 
                                        `${data.description.slice(0, 200)}...read more` : 
                                        `${data.description}...show less` ) :
                                        data.description
                                    }
                                </p>
                                <p className="author">by {data.author}</p>
                                </div> :
                        <>
                            <div className="content" key={i}>
                                <b className="title">{data.title}</b> <br/>
                                <img className="image" src={data.image} height="200px" width="300px" alt="cover" />
                                <p onClick={(e) => handleRead(e, i)}  
                                    className="description">
                                        {data.description.length > 200 ?(
                                            isReadMore[i] ? 
                                            `${data.description.slice(0, 200)}...read more` : 
                                            `${data.description}...show less` ) :
                                            data.description
                                        }
                                </p>
                                <p className="author">by {data.author}</p>
                                <p className="date" >{data.date}</p>
                                <p className="time" >{data.time}</p>
                            </div>
                        </>
                    )
                }).reverse()
                } 
            </div>
        </>
    )
}

export default Navbar;