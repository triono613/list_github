import React from "react";

const DisplayTable = ({ data, repositories }) => {
  return (
    <div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Avatar</th>
            <th>Location</th>
            <th>Bio</th>
            <th>Repositories</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.name}</td>
            <td>
              {!data.avatar_url ? (
                " "
              ) : (
                <img
                  className="ui small circular image"
                  src={data.avatar_url}
                  alt={data.avatar_url}
                />
              )}
            </td>
            <td>{data.location}</td>
            <td>{data.bio}</td>
            <td>
              {repositories.map((repo) => (
                //   repositories.map(function (repo) {
                //   console.log("repo display: ", repo.name);
                <>
                  <div className="ui relaxed divided list" key={repo.name}>
                    <div className="item">
                      <i className="large github middle aligned icon"></i>
                    </div>
                    <div className="content">
                        <a
                        href={repo.html_url} target="_blank" without rel="noreferrer"
                        className="header" 
                      >
                        {repo.name}
                      </a>
                    </div>
                  </div>
                </>
              ))}

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
