import React, { useState, useEffect, props, ReactDOM } from "react";
import { Form, Card, Image, Icon, List, Input } from "semantic-ui-react";
import "./App.css";
import { render } from "@testing-library/react";
import { componentWillAppendToBody } from "react-append-to-body";

export default function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [reposUrl, setReposUrl] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  // const [error, setError] = useState(null);
  const [fullName, setFullName] = useState([]);
  const [repoName, setRepoName] = useState([]);

  const [dtx, setDtx] = useState([]);

  const setData = ({
    name,
    login,
    following,
    public_repos,
    avatar_url,
    bio,
    repos_url,
    full_name,
  }) => {
    setName(name);
    setUsername(login);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setBio(bio);
    setReposUrl(repos_url);
    setFullName(full_name);
  };

  const setDataRepos = ({ repoName }) => {
    setRepoName(repoName);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const items = [];
  const usersDiv = [];
  var listItems;
  const handleSubmit = async e => {
    e.preventDefault();
    const profile = await fetch(`https://api.github.com/users/${userInput}`);
    const profileJson =  await profile.json();
    
    const repositories = await fetch(profileJson.repos_url);
    const repoJson =  repositories.json();
    console.log("repoJson: ", repoJson);
    

    if(profileJson){
      setData(profileJson);
    }


    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log("handleSubmit: ", data);
        // getRepos(data.repos_url);

        fetch(data.repos_url)
          .then((res2) => res2.json())
          .then((data2) => {
            console.log("data2: ", data2);

            data2.forEach((elementdt) => {
              console.log("elementdt.name: ", elementdt.name);
              usersDiv.push(elementdt.name);
              setRepoName(elementdt.name);
            });

            const data = [{ name: "test1" }, { name: "test2" }];
            return (listItems = data.map((d) => (
              <li key={d.name}>{d.name}</li>
            )));
          });
      });
    // return usersDiv;
    // console.log('listItems: ',listItems);
  };

  function getRepos(dt) {
    //https://api.github.com/users/triono613/repos
    // fetch(`https://api.github.com/users/${userInput}/repos`)
    fetch(dt)
      .then((res) => res.json())
      .then((data) => {
        // console.log("list_repo count: ", data.length);
        console.log("list_repo: ", data);

        // var indents = [];
        for (var i = 0; i < data.length; i++) {
          console.log("i: ", i);
          console.log("data i: ", data[i].name);
          setDataRepos(data[i]);
        }

        var array = [];
        var element = [];
        for (let index = 0; index < data.length; index++) {
          element[index] = data[index].name;
          // console.log('element : ',element);
          // return <h1>{element}</h1>
        }
      });
  }

  // const data =[{"name":"test1"},{"name":"test2"}];
  //   const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);

  return (
    <div>
    <input type="text" value={username} onChange={onChangeHandler} />
    </div>
  );
}
