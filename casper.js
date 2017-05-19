var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
        pageSettings: {
         loadImages:  false,         // The WebPage instance used by Casper will
         loadPlugins: false,         // use these settings
         
    }
});

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});


casper.start('https://www.facebook.com', function() {
    console.log("page loaded");
    this.test.assertExists('form#login_form', 'form is found');
    this.fill('form#login_form', {
        email : 'ouioui_81@hotmail.com',
        pass : "xxxxx"
    }, true)
});

casper.thenEvaluate(function(){
   console.log("Page Title " + document.title);
   console.log("Your name is " + document.querySelector('.fbxWelcomeBoxName').innerHTML); 
});

// casper.then(function() {
//     this.fill('selector', {
//     'email' : 'ouioui_81@hotmail.com',
//     'pass' : "xxxx"
//     })
// }, submit);

// casper.thenOpen('http://phantomjs.org', function() {
//     this.echo('Second Page: ' + this.getTitle());
// });

casper.run();