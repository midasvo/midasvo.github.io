---
layout: post
title:  "Bash"
date:   2017-10-16 01:39:50
categories: jekyll bash
description: "How to #! it."
status: draft

images:

  - url: /assets/images/bash/shebang.png
    alt: Bash
    title: bash

---
# Table of Contents
1. [Requirements](#requirements)
2. [Basics](#basics)

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

This chapter shows you the basics of how to move around a terminal, how to create a bash script, how to run a bash script, and how to alias the bash script. 

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

<script src='https://rawgit.com/midasvo/inputbinderjs/master/inputBinder.js'></script>
<script type='text/javascript'>
new inputBinder("pathname", ['div', 'p'], "#@PATHNAME@#", "dynamic-text-template-pathname");
new inputBinder("alias", ['div', 'p'], "#@ALIAS@#", "dynamic-text-template-alias");
new inputBinder("script", ['div', 'p'], "#@SCRIPT@#", "dynamic-text-template-script");
</script>

