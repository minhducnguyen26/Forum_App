<template>
  <div class="message_box">
    <div class="title">{{ title }}</div>
    <div class="thread_name" v-if="thread_name">{{ thread_name }}</div>
    <div class="action_buttons">
      <MyButton v-for="button in button_list" :key="button"
        @click="emit_action_name_to_the_parent(button)">
        {{ button }}
      </MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue"

export default {
  components: {
    MyButton
  },
  props: {
    title: String,
    thread_name: String,
    button_list: Array
  },
  methods: {
    emit_action_name_to_the_parent(button) {
      this.$emit("action_from_message_box", button);
    }
  }
}
</script>

<style scoped>
  .message_box {
    color: white;
    background-color: var(--light-purple);
    border-radius: 25px;
    padding: 30px 40px;
    margin-top: 30px;
  }
  .title {
    font-size: 30px;
    display: flex;
    justify-content: center;
  }
</style>

<style>
  .action_buttons {
      display: flex;
      justify-content: space-evenly;
      padding: 0 200px;
      margin-bottom: 20px;
  }
  .message_box > .thread_name {
    font-size: 20px;
    display: flex;
    justify-content: center;
  }
</style>