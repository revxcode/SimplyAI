import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// Replace with your Google OAuth client ID
const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
// console.log(import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);

function Login() {
  const handleLoginSuccess = (response) => {
    console.log(response);
    // Redirect to home or another protected route after successful login
  };

  const handleLoginFailure = (error) => {
    console.error(error);
    // Handle login failure
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
}

export default Login;
