This app is designed to deploy on Netlify, and can be locally tested with netlify-cli
Remember to move `.env` file in express-server to root folder so that api.mjs is able to load it.

# Install Netlify CLI
cp ./express-server/.env .env
npm install -g netlify-cli

# Start local development
netlify dev