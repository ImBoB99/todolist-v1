const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    const day = date.getDate();
    // pass ejs variable "kindOfDay" with value of variable "day" to the list.ejs file
    res.render("list", {
        listTitle: day,
        newListItems: items
    });

});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
})

app.post("/work", function (req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function (req,res) {
    res.render("about");
});


// receive the value from the text input from the form
app.post("/", function (req, res) {
    const item = req.body.newItem;
    //if input contains value then push it into array
    if (item !== "") {
        if (req.body.list === "Work") {
            workItems.push(item);
            res.redirect("/work");
        } else {
            items.push(item);
            // when post request is triggered, saves value of text box and redirect to home route
            res.redirect("/");
        }
    }
})

app.listen(3000, function () {
    console.log("Server running port 3000")
});

//app.use(express.urlencoded({ extended: true })); USE EXPRESS'S BODY PARSING