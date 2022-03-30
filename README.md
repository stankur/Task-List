# Task List

What you could do with this project:

-   Add new tasks
-   Remove existing tasks
-   Update existing tasks
-   Track your progress!

Some other features:

-   Tasks are sorted based on date
-   All data are persisted even after you quit! (thanks to localstorage)
-   Statistics on tasks completion
-   Random wise words to keep you motivated (available thanks to the free quotes API provided by zenquotes.io)

To view **Task-List** live, click [here](https://stankur.github.io/Task-List/)

Note! Since I still want to build on this project, I need to use localhost very often to test the app. However, using localhhost would give me problems related to CORS when fetching wise words data from zenquotes.io. Hence, at the moment, I use a library which provides a proxy to avoid the CORS problems so that the wise words section of the web app could still show up.

So, to run this app in your own computer, you would need to set up the proxy by doing this in your terminal/command line:

```
npm install -g local-cors-proxy
```

```
lcp --proxyUrl https://zenquotes.io
```

If you want to see more info related to the CORS problems in more detail, I found [this particular article](https://medium.com/tribalscale/stop-cursing-cors-c2cbb4997057) pretty helpful for me.
