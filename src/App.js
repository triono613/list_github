import React, { useState, useEffect } from "react";
import { Form, Card, Image, Icon } from "semantic-ui-react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const setData = ({ name, login, following, public_repos, avatar_url,bio }) => {
    setName(name);
    setUsername(login);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setBio(bio);
  };

  const handleSearch =(e)=>{
    setUserInput(e.target.value);
  }

  const handleSubmit =()=>{
    fetch(`https://api.github.com/users/${userInput}`)
    .then(res=> res.json())
    .then( data=>{
      setData(data);
    })
  }

  return (
    <div>
      <div className="navbar">github search</div>
      <br />
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder="github user" name="github_user" onChange={handleSearch} />
            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      <div className="card">
        <Card>
          <Image
            src={avatar}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header>{userName}</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              {bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {following} Following
            </a>
          </Card.Content>
          
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {repos} Repos
            </a>
          </Card.Content>

          

          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>

        </Card>
      </div>
    </div>
  );
}
