import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./facebookAuth.css"

const FacebookAuth = () => {
  const [userData, setUserData] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [pageInsights, setPageInsights] = useState([]);
  const [sinceDate, setSinceDate] = useState('');
  const [untilDate, setUntilDate] = useState('');

  useEffect(() => {
    // Load the Facebook SDK for JavaScript
    window.fbAsyncInit = function () {
      FB.init({
        appId: '2269414253411989',
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });

      // Check if the user is already logged in when the page loads
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    // Asynchronously load the SDK
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  // Handle the status change callback
  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      // User is logged into Facebook and your app
      console.log('User is connected.');
      fetchUserData(response.authResponse);
    } else if (response.status === 'not_authorized') {
      // User is logged into Facebook but not your app
      console.log('User is not authorized.');
    } else {
      // User is not logged into Facebook
      console.log('User is not logged into Facebook.');
    }
  };

  // Fetch user data and pages
  const fetchUserData = (authResponse) => {
    FB.api('/me', { fields: 'name,picture' }, function (userInfo) {
      setUserData({
        ...userInfo,
        accessToken: authResponse.accessToken,
        userID: authResponse.userID,
      });
    });

    // Fetch user's pages
    axios
      .get(`https://graph.facebook.com/me/accounts?access_token=${authResponse.accessToken}`)
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
    if (!userData || !userData.accessToken) {
      console.error("Access token is missing or user is not logged in.");
      return;
    }
  
    const accessToken = userData.accessToken;
    const since = sinceDate ? `&since=${sinceDate}` : '';
    const until = untilDate ? `&until=${untilDate}` : '';
  
    const url = `https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_actions_post_reactions_total&access_token=${accessToken}${since}${until}&period=total_over_range`;
  
    axios.get(url)
      .then((res) => {
        console.log(res.data.data);
        setPageInsights(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching page insights:", err);
      });
  };
  
  return (
    <div>
      {!userData ? (
        <div className='welcome-content'>
          <h2>Mojo Web Insight</h2>
          <p>Get Insights on your pages on facebook</p>
          <button
            onClick={() =>
              FB.login(statusChangeCallback, { scope: 'public_profile,email,pages_show_list' })
            }
          >
            Login via Facebook
          </button>
        </div>
      ) : (
        <div className='main-content'>
          <h1>Welcome, {userData.name}</h1>
          <div className="image-container">
            <img src={userData.picture.data.url} alt="User Profile" />
          </div>

          {pages.length > 0 ? (
            <div className='page-form-container'>
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
          ) : (
            <p>No pages created by the user.</p>
          )}

          <div className='date-form-container'>
            <h2>Select Date Range</h2>
            <label>
              Since: <input type="date" value={sinceDate} onChange={(e) => setSinceDate(e.target.value)} />
            </label>
            <label>
              Until: <input type="date" value={untilDate} onChange={(e) => setUntilDate(e.target.value)} />
            </label>
            <button onClick={() => fetchPageInsights(selectedPage)}>Get Insights</button>
          </div>

          {pageInsights.length > 0 && (
            <div>
              <h3>Page Insights</h3>
              {pageInsights.map((insight, index) => (
                <div key={index}>
                  <strong>{insight.name}</strong>: {insight.values[0].value}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacebookAuth;
