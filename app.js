const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const request = require("request");
const { urlencoded } = require("body-parser");

const https = require("https");
app.use(express.static("Public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});




const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({apiKey: "5545dad5df53096ba9507136894c1ffb",server: "us13",});

app.post("/", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const subscribingUser = {
        password: password,
        email: email
    }

    const run = async () => {
        const response = await client.lists.addListMember("b2f71ca55a", {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            EMAIL: subscribingUser.email,
            PASSWORD: subscribingUser.password
          }
          
        });
        if (response.statusCode===200){
      
            res.send("Succesfully subscribing to our Newsletters");
          } else {
            res.send("Subcribing failed, please try again");
          }
       
          console.log(response);
        }
        run();
    
    console.log(email, password);

    // 5545dad5df53096ba9507136894c1ffb-us13 api mailchimp
    // audience id=b2f71ca55a
});

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server started");
});