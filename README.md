# Debora

Device board for embedded development collaboration

## React

React app stuff is located in `webui` directory. To get started developing you have to:
- install `docker` and `compose` plugin
- add environment variables using one of the template file from `./env/` directory (copy, rename, set missing variables)
- read env variables e.g. (use `Bash` or `Git Bash` on Windows)
```
source env/.env.dev
```
- start services
```
docker compose up -d
```
- for older versions
```
docker-compose up -d
```

## Dump db
```bash
docker exec -i debora_dev /bin/bash -c "PGUSER=<pg_user> PGPASSWORD=<pg_password> pg_dump debora_dev" > "./priv/sql/dump/$(date +"%Y_%m_%d_%I_%M_%S%p").sql
```
