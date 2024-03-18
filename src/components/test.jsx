import { GoogleLogin } from "react-google-login";

const responseGoogle = (response) => {
  console.log(response);
  // Gửi token ID đến server để xác thực
};

const LoginComponent = () => (
  <GoogleLogin
    clientId="YOUR_CLIENT_ID"
    buttonText="Login with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={"single_host_origin"}
  />
);

export default LoginComponent;
