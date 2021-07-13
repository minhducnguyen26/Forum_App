<template>
  <div class="home">
    <!-- Filter Bar at the top of the page -->
    <div class="filter_bar" v-show="current_thread === '' && !show_create_post_page">
      <p>Filter threads:</p>
      <select v-model="selected_category" @click="toggle_no_thread_found_message">
        <option v-for="category in categories" :key="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- THREADS -->
    <div class="main_content_for_viewing_threads" v-show="current_thread === '' && !show_create_post_page">

      <transition name="switch_transition" mode="out-in">
        <div class="if_thread_found" v-if="!show_no_thread_found_message">
          <transition-group name="list_transition" appear>
            <div class="thread_wrapper" 
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
          </transition-group>
        </div>

        <div class="no_thread_found" v-else>
          <MessageBox title="No thread found for this category"
            :button_list="['Create Thread']"
            @action_from_message_box="need_to_create_thread"></MessageBox>
        </div>
      </transition>

    </div>

    <!-- POSTS -->
    <div class="main_content_for_viewing_posts" v-show="current_thread !== '' && !show_create_post_page">
      <div class="post_found" v-if="!show_no_post_found_message">
        <div class="title">
          <p>All posts found for</p>
          <div class="selected_thread_name">{{ current_thread.name }}</div>
        </div>

        <transition-group name="list_transition" appear>
          <div class="posts_wrapper" 
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
        </transition-group>

        <div class="action_buttons">
          <MyButton @click="go_back_from_view_posts">Back</MyButton>
          <MyButton @click="action_for_specific_button('Create Post')">Create Post</MyButton> 
        </div>
      </div>

      <div class="post_not_found" v-else>
        <MessageBox title="No post found for"
          :thread_name="current_thread.name"
          :button_list="['Back', 'Create Post']"
          @action_from_message_box="action_for_specific_button"></MessageBox>
      </div>
    </div>

    <div class="main_content_for_creating_post" v-show="show_create_post_page">
      <CreatePost :current_thread="current_thread"
        @go_home_from_create_post="close_create_post_page"
        @new_post_created="update_post_page"></CreatePost>
    </div>
  </div>
</template>

<script>
import RankingandDelete from "../components/RankingandDelete.vue"
import MessageBox   from "../components/MessageBox.vue"
import MyButton from "../components/MyButton.vue"
import CreatePost   from  "./CreatePost.vue"

export default {
  components: {
    RankingandDelete,
    MessageBox,
    MyButton,
    CreatePost
  },
  data() {
    return{
      // main url
      url: "https://code-school-forum-web-app.herokuapp.com",

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

      show_no_thread_found_message: false,
      show_no_post_found_message: false,

      show_create_post_page: false
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

          if (this.sorted_threads.length <= 1) {
            this.show_no_thread_found_message = true;
          }
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
            this.show_no_post_found_message = true;
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

    //! Main methods
    go_back_from_view_posts() {
      this.current_thread = "";
      this.show_no_post_found_message = false;
    },
    action_for_specific_button(button) {
      if(button === "Back") {
        this.go_back_from_view_posts();
      }
      else if(button === "Create Post") {
        this.show_create_post_page = true;
      }
    },
    toggle_no_thread_found_message() {
      this.show_no_thread_found_message = false;
      if(!this.sorted_threads.length) {
        this.show_no_thread_found_message = true;
      } else {
        this.show_no_thread_found_message = false;
      }
    },
    need_to_create_thread(button) {
      if(button == "Create Thread") {
        this.$router.push({
          path: "/CreateThread"
        })
      }
    },
    close_create_post_page() {
      this.get_all_posts_of_one_thread(this.current_thread);
      this.show_create_post_page = false;
    },
    update_post_page() {
      this.get_all_posts_of_one_thread(this.current_thread);
      this.show_no_post_found_message = false;
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

  .main_content_for_viewing_threads {
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
      margin-bottom: 10px;
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

  /* List Transition */ 
  .list_transition-enter-from,
  .list_transition-leave-to {
    opacity: 0;
    transform: scale(0.6);
  }
  .list_transition-enter-to,
  .list_transition-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  .list_transition-enter-active {
    transition: all 0.4s ease;
  }
  .list_transition-leave-active {
    transition: all 0.4s ease;
    position: absolute;
  }
  .list_transition-move {
    transition: all 0.3s ease;
  }

  /* Switch Transition */
  .switch_transition-enter-from,
  .switch_transition-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  .switch_transition-enter-to,
  .switch_transition-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .switch_transition-enter-active,
  .switch_transition-leave-active {
    transition: all 0.4s ease;
  }

  /* Slide up animation */
  .action_buttons {
    animation: slide_up 0.5s ease;
  }
  @keyframes slide_up {
   0% {
     opacity: 0;
     transform: translateY(1000px);
   } 
   100% {
     opacity: 1;
     transform: translateY(0);
   }
  }
  /* Slide down and wobble animation */
  .post_not_found {
    animation: wobble_down 0.5s ease;
  }
  @keyframes wobble_down {
    0% {
      opacity: 0;
      transform: translateY(-60px);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    60% {
      transform: translateX(-10px);
    }
    70% {
      transform: translateX(-10px);
    }
    80% {
      transform: translateX(-5px);
    }
    90% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }

  /* Fade-in animation */
  .title {
    animation: fade_in 0.5s ease;
  }

  @keyframes fade_in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>