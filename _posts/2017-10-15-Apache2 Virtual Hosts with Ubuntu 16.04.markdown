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

## Intro

Before we can complete this:

- [We need a domain name]()
- [We need to setup DNS]()
- [We need a server]()
- [We need to install Ubuntu 16.04]()
- [We need to SSH into the server]()
- [We need to make a user]()

#### Customization

You can customize the guide by altering the desired website name in the text box below, the guide will use that instead of the example.

<span>Website: </span><input type="text" id="websitename" name="websitename" value="website.tld" />


## Quick-Guide

`sudo apt-get update`

`sudo apt-get install apache2 -y`

`sudo mkdir -p /var/www/#@WEBSITE@#`

`sudo chown -R $USER:$USER /var/www/#@WEBSITE@#`

`sudo chmod -R 755 /var/www`

`sudo nano /var/www/#@WEBSITE@#/index.html`

##### [index.html](/assets/scripts/VirtualHostsWithUbuntu1604/index.html)

```
<html>
  <body>
    <div>#@WEBSITE@#!</div>
  </body>
</html>
```

`sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/#@WEBSITE@#.conf`

`sudo nano /etc/apache2/sites-available/#@WEBSITE@#.conf`

```
    ServerAdmin admin@#@WEBSITE@#
    ServerName #@WEBSITE@#
    ServerAlias www.#@WEBSITE@#
    DocumentRoot /var/www/#@WEBSITE@#
```

`sudo a2ensite #@WEBSITE@#.conf`

`sudo a2dissite 000-default.conf`

`sudo systemctl restart apache2`