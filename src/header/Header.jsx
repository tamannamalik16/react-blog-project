import "./Header.css";

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTItlesSm">write your world</span>
                <span className="headerTItlesLg">blog<span className="spanTitle">-share your story</span></span>
                
            </div>
            <img  className="headerImg" src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg" alt="" />
        </div>

    );
}