---
layout: dynamic_post
title:  "Apache2 Virtual Hosts with Ubuntu 16.04"
date:   2017-10-16 01:39:50
categories: jekyll apache2 virtual hosts vh ubuntu 16 16.04
description: "Virtual hosts exampled"
status: draft

images:

  - url: /assets/images/bash/shebang.png
    alt: Bash
    title: bash

---

*Work in progress (update/expansion) since 20-01-2018*

## Intro

Before we can complete this:

- [We need a domain name]()
- [We need to setup DNS]()
- [We need a server]()
- [We need to install Ubuntu 16.04]()
- [We need to SSH into the server]()
- [We need to make a user]()

We will first configure the server so we can create one Virtual Host directed at a DocumentRoot. After that you will find a small section with the commands to quickly create new Virtual Hosts knowing that the server is fully configured. However, the DocumentRoot method is not the only way to setup Virtual Hosts. Sometimes you have an application running on a specific port - think of Python and Node.js applications.

You will find that when you play around a lot with these Virtual Hosts (maybe you have a ton of side-projects...) that there is a need to automate this process using scripting. I do recommend you do not skip ahead to that section but try to understand what you are doing. If you are new to Linux (server) administration make sure you get a good grasp of the commands and terminology that is used. I try to include in-depth sources, but that is still a work in progress.

Do not worry about not understanding everything when you start out, you can practically copy paste through the steps and you will have a working Virtual Host.  

Lastly there is a reference to a different article on how to setup encryption (TLS/SSL) using LetsEncrypt.

#### Customization

You can customize the guide by altering the desired website name in the text box below, the guide will use that instead of the example.

<span>Website: </span><input type="text" id="websitename" name="websitename" value="website.tld" />


## Installation & configuration

Update the repositories and install apache2 (some may prefer nginx, but this guide focuses on apache2 - beware there are definitive differences between the two).

`sudo apt-get update`

`sudo apt-get install apache2 -y`

It is common practice to place the DocumentRoot of apache2 website in the `/var/www/` directory. Within that directory you create separate directories for the different Virtual Hosts you intend to create.

`sudo mkdir -p /var/www/#@WEBSITE@#`

We change the ownership and permissions using [chown](https://linux.die.net/man/1/chown) and [chmod](https://linux.die.net/man/1/chmod).

`sudo chown -R $USER:$USER /var/www/#@WEBSITE@#`

`sudo chmod -R 755 /var/www`

Since this is our first website, we will add a simple `index.html` file to our DocumentRoot.

`sudo nano /var/www/#@WEBSITE@#/index.html`

*If you do not have [nano](https://help.ubuntu.com/community/Nano) you can install it using apt `sudo apt-get install nano` but you can use any editor you like.*

##### [index.html](/assets/scripts/VirtualHostsWithUbuntu1604/index.html)

```
<html>
  <body>
    <div>#@WEBSITE@#!</div>
  </body>
</html>
```

In order to activate apache2 sites we need to add a .conf file to the `sites-available` directory. We can make a copy of the default .conf file and rename it using the following command.

`sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/#@WEBSITE@#.conf`

Before we can activate the .conf file we need to amend some variables, open the file using nano.

`sudo nano /etc/apache2/sites-available/#@WEBSITE@#.conf`

```
    ServerAdmin admin@#@WEBSITE@#
    ServerName #@WEBSITE@#
    ServerAlias www.#@WEBSITE@#
    DocumentRoot /var/www/#@WEBSITE@#
```
The `ServerName`, `ServerAlias`, and `DocumentRoot` variables are the most important. Apply changes and hit `CTRL+X` enter `Y` and hit return. The file is saved and we can activate the site using `a2ensite`.

`sudo a2ensite #@WEBSITE@#.conf`

Remove the default .conf using the `a2dissite` command.

`sudo a2dissite 000-default.conf`

Restart apache2 and the Virtual Host is running!

`sudo systemctl restart apache2`

Browse to #@WEBSITE@# and lo and behold, we have a Virtual Host.

## Quickly adding new Virtual Hosts

We have now setup apache2 and added our first Virtual Host, the next one will be much easier!

<span>Second website: </span><input type="text" id="websitename2" name="websitename2" value="website2.tld" />

### Generating creation scripts

If you have a bunch of Virtual Hosts to create, it would be much easier to generate the scripts. You can write these scripts yourself using bash, or you can use a small utility I have created. [Click here to open the 'VHGenerator'](https://apps.midasvo.nl/VHGenerator). I plan to create an article detailing the process, for now the [Github repo](https://github.com/midasvo/VHGenerator) will have to do.

### Quick commands

Coming ASAP.
