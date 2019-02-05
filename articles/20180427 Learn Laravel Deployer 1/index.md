---
permalink: learn-laravel-deployer-1
image: /covers/learn-laravel-deployer-1.jpg
description: Deploying your Laravel application without any downtime just got easier. This video helps you get started in 5 minutes only.
tags: [ 'Laravel Deployer' ]
date: 2018-04-27T08:58:00Z
disqus: ghost-5ae2ce40b70f970868cfdb15
---

# Zero-downtime Laravel deployment in 5 minutes

<YouTube url="https://www.youtube.com/embed/EaCd1ocep8A?rel=0" />

## Checklist

#### Set up Laravel Deployer
❑ &nbsp;Go to your application folder \
❑ &nbsp;`composer require lorisleiva/laravel-deployer` \
❑ &nbsp;`php artisan deploy:init` \
❑ &nbsp;`php artisan deploy`

#### Ensure your server can communicate with GitHub
- If your server don’t have a SSH key, create one: \
	❑ &nbsp;`ssh-keygen -t rsa -b 4096 -C "root@laraveldeployer.com"` \
	❑ &nbsp;`eval "$(ssh-agent -s)"` \
	❑ &nbsp;`ssh-add ~/.ssh/id_rsa`
- If your server don’t have github.com in its `known_hosts`: \
	❑ &nbsp;Deploy using the `git_tty` option. \
	❑ &nbsp;`php artisan deploy -o git_tty=true`

#### Set up your production environment
❑ &nbsp;`php artisan ssh` \
❑ &nbsp;`cp .env.example .env` \
❑ &nbsp;`php artisan key:generate` \
❑ &nbsp;`vim .env` and configure your production environment. \
❑ &nbsp;`exit` \
❑ &nbsp;`php artisan deploy`

#### Update nginx configurations
❑ &nbsp;`vim /etc/nginx/sites-available/mydomain.com` \
❑ &nbsp;Point the `root` folder to the `current/public` directory. \
❑ &nbsp;`service nginx restart && service php7.2-fpm reload`