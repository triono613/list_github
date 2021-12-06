import React, { useState } from "react";
import DisplayTable from "./DisplayTable";

const Profile = () => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);

  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const profile = await fetch(`https://api.github.com/users/${username}`);
    const profileJson = await profile.json();

    const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();
    console.log("repoJson: ", repoJson);
    console.log("repoJson: ", repoJson);

    if (profileJson) {
      setData(profileJson);
      setRepositories(repoJson);
    }
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <div class="ui search">
          <div class="ui icon input">
            <i class="search icon"></i>
            <input
              class="prompt"
              type="text"
              value={username}
              onChange={onChangeHandler}
              placeholder="Search username here..."
            />
          </div>
          <button
            className="ui primary button"
            type="submit"
            onClick={submitHandler}
          >
            <i className="github icon"></i>
            Search
          </button>
        </div>
        <DisplayTable data={data} repositories={repositories} />
      </div>
    </>
  );
};

export default Profile;
