---
layout: post
title:  "Useful bash"
date:   2071-10-15 00:00:00
categories: bash scripts
description: "How-to do useful stuff with bash"
status: draft
---
[I'm an inline-style link](https://www.google.com)


## Basics

### Making aliases
`alias mycoolalias='. ./thefull/path/tobash/script.sh'`

By running that in the command line we create the 'mycoolalias' alias which will execute the script.sh via its' full path.

### Creating a script
`sudo nano /thefull/path/tobash/script.sh`

After running the nano command we can start editing our script. 

## The script

A simple script to start with is outputting some text, let's start by echoing 'Hello World!'

Before we get to that we need to fulfill a requirement of any bash script, the `#!/bin/bash` at the start of the script.

1. Add `#!/bin/bash` to the top of the file.
2. Add `echo "Hello World!"` to the second line.

Hit CTRL+X, Y, and ENTER to save the script.

## Making the script executable

`chmod +x /thefull/path/tobash/script.sh`

### Using the alias
`mycoolalias`




