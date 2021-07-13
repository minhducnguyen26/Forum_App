<template>
    <div class="main_content_left_side">
        <div class="ranking">
            <div class="arrow_up">
                <i class="las la-caret-up"></i>
            </div>
            <div class="rank_number">{{ random_number }}</div>
            <div class="arrow_down">
                <i class="las la-caret-down"></i>
            </div>
        </div>
                            
        <div class="delete_button" @click="delete_button_clicked_from_components">
            <i class="las la-trash-alt"></i>    
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        delete_button_clicked_from_components() {
            this.$emit("delete_button_clicked")
        }
    },
    computed: {
        random_number() {
            return Math.floor(Math.random() * 100);
        }
    }
}
</script>

<style scoped>
    .ranking, .delete_button {
        display: flex;
        flex-direction: column;
        margin-right: 40px;
        font-size: 20px;
        align-items: center;
    }

    .delete_button {
        font-size: 30px;
        margin-top: 25px;
        color: var(--lighter-purple);
    }

    .delete_button:hover {
        cursor: pointer;
        color: white;
    }
</style>