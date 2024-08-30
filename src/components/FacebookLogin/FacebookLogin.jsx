import React, { useEffect, useState } from 'react';

const FacebookLogin = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [insights, setInsights] = useState({});
  const [noPages, setNoPages] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '2269414253411989',
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });

      window.FB.getLoginStatus(response => {
        statusChangeCallback(response);
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_GB/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      fetchUserData();
    } else {
      console.log('User not authenticated');
    }
  };

  const fetchUserData = () => {
    window.FB.api('/me', { fields: 'name, picture' }, function(response) {
      setUser(response);
      fetchUserPages();
    });
  };

  const fetchUserPages = () => {
    window.FB.api('/me/accounts', function(response) {
      if (response.data.length > 0) {
        setPages(response.data);
        response.data.forEach(page => {
          fetchPageInsights(page.id);
        });
      } else {
        setNoPages(true);
      }
    });
  };

  const fetchPageInsights = (pageId) => {
    window.FB.api(`/${pageId}/insights`, function(response) {
      if (response && !response.error) {
        setInsights(prevInsights => ({
          ...prevInsights,
          [pageId]: response.data
        }));
      }
    });
  };

  return (
    <div>
      <h2>Login with Facebook</h2>
      {!user && (
        <div
          className="fb-login-button"
          data-width="100px"
          data-size=""
          data-button-type=""
          data-layout=""
          data-auto-logout-link="true"
          data-use-continue-as="true"
        ></div>
      )}
      {user && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <img src={user.picture.data.url} alt="User profile" />
          {noPages ? (
            <p>No pages created by the user.</p>
          ) : (
            <div>
              <h4>Your Pages</h4>
              <select onChange={(e) => fetchPageInsights(e.target.value)}>
                {pages.map(page => (
                  <option key={page.id} value={page.id}>{page.name}</option>
                ))}
              </select>
              {pages.map(page => (
                <div key={page.id}>
                  <h5>Insights for {page.name}</h5>
                  <pre>{JSON.stringify(insights[page.id], null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacebookLogin;
