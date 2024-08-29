import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const FacebookAuth = () => {
  const [userData, setUserData] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [pageInsights, setPageInsights] = useState(null);
  const [sinceDate, setSinceDate] = useState('');
  const [untilDate, setUntilDate] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setUserData({
      name: response.name,
      picture: response.picture.data.url,
      accessToken: response.accessToken, // Save access token
    });

    // Fetch user's pages
    axios.get(`https://graph.facebook.com/me/accounts?access_token=${response.accessToken}`)
      .then((res) => {
        console.log(res.data.data);
        setPages(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePageSelect = (e) => {
    setSelectedPage(e.target.value);
    fetchPageInsights(e.target.value);
  };

  const fetchPageInsights = (pageId) => {
    const accessToken = userData.accessToken;
    const since = sinceDate ? `&since=${sinceDate}` : '';
    const until = untilDate ? `&until=${untilDate}` : '';
    axios.get(`https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_actions_post_reactions_total&access_token=${accessToken}${since}${until}&period=total_over_range`)
      .then((res) => {
        console.log(res.data.data);
        setPageInsights(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {!userData ? (
        <FacebookLogin
          appId="2269414253411989" // Replace with your Facebook App ID
          autoLoad={false}
          fields="name,picture"
          callback={responseFacebook}
        />
      ) : (
        <div>
          <h1>Welcome, {userData.name}</h1>
          <img src={userData.picture} alt="User Profile" />
          <div>
            <h2>Select a Page</h2>
            <select onChange={handlePageSelect} value={selectedPage}>
              <option value="">Select Page</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2>Select Date Range</h2>
            <label>
              Since:
              <input
                type="date"
                value={sinceDate}
                onChange={(e) => setSinceDate(e.target.value)}
              />
            </label>
            <label>
              Until:
              <input
                type="date"
                value={untilDate}
                onChange={(e) => setUntilDate(e.target.value)}
              />
            </label>
            <button onClick={() => fetchPageInsights(selectedPage)}>Get Insights</button>
          </div>

          {pageInsights && (
            <div>
              <h2>Page Insights</h2>
              <div className="insights-cards">
                <div className="card">
                  <h3>Total Followers</h3>
                  <p>{pageInsights[0]?.values[0]?.value}</p>
                </div>
                <div className="card">
                  <h3>Total Engagement</h3>
                  <p>{pageInsights[1]?.values[0]?.value}</p>
                </div>
                <div className="card">
                  <h3>Total Impressions</h3>
                  <p>{pageInsights[2]?.values[0]?.value}</p>
                </div>
                <div className="card">
                  <h3>Total Reactions</h3>
                  <p>{pageInsights[3]?.values[0]?.value}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacebookAuth;
