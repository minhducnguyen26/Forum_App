<template>
    <div class="my_button"><slot></slot></div>
</template>

<style scoped>
    .my_button {
        display: flex;
        justify-content: center;
        border: 1px solid;
        border-radius: 25px;
        padding: 10px 40px;
        font-size: 18px;
        margin-top: 40px;
        color: white
    }
    .my_button:hover {
        cursor: pointer;
        background-color: var(--lighter-purple);
    }
</style>