<template>
  <div class="home">
    <div class="filter_bar" v-show="current_thread === '' ">
      <p>Filter threads:</p>
      <select v-model="selected_category" @click="toggle_no_thread_found_message">
        <option v-for="category in categories" :key="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="main_content_for_threads" v-show="current_thread === ''">

      <div class="thread_wrapper slide_up_animation" 
        v-for="thread in sorted_threads" :key="thread._id">

        <RankingandDelete @delete_button_clicked="delete_one_thread(thread._id)"></RankingandDelete>

        <div class="thread_content">
          <div class="thread_name" @click="get_all_posts_of_one_thread(thread)">
            {{ thread.name }}
          </div>
          <div class="thread_description"> {{ thread.description }}</div>
                            
          <div class="thread_content_tail">
            <div class="thread_author">@{{ thread.author }}</div>
            <div class="thread_category_wrapper">
                <p>Category:</p>
                <div class="thread_category">{{ thread.category }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="no_thread_found slide_up_animation" 
        v-if="show_no_thread_found_message">
        <MessageBox title="No thread found for this category"
          :button_list="['Create Thread']"></MessageBox>
      </div>
      
    </div>

    <div class="main_content_for_posts" v-show="current_thread !== ''">
      <div class="post_found" v-if="!no_post_found">
        <div class="title">
          <p>All posts found for</p>
          <div class="selected_thread_name">{{ current_thread.name }}</div>
        </div>
        <div class="posts_wrapper slide_up_animation" 
          v-for="post in all_posts_of_one_thread" :key="post._id">
          
          <RankingandDelete @delete_button_clicked="delete_one_post(post)"></RankingandDelete>

          <div class="post_infos">
            <div class="post_author">
              <p>Author:</p>
              <div class="author_name">@{{ post.author }}</div>
            </div>
            <div class="post_body">
              <p>Body:</p>
              <div class="body_content">{{ post.body }}</div>
            </div>
          </div>
        </div>

        <div class="action_buttons slide_up_animation">
          <MyButton @click="go_back_from_view_posts">Back</MyButton>
          <MyButton>Create Post</MyButton> 
        </div>
      </div>

      <div class="post_not_found">
        <MessageBox v-if="no_post_found"
          title="No post found for"
          :thread_name="current_thread.name"
          :button_list="['Back', 'Create Post']"
          @action_from_message_box="action_for_specific_button"></MessageBox>
      </div>
    </div>
  </div>
</template>

<script>
import RankingandDelete from "../components/RankingandDelete.vue"
import MessageBox   from "../components/MessageBox.vue"
import MyButton from "../components/MyButton.vue"

export default {
  components: {
    RankingandDelete,
    MessageBox,
    MyButton
  },
  data() {
    return{
      // main url
      url: "http://forum2021.codeschool.cloud",

      // category options
      // category options
      categories: [
        "All", "Clothing", "Hunting", "Books", "Cards", "Coins",
        "Keychains", "Comic Books", " Misc."
      ],

      // all threads -- the data will be retrieved from the server
      threads: [],

      // the current thread that is visited at the moment
      current_thread: "",

      // all post of specific thread -- the data will be retrieved from the server
      all_posts_of_one_thread : [],

      // default values for selected category items
      selected_category : "All",

      // when the user click on a thread,
      // if there is no post for that thread,
      // the user can create a new post
      no_post_found: false,

      show_no_thread_found_message: false
    }
  },
  created() {
    // get all thread from the server
    this.get_all_threads_from_server();
  },
  methods: {
    //! Fetch methods
      //? Deal with Threads
    //* (GET ALL)
    get_all_threads_from_server() {
      fetch(`${this.url}/thread`).then((response) => {
        response.json().then((data) => {
          this.threads = data;
        })
      })
    },
    //* (DELETE)
    delete_one_thread(thread_id) {
      if(!this.current_thread) {
        fetch(`${this.url}/thread/` + thread_id, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"}
        }).then((response) => {
          this.get_all_threads_from_server();
        })
      }
    }, 

      //? Deal with Posts 
    //* (GET ALL)
    get_all_posts_of_one_thread(thread){
      this.current_thread = thread;

      fetch(`${this.url}/thread/${thread._id}`).then((response) => {
        response.json().then((data) => {
          this.all_posts_of_one_thread = data.posts;
          
          if(!this.all_posts_of_one_thread.length) {
            this.no_post_found = true;
          }
        })
      })
    },
    //* (DELETE)
    delete_one_post(post) {
      // specify the thread id where the post belongs
      let thread_id = post.thread_id;

      if(this.current_thread) {
        fetch(`${this.url}/post/${thread_id}/${post._id}`, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"}
        }).then((response) => {
          this.get_all_posts_of_one_thread(this.current_thread);
        })
      }
    },

    //! Main Functions
    go_back_from_view_posts() {
      this.current_thread = "";
      this.no_post_found = false;
    },
    action_for_specific_button(button) {
      if(button === "Back") {
        this.go_back_from_view_posts();
      }
      else if(button === "Create Post") {
        // call create post function
      }
    },
    toggle_no_thread_found_message() {
      this.show_no_thread_found_message = false;
      if(!this.sorted_threads.length) {
        this.show_no_thread_found_message = true;
      } else {
        this.show_no_thread_found_message = false;
      }
    }
  },
  computed: {
    sorted_threads() {
      let threads_list = this.threads;
      let selected_category = this.selected_category;

      if (selected_category == "All") {
        return threads_list;
      } else {
        let sorted_threads = threads_list.filter(function(thread) {
          return thread.category.toLowerCase() === selected_category.toLowerCase();
        })
        return sorted_threads;
      }
    }
  } 
}
</script>

<style scoped>
  .filter_bar {
      color: white;
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      padding: 0px 15%;
  }

  .filter_bar > p {
      font-size: 25px;
  }

  .filter_bar > select {
      font-size: 17px;
      border-radius: 25px;
      padding: 5px 15px;
  }

  .filter_bar_and_main_content {
      background-color: var(--dark-purple);
      margin: 0 30px 30px;
  }

  .main_content_for_threads {
      margin-bottom: 15px;
  }

  .thread_wrapper, .posts_wrapper {
      background-color: var(--light-purple);
      margin-top: 25px;
      border-radius: 25px;
      padding: 30px 40px;
      color: white;
      display: grid;
      grid-template-columns: 1fr 9fr; 
  }

  .thread_wrapper:last-child {
      margin-bottom: 25px;
  }

  .thread_name {
      font-size: 23px;
      cursor: pointer;
  }

  .thread_description {
      font-size: 14px;
      margin-top: 15px;
  }

  .thread_author {
      margin-top: 15px;
      font-size: 14px;
      color: var(--lighter-purple);
  }

  .thread_content_tail {
      display: flex;
      justify-content: space-between;
      padding-right: 40px;
      align-items: center;
  }

  .thread_category_wrapper {
      display: grid;
      grid-template-columns: 2fr 3fr;
      font-size: 14px;
  }

  .thread_category_wrapper > p {
      display: flex;
      align-items: center;
      margin-right: 10px;
      font-size: 17px;
  }

  .thread_category {
      border: 1px solid;
      background-color: #dddddd;
      color: var(--dark-purple);
      padding: 5px 10px;
      border-radius: 25px;
  }
  .post_author {
      display: flex;
  }
  p {
      font-size: 20px;
  }
  .author_name{ 
      display: flex;
      align-items: center;
      margin-left: 15px;
  }
  .post_body > p {
      margin: 10px 0;
  }
  .title {
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
  }
  .title > p {
      font-size: 30px;
  }
  .selected_thread_name {
      font-size: 20px;
  }
</style>

<style>
  .slide_up_animation {
      animation-name: slide;
      animation-duration: 1s; 
      animation-fill-mode: forwards; 
  }
  @keyframes slide {
      0%   { transform: translate(0px, 100px); }
      100% { transform: translate(0px 0px); }
  }
</style>