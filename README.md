# OTP Homework

This homework is built with Next.js framework

Demo site deployed on Netlify: [https://verification-code-1234.netlify.app/](https://verification-code-1234.netlify.app/)


## Start Repo

### Prerequisite
If yarn is not installed, please run `npm install -g yarn` in terminal or `sudo npm install -g yarn`.

Use node **v20.18.0** for runtime environment.

### Run in local
1. Create your own `.env` file under `/express-server` and `/frontend`, using `.env.example` as reference

2. Start express-server for backend 
```bash
cd express-server
yarn install
yarn build
yarn start
```
This should print the following result: `[INFO] Server is running on port <port>`

3. Start frontend for frontend
```bash
cd .. # return to the root folder
cd frontend
yarn install
yarn build
yarn start
```

This should print the following result: 
```
   ┌──────────────────────────────────────────┐
   │                                          │
   │   Serving!                               │
   │                                          │
   │   - Local:    http://localhost:<port>    │
   │   - Network:  http://192.168.0.30:<port> │
   │                                          │
   │   Copied local address to clipboard!     │
   │                                          │
   └──────────────────────────────────────────┘
```
## Development
Run `yarn dev` under frontend or express-server folder for development

## Run Docker
```bash
docker-compose up -e NEXT_PUBLIC_API_URL=http:\/\/localhost -e
  JWT_SECRET=secret -e VERIFICATION_CODE=0000
```
Or, Use docker secrets (recommended for production)
```
docker-compose --env-file ./production.env up
```
## Netlify Test
This app is designed to deploy on [Netlify](https://www.netlify.com/), and can be locally tested with netlify-cli.

Move `.env` file in express-server to root folder so that `api.mjs` is able to load it.

### Install Netlify CLI
```bash
cp ./express-server/.env .env
npm install -g netlify-cli
```

### Start local development
```bash
netlify dev #this will ask you to choose between frontend or express-server
``` 