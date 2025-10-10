import { useContext, useState } from "react";
import "./Write.css";
import axios from "axios";
import {Context} from "../../context/Context";


export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username:user.username,
            title,
            desc,
        };
        if(file) {                      //file-> image
            const data = new FormData();                      //sara form data data me extract kr liya
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);                  //uploading image to uploads folder(storage, multer)
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.post("/posts", newPost);
            res.data && window.location.replace("/post/" + res.data._id);
        } catch (error) {}
        

    };

    return (
        <div className="write">
            {file && <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""></img> }
            
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput"><i className="writeIcon fa-solid fa-user-plus"></i></label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}></input>
                    <input type="text" placeholder="add title" className="writeInput" autoFocus={true} onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div className="writeFormGroup">
                    <textarea type="text" placeholder="Tell your story..." className="writeInput writeText" onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    );
}