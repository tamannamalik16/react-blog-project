import { Link, useLocation } from "react-router-dom";
import "./SinglePost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2];          // to get id of particular post from
    const [post, setPost] = useState({});                // post array to store single post info like author. desc, title
    const PF = "http://localhost:5000/images/"
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);               // for update btn, when update btn clicked, hi , p tag all converted to input  to update the text

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();

    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, { data: { username: user.username } });
            window.location.replace("/");
        } catch (error) {

        }

    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            // window.location.reload();
            setUpdateMode(false)
        } catch (err) { }
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img
                        className="singleImg"
                        src={PF + post.photo}
                        alt=""></img>
                )}

                {updateMode ? <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="singlePostTitleInput" autoFocus /> : (
                    <h2 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                            </div>
                        )}

                    </h2>
                )}


                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} /> : (
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                )}
                {updateMode && (
                    <button className="singlePostBtn" onClick={handleUpdate}>Update</button>
                )}
                


            </div>
        </div>
    );

}