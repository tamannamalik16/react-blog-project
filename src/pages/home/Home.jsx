import "./Home.css";
import Header from "../../header/Header.jsx";
import Posts from "../../posts/Posts.jsx";
import SideBar from "../../sidebar/SideBar.jsx";
import API from "../../api.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function Home() {
    const [ posts, setPosts ] = useState([]);
    const {search} = useLocation();

    useEffect(() =>{
        const fetchPosts = async () => {
            const res = await API.get("/posts");
            // console.log(res);
            setPosts(res.data);
            
        }
        fetchPosts()

    }, [search]);

    return(
        <>
        <Header />
        <div className="home">
            <Posts posts={posts} />
            <SideBar />
    
        </div>
        </>
    );
}