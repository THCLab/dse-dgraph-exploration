# Data Sharing Engine with GraphQL (Dgraph) exploration

## Running up

1. Run `yarn install`
1. Run `docker-compose pull` to pull up the Dgraph docker image
1. Run Dgraph server with `docker-compose up -d` command
1. Wait few seconds until Dgraph server is ready (you can check it on http://localhost:8080/health)
1. Run `yarn dev`

## Restarting Dgraph data state

1. Run `docker-compose down`
1. Run `docker-compose up -d`
