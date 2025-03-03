docker run -d \
  --name declutter-local-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=user \
  -e POSTGRES_DB=declutter \
  -v pgdata:/var/lib/postgresql/data \
  -p 5552:5432 \
  -d postgres:15
