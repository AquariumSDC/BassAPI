# BassAPI
### Problem
BassAPI was in conjunction with an AGILE team of 3 engineers. This project aims to retrofit an existing API service for an eCommerce website. The service level agreements required 2000ms latency, 100 requests per second and less than 1% error rate.

### Approach
A relational database was chosen due to the highly structured nature of eCommerce data and improved query times to provide a better customer experience.

I handled the endpoints for a product details section of the website and so I needed to handle large volumes of data making it available fast. For this reason the SLA seemed to be too generous and so I aimed higher. 

The initial challenge was selecting a database. I considered MongoDB as a non-relational database but decided that a relational database would suite the ordered nature of the data better. This would save space from repeating key values and improve lookup times as headings have a defined space in memory.

When deciding on a specific SQL database I chose postgreSQL because I discovered that it has powerful aggregate functions. The frontend was already expecting the data in a specific format and my hypothesis was that combining tables within the database would be faster that fetching data and performing post-processing in JavaScript.

This proved to be the case. For some added context I started at query times of over 10 seconds. I added indexing which reduced these response times significantly to around 530ms. At this point I was not using aggregate or table joins. Once I implemented the aggregate functions, I further reduced the latency to 29ms for 650rps.

Finally, I deployed on AWS with a NGINX EC2 T2 Micro instance for load balancing and caching, 3 EC2 server instances and a single EC2 database instance. This resulted in 24ms latency and up to 3000 rps with 0% error

![Test Results](https://firebasestorage.googleapis.com/v0/b/personal-website-b4960.appspot.com/o/SDCresults.png?alt=media&token=a8c973a7-548f-4ec8-b00e-11fdcf5d48d4)
