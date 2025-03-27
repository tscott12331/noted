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
`bun i`shell

Make sure the docker container is running
`bun docker:up`shell

Migrate DB
`bun drizzle-kit migrate`shell

## Run the Application
`bun dev`shell
