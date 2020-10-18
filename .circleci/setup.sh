echo 'Stopping PM2 system...'
pm2 stop API_DEV_DORA

echo 'Dropping the database...'
docker exec 501 bash -c "psql -U postgres -c 'DROP DATABASE IF EXISTS doramatching;'"

echo 'Creating the database...'
docker exec 501 bash -c "psql -U postgres -c 'CREATE DATABASE doramatching;'"

echo 'Installing dependencies...'
yarn install

echo 'Building...'
yarn build

echo 'Deploying...'
pm2 start ./dist/main.js --name 'API_DEV_DORA'
