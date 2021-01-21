### Installation

How to start project

Install the all dependencies and start the server.

```sh
$ git clone https://github.com/riyaraa/api-news-blog.git
$ cd api-news-blog
$ npm install
```

Konfigurasi .env
```sh
$ create file .env 
$ copy file .env.example to .env
$ DB_HOST=localhost
$ DB_USER=namauser database
$ DB_PASS=password database
$ DB_NAME=nama database
```
Konfigurasi Sequelize
```sh
$ npm install sequelize-cli sequelize -g
$ npx sequelize db:migrate
```
