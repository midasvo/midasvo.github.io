---
layout: post
title:  "Real-Time Datawarehousing"
date:   2016-01-28 01:39:50
categories: jekyll blog tutorial
description: "What is real-time datawarehousing, why would you use it, and how it works"
status: draft
---

A real-time datawarehouse is a datawarehouse which is continuously up-to-date with the sources, be it another database, flat file sources, you name it. The endgame is to increase the responsivity of the OLAP tool. So how do we accomplish real-time datawarehousing? In this article I will try to explain how it is done as well as the why. 

A traditional datawarehouse loads new information from the source periodically. The frequency of the 'refresh' varies, most companies opt for daily but some datawarehouses only need to be updated monthly or even yearly. When this refresh is running, the datawarehouse and OLTP systems need to be brought down for a short period in order to efficiently run the queries – which can get quite heavy. These refreshes or synchronisations are run at times where there are no users online, usually at certain hours in the night. You do not want to strain the system too much during the day when it is used, unless you like to get angry calls. Running it during the night allows management to consult the OLAP tool in the morning with data from yesterday and back. 

Because of the developments in processing power, storage capacity, and the growth of the Business Intelligence profession the possibility to apply BI in unknown territory has arose. There are a lot of new areas to explore where real-time information could become critical. Think of doctors having real-time information, strategising mobile emergency services, or agriculture. By expanding on real-time datawarehousing you create the possibility for automated solutions, caveat being reliable information. 

The future looks bright but it's time for a reality check. Literal 'real-time' datawarehousing is not yet possible, we can only speak of near real-time datawarehousing. Do not despair, there are a couple of tricks to achieve a workable solution. In essence, real-time datawarehousing is the incremental loading of fresh data. But what is the purpose of a datawarehouse again? To provide for the OLAP tool. This means there's another layer to it, however tools like Qlikview are well equipped to handle this. By using the RAM memory they can be lightning quick.


Let's get to the core of the matter: Events. Instead of loading data using a periodical ETL proces we can use Oracle's CDC module. Change Data Capture identifies changes and captures the data before making it available. 

[cdc.png image]



               