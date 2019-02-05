---
permalink: zero-downtime-deployment
image: /covers/zero-downtime-deployment.jpg
description: I released a Laravel package that gives Artisan the power of zero downtime deployment. Get started in three simple steps.
tags: [ 'Laravel Lab', 'Laravel Deployer' ]
date: 2018-03-11T22:41:00Z
disqus: ghost-5aa5a48c191ea008997df9ba
---

# Zero-downtime deployment

I released a Laravel package that gives Artisan the power of zero downtime deployment. Get started in three simple steps.

<GithubButton url="https://github.com/lorisleiva/laravel-deployer" title="Laravel Deployer on GitHub" />

## Introduction
In my quest to have more control over my deployments, I discovered a few useful open source tools that let me achieve this with the luxury of zero downtime deployments. As a Laravel developer, [Deployer.org](https://github.com/deployphp/deployer) was the most suitable and comfortable option for me. Since most of the configurations I used for my projects were Laravel specific more than project specific, I decided to extract that logic into a package and encapsulate it within our friend `php artisan`.

## Let's deploy
Deploying your application with [Laravel Deployer](https://github.com/lorisleiva/laravel-deployer) is as simple as those three steps:

```bash
composer require lorisleiva/laravel-deployer
php artisan deploy:init
php artisan deploy
```

1. Start by installing the package via composer. Since Laravel 5.5 you don’t even need to register the service provider.
2. You then need to set up your deployment configuration via the `deploy:init` artisan command. This will ask you a few questions to help you get started.
3. When your configuration file is ready simply run `php artisan deploy` and watch your deployment flow automate itself for you.

## Simple learning curve
Whilst the learning curve of Deployer.org is already very light, Laravel Deployer provides a [documentation](https://github.com/lorisleiva/laravel-deployer/blob/master/docs/README.md) tailored for Laravel projects.

Laravel Deployer also provides extra tasks and set up options relevant for Laravel deployments. For example you can use the `--forge` flag when creating your configuration file to help you set up the deployment of a server maintained in Laravel Forge. You can migrate your database, build your assets via NPM, terminate horizon gracefully, reload php-fpm and of course create your own tasks to customize your deployment flow.

## Deployment power to artisan
With Laravel Deployer, Artisan can now leverage the full power of Deployer.org without requiring your developers to install any global dependencies.

```bash
deploy                # Deploy your Laravel application
deploy:configs        # Print host configuration
deploy:current        # Show current paths
deploy:dump <task>    # Display the task-tree for a given task
deploy:hosts          # Print all hosts
deploy:init           # Generate deploy.php configuration file
deploy:list           # Lists available tasks
deploy:run <task>     # Execute a given task on your hosts
```

Once you’ve set up your deployment hosts you can even use the shortcut `php artisan ssh` to connect to your server.

I hope this package will save you as much time as it will do for my future projects. Contributions and feature requests are more than welcome to ensure more of us can deploy with minimal configuration steps.

<GithubButton url="https://github.com/lorisleiva/laravel-deployer" title="Laravel Deployer on GitHub" />