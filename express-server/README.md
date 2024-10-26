## Auth Express Server

### Start in dev mode with ts file
```bash
yarn dev
```

### Build
```bash
yarn build
```

### Start
```bash
yarn start
```
---

### Test Endpoints

```bash
# api/verify
curl --location 'http://localhost:3000/api/verify' \
--header 'Content-Type: application/json' \
--data '{"code":"1234"}'
```
```bash
# api/auth
curl --location 'http://localhost:3000/api/auth' \
--header 'Authorization: Bearer <token from previous response>' \
--data ''
```