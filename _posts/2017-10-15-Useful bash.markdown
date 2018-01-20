---
layout: post
title:  "Bash"
date:   2017-10-28 00:45:50
categories: jekyll bash featured
description: "How to #! it."
status: draft

images:

  - url: /assets/images/bash/shebang.png
    alt: Bash
    title: bash

---

# Useful Bash!

* TOC
{:toc}

# Requirements

The tutorials assumes:

- Ubuntu 16.04

#### Customization


<div class="custom-params">
<div>
	<div>Pathname: </div><input type="text" name="pathname" id="pathname" value="path/toscript">
</div>
<div>
	<div>Alias: </div><input type="text" name="alias" id="alias" value="myalias">
</div>
<div>
	<div>Scriptname: </div><input type="text" name="script" id="script" value="myscript.sh">
</div>
</div>


# Basics

This chapter shows you the basics of how to move around a terminal, how to create a bash script, how to run a bash script, and how to alias the bash script (first temporarily, and then permanently).

#### How to move around

Use `cd` to get back to your root directory

Use `cd ..` to traverse one directory back

Use `cd DIRECTORYNAME` to enter that directory

Use `ls` or `ls -l` to display the directory content

Use `cd DIRECTORYNAME/SUBDIRECTORYNAME` to traverse to a specific directory from the current working directory

Use `cd /ROOTDIRECTORYNAME/DIRECTORYNAME/SUBDIRECTORYNAME` to traverse to a specific directory from the root directory

#### How to get your current directory

`pwd`

#### Creating a script
`sudo nano /#@PATHNAME@#/#@SCRIPT@#`

After running the nano command we can start editing our script.

#### The script

A simple script to start with is outputting some text, let's start by echoing 'Hello World!'

Before we get to that we need to fulfill a requirement of any bash script, the `#!/bin/bash` at the start of the script.

1. Add `#!/bin/bash` to the top of the file.
2. Add `echo "Hello World!"` to the second line.

Hit CTRL+X, Y, and ENTER to save the script.

[Download the script here](/assets/scripts/UsefulBash/helloworld.sh)

#### Making the script executable

`chmod +x /#@PATHNAME@#/#@SCRIPT@#`

#### Running the script

`. /#@PATHNAME@#/#@SCRIPT@#`

#### Making aliases

`alias #@ALIAS@#='. /#@PATHNAME@#/#@SCRIPT@#'`

The "." marks the script for execution.  

By running that in the command line we create the '#@ALIAS@#' alias which will execute the #@SCRIPT@# via its' full path.

#### Using the alias
`#@ALIAS@#`

#### Using command-line parameters

User input typed after the script call can be accessed by the dollar sign, an example:

We create the following script:

```
#!/bin/bash
echo "The answer to the question of $2 is $1."
```

Which will output "The answer to the question life is 42." if called as follows:

`#@ALIAS@# 42 life`

[Download the script here](/assets/scripts/UsefulBash/dontpanic.sh)

#### Making the alias permanent

Once you terminate your SSH session your alias is lost. The alias can be made permanent by altering the "[bashrc](https://www.lifewire.com/bashrc-file-4101947)" file.

The file is located at `~/.bashrc`, you can edit it using any text editor.

`sudo nano ~/.bashrc`

[Here is a link to a default bashrc file as example](https://gist.githubusercontent.com/midasvo/f3f49c12681d5e8d2d9a636b756d8b8b/raw/93a33aa5f1893f46773483250214f8b8b496a270/.bashrc)

As you can see in the example aliases are defined on a new line, regardless the place.
```
  # some more ls aliases
  alias ll='ls -alF'
  alias la='ls -A'
  alias l='ls -CF'
```

So if we want to make our alias persistent we need to add

`alias #@ALIAS@#='. /#@PATHNAME@#/#@SCRIPT@#'`

anywhere in the file - as long as it is on a new line.


After saving the file using CTRL+X Y ENTER we need to run our bashrc file

`. ~/.bashrc`

Which finalizes our changes without having to terminate and reconnect our session.

### A better way!

So now we have seen how to add the alias to the bashrc file, however it would be better to keep these aliases in a seperate file. Firstly because it is easier to edit, and secondly because it is awesome for portability. If you have certain aliases you use a lot, push the file to version control and keep access to it even on other systems.

We need to uncomment or add the following code to reference our not-yet-created bash_aliases file.

```
  if [ -f ~/.bash_aliases ]; then
  . ~/.bash_aliases
  fi
```

Which simply states that if the bash_aliases file is found, run the bash_aliases file - effectively including aliases created in the bash_aliases file.

Create the bash_aliases file

`sudo nano ~/.bash_aliases`

Copy the following code block (when in clipboard, rightclick on terminal editor window) and save the file (CTRL+X, Y, ENTER).

```
  # Bash alias definitions
  alias #@ALIAS@#='. /#@PATHNAME@#/#@SCRIPT@#'
```

After adding an alias we need to run the bashrc file.

`. ~/.bashrc`

From now on aliases defined in the bash_aliases file are permanent.

A good alias to add secondly is the one for rerunning the bashrc file

`sudo nano ~/.bash_aliases`

Add the following line:

`alias updatealiases='. ~/.bashrc'`

Save the file (CTRL+X, Y, ENTER).

Use `. ~/.bashrc` for the last time and you are ready to add more aliases.

Now, when you add a new alias you only have to run the `updatealiases` command.

## Executing aliases periodically

Sometimes you want a script to run at certain times, in this case we do not even have to reference the script - but simply use the alias.

### CRON

Start editing your cron configuration by running `crontab -e`.

```
  The time and date fields are:

         field          allowed values
         -----          --------------
         minute         0-59
         hour           0-23
         day of month   1-31
         month          1-12 (or names, see below)
         day of week    0-7 (0 or 7 is Sunday, or use names)
```

An example cron command would be:

`0 1 * * * . /#@PATHNAME@#/#@SCRIPT@#`

(remember the `.` is part of the command because it says `execute the script at the following path`.)

`<minute> <hour> <day_of_month> <month> <day_of_week> <command>`  

```
  0                                   |                minute
  1                                   |                hour
  *                                   |                any
  *                                   |                any
  *                                   |                any
  /#@PATHNAME@#/#@SCRIPT@#          |                command
```

This script runs on the 0th minute, every 1 hour, on any day, any month, and any day of the week. In other words, every hour, forever.

<script src='https://rawgit.com/midasvo/inputbinderjs/master/inputBinder.js'></script>
<script type='text/javascript'>
new inputBinder("pathname", ['div', 'p'], "#@PATHNAME@#", "dynamic-text-template-pathname");
new inputBinder("alias", ['div', 'p'], "#@ALIAS@#", "dynamic-text-template-alias");
new inputBinder("script", ['div', 'p'], "#@SCRIPT@#", "dynamic-text-template-script");
</script>
