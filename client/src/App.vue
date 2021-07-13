<template>
  <div class="left_side">
      <div class="app_title">forum.</div>
      <div class="navigation_menu">
        <NavigationBar></NavigationBar>
      </div>
    </div>

    <div class="middle">
      <router-view/>
    </div>

    <div class="right_side">
      <UserAccount></UserAccount>
      <ActivitiesBox></ActivitiesBox>
    </div>
</template>

<script>
// Left Side
import NavigationBar from "./components/NavigationBar.vue"

// Right Side
import UserAccount   from "./components/UserAccount.vue"
import ActivitiesBox from "./components/ActivitiesBox.vue"

export default {
  components: {
    NavigationBar,
    UserAccount,
    ActivitiesBox
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  :root {
    --dark-purple   : #171a3b;
    --light-purple  : #1c2246;
    --lighter-purple: #656c9e;
  }
  body {
    background-color: var(--dark-purple);
  }
  #app {
    display: grid;
    grid-template-columns: 2fr 8fr 3fr;
    background-color: var(--dark-purple);
  }
  .left_side {
    height: 100vh;
    background-color: var(--dark-purple);
    color: white;
  }
  .navigation_menu {
    position: fixed;
    background-color: var(--dark-purple);
    top: 9.2%;
    width: 15.4%;
    height: 100vh;
  }
  .app_title {
    font-size: 40px;
    margin: 15px 0 30px 40px;
    position: fixed;
    cursor: pointer;
  }
  .middle {
    background-color: var(--dark-purple);
    padding: 0px 30px 10px 30px;
  }
  .right_side {
    background-color: var(--dark-purple);
  }
</style>