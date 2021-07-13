<template>
  <div class="create_thread_page">
    <div class="form">
      <div class="create_thread_form">
        <div class="title">Create a thread</div>

        <div class="input_fields" @click="ready_to_create_new_thread">
          <div class="single_field">
            <label for="Name">Name:</label>
            <input type="text" v-model="new_name">
          </div>

          <div class="single_field">
            <label for="Author">Author:</label>
            <input type="text" v-model="new_author">
          </div>
                    
          <div class="single_field">
            <label for="Description">Description:</label>
            <textarea cols="30" rows="2" v-model="new_description"></textarea>
          </div>
                    
          <div class="single_field">
            <label for="Category">Category:</label>
              <select v-model="new_category">
                <option v-for="category in categories" :key="category">
                  {{ category }}
                </option>
              </select>
          </div>
        </div>

        <div class="action_buttons">
          <MyButton @click="go_home_from_create_thread">Back</MyButton>
          <MyButton @click="create_new_thread">Submit</MyButton>
        </div>
      </div>
    </div>

    <div class="message" v-show="display_message">
      <p>Your thread is successfully created.</p>
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
  data() {
    return {
      // main url
      url: "http://localhost:8080",

      // category options
      categories: [
        "All", "Clothing", "Hunting", "Books", "Cards", "Coins",
        "Keychains", "Comic Books", " Misc."
      ],
      // default new thread inputs
      new_name        : "",
      new_author      : "",
      new_description : "",
      new_category    : "All",

      display_message: false
    }
  },
  methods: {
    //! Fetch methods
      //* (POST)
    create_new_thread() {
      // create a new thread object
      let new_thread = {
        name       : this.new_name,
        author     : this.new_author,
        description: this.new_description,
        category   : this.new_category
      };

      fetch(`${this.url}/thread`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(new_thread)
      }).then((response) => {
        if(response.status == 400) {
          response.json().then((data) => {
            alert(data.msg)
          })
        } else if(response.status == 201) {
          // clear all inputs in the new thread input fields
          this.new_name        = "",
          this.new_author      = "",
          this.new_description = "",
          this.new_category    = "All"

          // display a success message
          this.display_message = true;
        }
      });
    },

    //! Main methods
    go_home_from_create_thread() {
      this.$router.push({
        path: "/"
      })
    },
    close_message() {
      this.display_message = false;
    },
    ready_to_create_new_thread() {
      this.display_message = false;
    }
  }
}
</script>

<style scoped>
  .create_thread_form {
      background-color: var(--light-purple);
      color: white;
      margin: 30px 0;
      padding: 30px 40px;
      border-radius: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .create_thread_form > .title {
      font-size: 30px;
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
  .single_field > textarea,
  .single_field > select {
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
</style>

<style>
  @keyframes slide_in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>