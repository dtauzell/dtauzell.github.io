---
layout: post
title:  "Active Active Datacenters"
date:   2016-09-27 09:00:05 -0500
categories: programming
---
Having multiple datacenters active at the same time is becoming more and more common.  When we created a second, active, datacenter I quickly found there are a number of areas you need to take into account.  I'm going to try and summarize those here.

### Replication Failures
How you actually replicate the database will depend on what you are using.  When we first started (using Oracle Golden Gate) we assumed that replication downtime would most likely come from network partitions but in reality there are other forms of failure.

|  Problem                       |  Mitigation Strategy          |
---------------------------------|-------------------------------|
|  Configuration errors          | Good change management, automation |
|  Disk IO performance           | Careful monitoring              |          
|  Bugs in the replication software | Have a good test environment to replicate the issue|


### Application/Database Identifiers

Most applications need to create identifiers for various entities, for example unique internal user ids.  If you can, use UUIDs.  If you cannot do this you'll need some scheme for generating the identifiers so that they are different in each datacenter. A common approach is to use odd numbers in one datacenter and even in the other.  If you plan to support more than two datacenters you can use NUMBER modulo N where N is a unique number for each datacenter.  So DC1 gets NUMBER%1, DC2 gets NUMBER%2 and DC3 gets NUMBER%3.     


### Eventual Consistency
