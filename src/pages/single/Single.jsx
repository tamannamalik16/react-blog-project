import "./Single.css";
import SideBar from "../../sidebar/SideBar.jsx";
import SinglePost from "../../singlePost/SinglePost.jsx";


export default function Single() {
    return (
        <div className="single">
            <SinglePost />
            <SideBar />
        </div>

    );
}