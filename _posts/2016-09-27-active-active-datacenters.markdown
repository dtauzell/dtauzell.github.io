---
layout: post
title:  "Active Active Datacenters"
date:   2016-09-27 09:00:05 -0500
categories: programming
---
Having multiple datacenters active at the same time is becoming more and more common.  When we created a second, active, datacenter I quickly found there are a number of areas you need to take into account.  Here is some high-level information to think about when moving to active-ative.

### Replication Failures
How you actually replicate the database will depend on what you are using.  When we first started (using Oracle Golden Gate) we assumed that replication downtime would most likely come from network partitions but in reality there are other forms of failure.

|  Problem                       |  Mitigation Strategy          |
---------------------------------|-------------------------------|
|  Configuration errors          | Good change management, automation |
|  Disk IO performance           | Careful monitoring              |          
|  Bugs in the replication software | Have a good test environment to replicate the issue|

### Load Balancing
You can load balance requests by having your DNS point to multiple datacenters and have a short time to live (TTL).  This will allow you to move traffic from one site to another. Keep in mind that not all clients will honor the TTL.  If you want to move traffic over more quickly you'll need to have proxy servers in each datacenters than can forward requests to other datacenters if needed.

### Application/Database Identifiers
Most applications need to create identifiers for various entities, for example unique internal user ids.  The easiest option is to use a [GUID][https://en.wikipedia.org/wiki/Globally_unique_identifier]  If you cannot do this you'll need some scheme for generating the identifiers so that they are different in each datacenter. A common approach is to use odd numbers in one datacenter and even in the other.  

### Eventual Consistency
Data inserted or updated in one datacenter won't be immediately available in the other datacenters.  If one request to your service updates or inserts data, you cannot assume a second request will see that update unless it goes to the same datacenter.  If users make updates and then expect to see them on subsequent requests you'll need to pin those requests to a single datacenter or proxy all read and write requests to a particular datacenter. You should look at all of your data and determine which updates need to be made in this manner.   If possible you'll want to know the lag time for data to be replicated.  Some products, such as Oracle Golden Gate, can give you lag metrics.  If you don't have that, you can update special records with update times and compare them in each datacenter.
