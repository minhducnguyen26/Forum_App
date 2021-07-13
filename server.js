//! API end points (express stuff)

//? Express
const express = require("express");
const app = express();
app.use(express.json({}));

//? Cors
const cors = require("cors");
app.use(cors());

//? Thread model
const Thread = require("./model");

//! Middleware
app.use((req, res, next) => {
    console.log("");
    console.log("===============================================================================================")

    // Date and Time format
    let date    = new Date().toLocaleDateString("en-US") + " at ";
    let hours   = new Date().getHours().toString() + ":";
    let minutes = new Date().getMinutes().toString() + ":";
    let seconds = new Date().getSeconds().toString();
    let time    = date + hours + minutes + seconds;
    console.log("Time  :", time);

    console.log("Method:", req.method);
    console.log("Path  :", req.originalUrl);
    console.log("Body  :", req.body);
    console.log("");
    next();
})

//! THREADS
//* GET - Get all threads
app.get("/thread", function(req, res) {
    res.setHeader("Content-Type", "application/json");

    console.log("Getting all threads from the database.");

    // Find all threads from the Thread model
    Thread.find({}, function(error, threads) {
        // check if there is any error
        if(error) {
            console.log("There was an error getting all threads: ");
            console.log(error);

            // Sending back the error
            res.status(500).json({
                message: "Unable to get all threads",
                error  : error
            });
            return
        }  
        // Success! Return all threads
        res.status(200).json(threads);
        if(threads.length) {
            console.log(`Found ${threads.length} items in the list.`)
        } else {
            console.log("The list is empty, add something first.")
        }
    })
})

//* GET - Get one thread by id
app.get("/thread/:id", function(req, res) {
    res.setHeader("Content-Type", "application/json");

    console.log(`Getting one thread with id: ${req.params.id}.`);

    Thread.findById(req.params.id, function(error, thread) {
        // check if there is an error
        if(error) {
            console.log(`There was an error getting a thread with id ${req.params.id}`);
            console.log(error);

            // sending back the error
            res.status(500).json({
                message: `Unable to get a thread with id: ${req.params.id}`,
                error  : error
            });
            return
        // check if the thread actually exists
        } else if(thread === null) {
            console.log(`There was an error finding a thread with id: ${req.params.id}`);
            console.log(error);

            // sending back the error
            res.status(404).json({
                message: `Unable to find a thread with id: ${req.params.id}`,
                error  : error
            });
            return
        }
        // success! return the thread
        res.status(200).json(thread);
    })
})

//* POST - Create one thread
app.post("/thread", function(req, res){
    res.setHeader("Content-Type", "application/json");
    
    console.log("Creating new thread with body:", req.body);

    // Validation
    if(!req.body.name || !req.body.description || !req.body.author || !req.body.category) {
        res.status(400).json({
            message: "Missing information in the body",
        });
        console.log("There is missing information in the body");
        return
    }
    
    // Format of the thread that will be created
    let new_thread_object = {
        name       : req.body.name,
        description: req.body.description,
        author     : req.body.author,
        category   : req.body.category
    }

    Thread.create(new_thread_object, function(error, thread) {
        // check if there is any error
        if(error) {
            console.log("Unable to create new thread.");
            console.log(error);

            res.status(500).json({
                message: "Unable to create thread",
                error: error
            });
            return
        }
        // success! return the thread after creating it
        res.status(201).json(thread);
    })
})

//* DELETE - Delete on thread by id
app.delete("/thread/:id", function(req, res) {
    res.setHeader("Content-Type", "application/json")

    console.log(`Deleting one thread with id: ${req.params.id}.`);
    
    Thread.findByIdAndDelete(req.params.id, function(error, thread) {
       // check if there was an error
       if(error) {
        console.log(`There was an error deleting a thread with id ${req.params.id}`);
        console.log(error);

        // sending back the error
        res.status(500).json({
            message: `Unable to find a thread with id: ${req.params.id}`,
            error  : error
        });
        return
        } 
        // check if the thread actually exists
        else if(thread === null) {
            console.log(`There was an error finding a thread with id ${req.params.id}`);
            console.log(error);

            // sending back the error
            res.status(404).json({
                message: `Unable to find thread with id: ${req.params.id}`,
                error  : error
            });
            return
        }
        // success! return thread that was deleted
        res.status(200).json(thread)
    }) 
})

//! POSTS
//* POST - Create one post
app.post("/post", function(req, res) {
    res.setHeader("Content-Type", "application/json");

    console.log("Creating new post with body:" , req.body);

    // Validation
    if(!req.body.thread_id || !req.body.author || !req.body.body) {
        res.status(400).json({
            message: "Missing information in the body",
        });
        console.log("There is missing information in the body");
        return
    }

    let new_post_object = {
        thread_id: req.body.thread_id,
        author   : req.body.author,
        body     : req.body.body
    };
    
    Thread.findByIdAndUpdate(req.body.thread_id, // (*)
        // append new_post_object to the posts list inside of a thread
        // at a specific id (*)
        {
            $push: { posts: new_post_object }
        }, 
        // get the latest updated version of the thread
        // the post is now added to the posts list
        {
            new: true
        },
        function(error, thread) {
            // check if there is any error
            if(error) {
                console.log("Unable to create new post.");
                console.log(error);

                // sending back the error
                res.status(500).json({
                    message: "Unable to create post",
                    error: error
                });
                return
            }
            // check if the thread actually exists
            else if(thread === null) {
                console.log("Unable to find thread with id:", req.body.thread_id);

                // sending back the error
                res.status(404).json({
                    message: "Unable to find thread",
                    error: error
                })
            }
            // success! return the post after creating it
            // the post that is just created is added at the end of the posts list
            res.status(201).json(thread.posts[thread.posts.length - 1]);
    })
})

//* DELETE - Delete one post by the thread id
app.delete("/post/:thread_id/:post_id", function(req, res) {
    res.setHeader("Content-Type", "application/json");

    console.log(`Delete the post with id: ${req.params.post_id} in thread with id: ${req.params.thread_id}.`);

    Thread.findByIdAndUpdate(req.params.thread_id, // (*) 
        // take one post with a specific id (#) out of the list of posts
        // from a thread with a specific id (*)
        {
            $pull: { 
                posts: {
                    _id: req.params.post_id // (#)
                }
            }
        },
        function(error, thread) {
            // check if there was an error
            if(error) {
                console.log(`There was an error deleting a post with id ${req.params.post_id}`);
                console.log(error);

                // sending back the error
                res.status(500).json({
                    message: `Unable to delete a post with id: ${req.params.post_id}`,
                    error  : error
                });
                return
            } 
            // check if the thread actually exists
            else if(thread === null) {
                console.log(`There was an error finding a thread with id ${req.params.thread_id}`);
                console.log(error);

                // sending back the error
                res.status(404).json({
                    message: `Unable to find thread with id: ${req.params.thread_id}`,
                    error  : error
                });
                return
            }
            // If there is no error and the thread exists
            let target_post;
            thread.posts.forEach((post) => {
                if(post._id == req.params.post_id) {
                    target_post = post;
                }
            })
            // check if the post actually exists
            if(target_post == undefined) {
                console.log(`There was an error finding a post with id ${req.params.post_id}`);
                console.log(error);

                // sending back the error
                res.status(404).json({
                    message: `Unable to find post with id: ${req.params.post_id}`,
                    error  : error
                });
                return
            }
            // success! return the post that was deleted
            res.status(200).json(target_post)
        })
})


//! Handle production
if (process.env.NODE_ENV === "production") {
    //* Static folder
    app.use(express.static("public"));

    //* Handle SPA
    app.get(/.*/, (req, res) => res.sendFile("public/index.html"));
}

module.exports = app;