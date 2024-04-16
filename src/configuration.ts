const {
  VITE_API_TOKEN,
  VITE_API_URL,
  VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_CALLBACK_URL,
  VITE_AUTH0_AUDIENCE,
  VITE_AUTH0_PROTECTED_URL,
} = import.meta.env;

const configuration = {
  apiToken: VITE_API_TOKEN,
  apiUrl: VITE_API_URL,
  auth0Domain: VITE_AUTH0_DOMAIN,
  auth0ClientId: VITE_AUTH0_CLIENT_ID,
  auth0Callback: VITE_AUTH0_CALLBACK_URL,
  audience: VITE_AUTH0_AUDIENCE,
  protectedApiUrl: VITE_AUTH0_PROTECTED_URL,
};

export default configuration;
