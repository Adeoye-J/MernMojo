import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1>Privacy Policy</h1>
      <p>Effective date: August 29, 2024</p>

      <p>
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information when you use our
        app.
      </p>

      <h2>Information We Collect</h2>
      <p>When you use our app, we may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> We collect your name, profile
          picture, and other information you provide when you log in using your
          Facebook account.
        </li>
        <li>
          <strong>Page Insights:</strong> If you manage Facebook Pages and
          choose to share insights with us, we collect data about the
          performance of those Pages.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Display your profile information within the app.</li>
        <li>Show insights and metrics related to Facebook Pages you manage.</li>
        <li>Improve the user experience and functionality of the app.</li>
      </ul>

      <h2>How We Protect Your Information</h2>
      <p>
        We are committed to protecting your personal information. We implement
        various security measures to ensure the safety of your data, including
        encryption and secure storage.
      </p>

      <h2>Sharing Your Information</h2>
      <p>
        We do not share your personal information with third parties, except as
        necessary to provide our services or as required by law.
      </p>

      <h2>Your Choices</h2>
      <p>
        You can choose not to provide certain information or to disable our
        access to your Facebook data by adjusting your account settings or
        permissions within Facebook.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at <a href="mailto:support@example.com">r16172717@gmail.com</a>.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    // backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    backgroundColor: '#f4f4f4',
  },
  heading: {
    color: '#333',
  },
  paragraph: {
    color: '#666',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default PrivacyPolicy;
