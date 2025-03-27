## Requirements
- npm or bun
-  docker

## Setup
Add these local variables to a .env
- PR_KEY (private PKCS8 key)
- PU_KEY (public key to the previous private key)
- URL (API url, by default it should be "http://localhost:3000"
- DATABASE_URL (DB url, by default it should be "postgresql://postgres:buhster45@localhost:5432")
Feel free to change these to your liking

Install Dependencies
```shell
bun i
```

Make sure the docker container is running
```shell
bun docker:up
```

Migrate DB
```shell
bun drizzle-kit migrate
```

## Run the Application
```shell
bun dev
```
