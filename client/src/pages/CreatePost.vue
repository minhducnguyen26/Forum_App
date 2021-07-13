<template>
    <div class="create_post_page">
        <div class="form">
            <div class="create_post_form">
                <div class="main_title">
                    <div class="title">Create a Post for</div>
                    <div class="thread_name">{{ current_thread.name }}</div>
                </div>

                <div class="input_fields" @click="ready_to_create_new_post">
                    <div class="single_field">
                        <label for="Author">Author:</label>
                        <input type="text" v-model="post_author">
                    </div>
                    <div class="single_field">
                        <label for="Description">Description:</label>
                        <textarea cols="30" rows="2" v-model="post_body"></textarea>
                    </div>
                </div>

                <div class="action_buttons">
                    <MyButton @click="back_button_clicked_from_create_post_page">Back</MyButton>
                    <MyButton @click="create_new_post">Submit</MyButton>
                </div>
            </div>
        </div>

        <div class="message" v-show="display_message">
            <p>Your post is successfully created.</p>
            <div class="close_message_button" @click="close_message">
            <i class="las la-times"></i>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from "../components/MyButton.vue"
export default {
    components: {
        MyButton
    },
    props: {
        current_thread: Object
    },
    data() {
        return {
            // main url
            url: "https://code-school-forum-web-app.herokuapp.com",

            // default new post inputs
            post_author : "",
            post_body   : "",

            display_message: false
        }
    },
    methods: {
        //! Fetch methods 
            //* (POST)
        create_new_post() {
            this.display_message = false;
            // get the thread id to create new post to that specific thread
            let id = this.current_thread._id;

            // create new post object
            let new_post = {
                thread_id: id,
                author   : this.post_author,
                body     : this.post_body
            };

            fetch(`${this.url}/post`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(new_post)
            }).then((response) => {
                if(response.status == 400) {
                    response.json().then((data) => {
                        alert(data.msg)
                    })
                } else if(response.status == 200 || response.status == 201) {
                    // emit a function to Home to refresh the post list
                    this.$emit("new_post_created");
                    
                    // clear all inputs in the new thread input fields
                    this.post_author = "";
                    this.post_body   = "";

                    this.display_message = true;
                }
            });
        },
        //! Main methods
        back_button_clicked_from_create_post_page() {
            this.$emit("go_home_from_create_post");
            this.display_message = false;
        },
        close_message() {
            this.display_message = false;
        },
        ready_to_create_new_post() {
            this.display_message = false;
        }
    }
}
</script>

<style scoped>
    .create_post_form {
        background-color: var(--light-purple);
        color: white;
        margin: 30px 0;
        padding: 30px 40px;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input_fields {
        align-items: center;
    }

    .single_field {
        display: grid;
        grid-template-columns: 1fr 4fr;
        margin-top: 30px;
    }

    .single_field > label {
        display: flex;
        align-items: center;
        font-size: 20px;
    }

    .single_field > input, 
    .single_field > textarea{
        width: 400px;
        font-size: 20px;
        padding: 5px 15px;
        border-radius: 5px;
        border: none;
        margin-left: 25px;
    }

    .action_buttons {
        padding: 0;
        width: 500px;
    }
    
    textarea {
        max-width: 400px;
        min-height: 40px;
    }
    .message {
        border: 1px solid white;
        padding: 10px 40px;
        font-size: 20px;
        background-color: var(--lighter-purple);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 600px;
        margin: 0 auto 20px;
        animation: slide_in 0.5s ease;
    }

    .close_message_button {
        font-size: 25px;
        margin-left: 40px;
    }

    .close_message_button:hover {
        cursor: pointer;
        color: var(--dark-purple)
    }

    .form {
        animation: slide_in 0.5s ease;
    }
    .main_title > .title {
        font-size: 30px;
        display: flex;
        justify-content: center;
    }
    .main_title > .thread_name {
        font-size: 20px;
        display: flex;
        justify-content: center;
    }
</style>