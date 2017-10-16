---
layout: post
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
- [We need a server]()
- [We need to install Ubuntu 16.04]()
- [We need to SSH into the server]()
- [We need to make a user]()

#### Customization

In the future you can enter the wbesite name here and the tutorial will use that in the examples

<span>Website: </span><input type="text" id="websitename" name="websitename" placeholder="website.tld" readonly />


## Quick-Guide

`sudo apt-get update`

`sudo apt-get install apache2 -y`

`sudo mkdir -p /var/www/website.tld`

`sudo chown -R $USER:$USER /var/www/website.tld`

`sudo chmod -R 755 /var/www`

`sudo nano /var/www/website/tld/index.html`

##### [index.html](/assets/scripts/VirtualHostsWithUbuntu1604/index.html)

```
<html>
  <body>
    <div>Website.tld!</div>
  </body>
</html>
```

`sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/website.tld.conf`

`sudo nano /etc/apache2/sites-available/website.tld.conf`

```
    ServerAdmin admin@website.tld
    ServerName website.tld
    ServerAlias www.website.tld
    DocumentRoot /var/www/website.tld
```

`sudo cp /etc/apache2/sites-available/website.tld.conf /etc/apache2/sites-available/website.tld.conf`

`sudo a2ensite website.tld.conf`

`sudo a2dissite 000-default.conf`

`sudo systemctl restart apache2`

