---
permalink: so-i-wrote-my-dotfiles
image: /covers/so-i-wrote-my-dotfiles.jpg
description: After a whole weekend dedicated to writing my dotfiles, here’s my reflection on this experience.
tags: [ 'Tooling' ]
date: 2018-04-15T21:38:00Z
disqus: ghost-5ad35cf3b8bc5d0907cc0097
---

# So I wrote my dotfiles...

## Introduction
My MacBook Pro is getting old now and none of the new MacBook Pros interest me (butterfly keyboard? No thank you). Thus, I though I’d give it a fresh install to remove all of the garbage I’ve accumulated in five years. This was the perfect opportunity to finally organize my dotfiles in a [public repository](https://github.com/lorisleiva/dotfiles). After a whole weekend dedicated to that, here’s my reflection on this experience.

## Balancing the power of dotfiles
Whilst dotfiles are by definition all of the configuration files and folders in your home `~` directory, most dotfiles repositories don’t stop there. They generally include a `install.sh` or `bootstrap.sh` script that restores everything when configuring a new machine. My biggest trade off was to define how intrusive this script should be.

How cool would it be if, when I set up a new computer, all I need to do is clone my dotfiles repo and run the install script to find my computer **exactly** how I like it. On the other hand, how often do you need to set up a new machine? In my case I hadn’t done that for five years so whatever my install script was going to contain, it had to be short and easy to maintain.

## The install script
Here is the power I decided to give my dotfiles:
* **Homebrew bundle.** I listed all of the applications that I frequently use in a `Brewfile`. It was nice not having to download and install all of these manually.
* **Mackup backup.** I used [mackup](https://github.com/lra/mackup) to backup the configurations of my applications.
* **Zsh configs.** I backed these up manually in the dotfiles repository to sync them to github. This allows others to see my current terminal settings and gives me piece of mind (mackup is not flawless).

## Captain hindsight
Whilst this looks good on paper, resetting my computer was not as easy as it sounds. For example, starting Laravel valet required me to do a `composer global install`, which required me to restore my global `composer.json` via mackup, which required my Google drive to be synced to my computer, which took a bloody long time.

I guess my point is that I’m not 100% sold on the value of auto bootstrapping a new local machine. Especially if that happens less often than every year.

**However**, the process of creating those dotfiles itself was very rewarding. I went through [various existing dotfiles](#conclusion) and found new cool aliases and functions to use in my terminal. After reading enough of them I even had ideas to create new ones. Even watching other Brewfiles made me discover new applications that I didn’t know before.

Therefore, I decided to share in this article a few cool tricks that I ended up using in my terminal. You can find the rest in my dotfiles repository.

<GithubButton url="https://github.com/lorisleiva/dotfiles" title="Dotfiles on GitHub" />

## Dotfiles goodies
### Fire folder
I am a big fan of using emojis to organize anything. Just like my commits, my Google Drive folders all start with an emoji followed by a space. The emoji represents a predefined category of folder which group them together when sorted alphabetically.

This time I decided to do the same with my `Sites` folder and I renamed it `🔥`. It looks really minimal on my terminal and I know without even glimpsing that this is my current directory. Plus it’s weirdly motivating. I love it!

![Screen-Shot-2018-04-15-at-16.33.33](./screenshot.png#w60)

Of course typing `cd 🔥` is not much fun so I created a `fire` alias.

```bash
alias fire=“cd 🔥”
```

### Laravel, php, npm shortcuts
A few aliases that probably save me a couple of minutes a day.

```bash
# Laravel, php
alias a="php artisan"
alias cu="composer update"
alias cr="composer require"
alias ci="composer install"
alias cda="composer dump-autoload -o"
alias phpunitc="phpunit --coverage-html build"

# Npm
alias ni="npm install"
alias w="npm run watch"
```

### Git goodness
These functions let you commit everything with a personalised default message and clone via ssh by just typing the `vendor/repo` structure.

```bash
commit() {
    commitMessage="$1"

    if [ "$commitMessage" = "" ]; then
        commitMessage=":pencil: Small changes"
    fi

    git add .
    eval "git commit -a -m '${commitMessage}'"
}

clone() {
    if [[ $1 =~ "hub|lab" ]]; then
        provider="$1"
        shift
    else
        provider="hub"
    fi

    eval "git clone git@git${provider}.com:$1.git $2"
}
```

```bash
commit                             # git add . && git commit -am “📝 Small changes”
commit “:recycle: Refactor”        # git add . && git commit -am “♻️ Refactor”

clone laravel/laravel              # git clone git@github.com:laravel/laravel.git
clone laravel/laravel blog         # git clone git@github.com:laravel/laravel.git blog
clone lab lorisleiva/private-repo  # git clone git@gitlab.com:lorisleiva/private-repo.git
```

I also added a couple of useful git aliases.

```bash
alias g="git"
alias gs="git status"
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gco="git checkout"
alias nah="git reset --hard && git clean -df"
alias push="git push"
alias pull="git pull --rebase"
```


### Weather function
This function shows you the weather of a given city directly in your terminal. Less for efficiency than because you can.

```bash
weather() {
    city="$1"

    if [ -z "$city" ]; then
        city="London"
    fi

    eval "curl http://wttr.in/${city}"
}
```

```bash
weather       # Shows weather in London
weather Dubai # Shows weather in Dubai
```

### Reload terminal 
Every time I changed my shell configurations I had to open a new tab and remove the old tab for the changes to be effective. Not anymore:

```bash
alias reload="exec ${SHELL} -l"
```

## Conclusion
Whilst this was an interesting journey, I enjoyed spending time improving my dev tools and my MacBook seems happier as a result. A big thank you to those who wrote dotfiles I got inspired from.

#### Credits
* [Dries Vints's dotfiles](https://github.com/driesvints/dotfiles)
* [Mathias Bynens's dotfiles](https://github.com/mathiasbynens/dotfiles)
* [Freek Van der Herten's dotfiles](https://github.com/freekmurze/dotfiles)
* [Mackup](https://github.com/lra/mackup)
* [Homebrew bundle](https://github.com/Homebrew/homebrew-bundle)