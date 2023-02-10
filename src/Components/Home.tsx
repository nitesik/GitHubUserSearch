import { ReactElement, SyntheticEvent, useState } from "react";
import "./Styles.css"
import sun from "./Images/icon-sun.svg";
import moon from "./Images/icon-moon.svg";
import company from "./Images/icon-company.svg";
import website from "./Images/icon-website.svg";
import location from "./Images/icon-location.svg";
import twitter from "./Images/icon-twitter.svg";
import search from "./Images/icon-search.svg";

function Home() : ReactElement {

  const [username, setUsername]  = useState("");
  const [profileData, setProfileData] : any = useState({});
  const [profileNotFound, setProfileNotFound] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false)
  
  async function getUser() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    
    setProfileNotFound(!response.ok);
    if (response.ok) {
      setProfileData(data);
      setDataLoaded(true);
    }

    } catch (e) {
      setProfileNotFound(true);  
    }
    
    
    
  }

  function submitHandler(event : SyntheticEvent) {
    event.preventDefault();
    getUser();
    
  }

  return (
    <section className={`container ${darkMode ? "dark" : "light"}`}>
      <div className="inner-container">
        <nav>
          <div className="title">devfinder</div>
          <div className="toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <div><div className="text">LIGHT</div>
            <img src={sun} alt="toggle" /></div> : <div> <div className="text">DARK</div>
            <img src={moon} alt="toggle" /> </div>}
          </div>
        </nav>
        <form onSubmit={submitHandler} className="search">
          <div className="left">
            <label htmlFor="search"><img src={search} alt="search" /></label>
            <input autoComplete="off" id="search" type="text" placeholder="Search GitHub username…" onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="right">
            { profileNotFound && <div className="error">No results</div>}
            <button type="submit">Search</button>
          </div>
        </form>
        <div className="outer-content">
        { dataLoaded && <div className="content">
          <div className="profile-picture"><img src={profileData.avatar_url} alt="" /></div>
          <div className="profile-summary">
            <div className="upper">
              <div className="names">
                <div className="name">{profileData.name ? profileData.name : profileData.login}</div>
                <div className="username">@{profileData.login}</div>
              </div>
              <div className="text">Joined {new Date(profileData.created_at).toDateString()} </div>
            </div>
            <div className="middle">
              <div className="text">
                {profileData.bio !== null ? profileData.bio : "Empty biography"}
              </div>
              <div className="stats">
                <div>
                  <div className="text">Repos</div>
                  <div className="number">{profileData.public_repos}</div>
                </div>
                <div>
                  <div className="text">Followers</div>
                  <div className="number">{profileData.followers}</div>
                </div>
                <div>
                  <div className="text">Following</div>
                  <div className="number">{profileData.following}</div>
                </div>
                
              </div>
            </div>
            <div className="bottom">
              <div><img src={location} alt="" /><div className="text">{profileData.location !== null ? profileData.location : "Not avaiable"}</div></div>
              <div><img src={twitter} alt="" /><div className="text">{profileData.twitter_username !== null ? profileData.twitter_username : "Not avaiable"}</div></div>
              <div><img src={website} alt="" /><div className="text">{profileData.blog !== "" ? <a href={profileData.blog} >{profileData.blog}</a> : "Not avaiable"}</div></div>
              <div><img src={company} alt="" /><div className="text">{profileData.company !== null ? profileData.company : "Not avaiable"}</div></div>
            </div>
          </div>
        </div>}
        </div>
      </div>
    </section>
  )
}

export default Home;