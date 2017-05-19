var casper = require('casper').create({
    verbose: true,
    logLevel: 'info',
    pageSettings: {
        loadImages: true,         // The WebPage instance used by Casper will
        loadPlugins: true,         // use these settings
        cookiesEnabled: true,
        javascriptEnabled: true
        // userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
});

phantom.cookiesEnabled = true;

// print out all the messages in the headless browser context
// casper.on('remote.message', function (msg) {
//     this.echo('remote message caught: ' + msg);
// });

// casper.on("url.changed", function () {
//     this.then(function () {
//         this.echo("Page Title: " + this.getTitle());
//     });
// });

// print out all the messages in the headless browser context
// casper.on("page.error", function(msg, trace) {
//     this.echo("Page Error: " + msg, "ERROR");
// });

var url = 'https://www.facebook.com/';

casper.userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36');

casper.start(url, function () {
    casper.userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36');
    phantom.cookiesEnabled = true;
    console.log("Page Loaded: " + this.getTitle());
    this.capture('PageLoaded.png');
});

// this.waitForSelector('form#login_form');

casper.thenBypassIf(function () {
    console.log("Test current page name : " + this.getTitle());
    return this.getTitle() === "Facebook";
}, 1);

casper.then(function () {
    casper.userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36');
    console.log("fill login form...");
    this.waitForSelector('form#login_form');
    this.fill('form#login_form', {
        email: 'xxxx@hotmail.com',
        pass: 'xxxxxxx'
    }, true);
});

casper.then(function () {
    casper.userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36');
    console.log("Make a screenshot and save it as AfterLogin.png");
    this.wait(2000, function () {
        console.log("Capture after login");
        this.capture('AfterLogin.png');
    });//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
});

casper.thenEvaluate(function () {
    this.log("logging test", "info");
    // console.log("Evaluate");
    // document.querySelector(".fbxWelcomeBoxName").innerHTML;
    // console.log("Page Title 2");
    // console.log("Your name is " + document.querySelector(".fbxWelcomeBoxName").innerHTML);
});

casper.run();



