---
layout: post
title:  "Setting up Letsencrypt on Ubuntu 16.04"
date:   2017-10-16 01:39:50
categories: jekyll apache2 virtual hosts vh ubuntu 16 16.04 letsencrypt
description: "Easily setup HTTPS on your websites by using Letsencrypt with Apache2 on Ubuntu 16.04!"
status: draft

images:

  - url: /assets/images/bash/shebang.png
    alt: Bash
    title: bash

---


#### Customization

You can customize the guide by altering the desired website name in the text box below, the guide will use that instead of the example.

<span>Website: </span><input type="text" id="websitename" name="websitename" value="website.tld" />


## Intro

Easily setup HTTPS on your websites by using Letsencrypt with Apache2 on Ubuntu 16.04!

# Quick-guide

Add the cerbot repository

`sudo add-apt-repository ppa:certbot/certbot`

Update

`sudo apt-get update`

Install certbot

`sudo apt-get install python-certbot-apache -y`

`sudo certbot --apache -d #@WEBSITE@#`

Setup renewal

`sudo crontab -e`

Add the following and save:

`0 * * * * /usr/bin/certbot renew --quiet`

This runs the 'certbot renew --quit' command every 0th minute, aka every hour. You can change the time [here](https://crontab.guru/every-1-hour).

<script src='https://rawgit.com/midasvo/inputbinderjs/master/inputBinder.js'></script>
<script>
var inputBinder = new inputBinder("websitename", ['code'], "#@WEBSITE@#", "dynamic-text-template");
</script>
