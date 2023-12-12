---
title: "Automatic NodeJS version using NVM"
slug: "js/automatic-nodejs-version-nvm"
pubDate: "2020-07-29"
description: "If you are using multiple versions of NodeJS you should use NVM"
author: "Andres Bedoya"
tags: ["JavaScript"]
---

If you have multiple projects in your computer, it's probable that all of them use a different version of NodeJS. For this reason, there are packages like <a class="hover:no-underline text-blue underline" href="https://github.com/nvm-sh/nvm" target="_blank" rel="noreferrer">NVM (Node Version Manager)</a> that allow you to do exactly that, handle different versions of NodeJS without too much extra configuration.

Its installation and use are tremendously basic, just need to run `nvm help` if you need more help.

In order to have a better organization, it is recommended to have a `.nvmrc` file (must be in the root of the project) with the version that we want to use.

Its creation it's really easy:

```shell
$ echo "14.5.0" > .nvmrc

$ echo "lts/*" > .nvmrc # to default to the latest LTS version

$ echo "node" > .nvmrc # to default to the latest version
```

Now, there are 2 different ways to use this file:

## Manual switch

Go to you folder's project and run `nvm use`, you should see something like:

```shell
Found '/Users/srhart/Projects/project/.nvmrc' with version <14.5.0>
Now using node v14.5.0 (npm v6.14.5)
```

## Automatic switch

When you `cd` into your project nvm automatically will detect your `.nvmrc` and will use that NodeJS version.

Put this into your `$HOME/.zshrc` to call `nvm use` automatically:

```shell
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

**Friendly reminder**: place the previous code after nvm initialization!

These are the instructions for <a class="hover:no-underline text-blue underline" href="https://github.com/nvm-sh/nvm#bash" target="_blank" rel="noreferrer">bash</a> and <a class="hover:no-underline text-blue underline" href="https://github.com/nvm-sh/nvm#fish" target="_blank" rel="noreferrer">fish</a>

If a project does not have the `.nvmrc` file, nvm will use the default version of your system.

RTFM! :)
