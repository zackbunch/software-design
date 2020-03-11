**CSCI 5300, Spring 2020.   Instructor: Phil Pfeiffer**

**Assignment 03:   International Storytelling Center publish-subscribe pattern, with implementation**

**Value:  20 points**

Terms:  as individuals

**Due date:  Friday, 21 February, 2020**

**Assignment**.   For the ISC scenario that we covered in class on 29 January and 5 February, design and implement a program that simulates the operation of a publish-subscribe service for the ISC.  Your simulated publish-subscribe service should do the following:

- .Provide a means by which a user can populate the service with a simulated tell record: i.e., data records that include
- .A unique ID
- .The title of a tell
- .The name of a teller
- .One keyword for the tell
- .Provide a means by which a user can populate the service with simulated subscription requests: i.e., data records that include
- .The name of a subscriber
- .Either an indication of a tell title of interest, or an indication that any title is acceptable for this request
- .Either the name of a teller of interest, or an indication that any title is acceptable for this request
- .Either a keyword of interest, or an indication that any keyword is acceptable for this request

While you can optionally provide a means of initializing your service with simulated tell records and subscription requests, you must also provide a means of incrementally adding tells and/or subscription requests.

Your service should, after ever new tell record and every new subscription request is added, generate a notification for all matches for every new record and/or new request that triggers at least one new notification.  A notification should be triggered whenever

- .a new tell record matches an existing subscription request: i.e.,
- .the tell&#39;s name matches the request&#39;s tell&#39;s title or the request is for any title
- .the tell&#39;s teller&#39;s name matches the request&#39;s teller&#39;s name or the request is for any teller
- .the tell&#39;s keyword matches the request&#39;s keyword or the request is for any keyword
- .a new subscription request matches an existing tell record : i.e.,
- .the tell&#39;s name matches the request&#39;s tell&#39;s title or the request is for any title
- .the tell&#39;s teller&#39;s name matches the request&#39;s teller&#39;s name or the request is for any teller
- .the tell&#39;s keyword matches the request&#39;s keyword or the request is for any keyword

**Deliverables:**

- .The name of any website(s) or other references from which you took starter code.  I&#39;m asking for this as a way of compensating for any bad luck you might have encountered, due to a website&#39;s providing bad advice.
- .A class diagram in .asta
- .The code for an implementation in a &quot;mainstream&quot; language that will run on a Windows 10 platform:  e.g., C, C++, C#, Java, Python.  If you want to code in something more exotic, ask.
- .An executable for your program.
- .Screenshots for a trial run.
- .Instructions on how to submit data for testing purposes.
