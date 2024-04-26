ref1 : https://javascript.plainenglish.io/how-to-secure-jwt-in-a-single-page-application-6a46e69fc393
ref2 : https://medium.com/@amavictor/storing-tokens-in-cookies-with-react-93a5a818c3a8#:~:text=JWT%20tokens%20are%20a%20popular,or%20yarn%20add%20js%2Dcookie%20.

# Storing Tokens in Cookies with React

Introduction
Token-based authentication is a popular way to secure web applications. In token-based authentication, a server generates a token (usually a JSON Web Token or JWT) and sends it to the client, which then sends the token with each request to authenticate itself. One of the challenges of token-based authentication is securely storing the token on the client-side and that is why you’re reading this article now.

In this article, we’ll explore how to use cookies to securely store and authenticate tokens in a React application with the Axios library. Cookies are a good option for storing tokens because they are automatically sent with every request, making it easy to authenticate requests without having to manually include the token in each request.

# How to Store JWT Tokens in Cookies with React
JWT tokens are a popular form of token-based authentication because they are self-contained and can contain user information. We can use the js-cookie library to store JWT tokens in cookies in React. You should start by installing the library using npm install js-cookie or yarn add js-cookie . Once that is done, go ahead and import the Cookie instance as shown below

# Install 
    > npm install js-cookie
import Cookies from 'js-cookie';
const token = 'YOUR_JWT_TOKEN';
Cookies.set('token', token, { expires: 7, secure: true });


In the code above, we set the cookie name to ‘token’ and the value to the JWT token. The expires option sets the expiration date of the cookie, and the secure option ensures that the cookie is only sent over HTTPS. There are several other properties that can be set to further customize how you want to handle your cookies, but theses are the two most important options to set.

# To retrieve the JWT token from the cookie, we can use the following code:
    const token = Cookies.get('token');

# Implementing Cookie-based Authentication with Axios
    To authenticate requests using cookie-based tokens in Axios, we need to configure the axios.defaults.withCredentials property to true. Here's how to do it:

    import axios from 'axios';

    axios.defaults.withCredentials = true;
    axios.get('/api/data')
    .then(response => console.log(response.data))
    .catch(error => console.error(error));