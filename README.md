# Waves Display
Waves Display plugin for Wordpress using WPack.io for tooling. 

## Setup

```bash
npx @wpackio/cli
npm run bootstrap
composer require wpackio/enqueue
```

Update ```proxy``` value in ```wpackio.server.js```  to your local development URL. I.e. *http://localhost:8888/*
Update ```slug``` value in ```wpackio.project.js``` to reflect the directory of your theme. I.e. *bt-helm*

## Development 
```bash
npm run start
```

## Build

```bash
npm run build
```

## Deploy

```bash
npm run archive
```

## Git FTP

Set Git FTP settings with 'syncroot' pointing at packages directory. You may need to export any templates if these have been edited in WP.

```
url = ftpes://1.1.1.1/public_html/wp-content/themes/{directory_name}
user = "username"
password = "password"
insecure = 1
syncroot = package/{directory_name}
```