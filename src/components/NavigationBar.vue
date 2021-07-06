<template>
    <div class="navigation_bar">
        <router-link class="single_link" :to="page.path"
            v-for="page in page_options" :key="page.name"
            :class="{active_page_link: page.name === current_page_name}"
            @click="update_current_page(page.name)">
            <div class="link_icon">
                <i :class="page.icon"></i>
            </div>
            <div class="link_name">{{ page.name }}</div>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page_options: [
                {
                    name: "Home",
                    path: "/",
                    icon: "las la-home"
                },
                {
                    name: "Create Thread",
                    path: "/CreateThread",
                    icon: "las la-comments"
                },
                {
                    name: "Questions",
                    path: "/Questions",
                    icon: "las la-question-circle"
                },
                {
                    name: "Tags",
                    path: "/Tags",
                    icon: "las la-tags"
                },
                {
                    name: "Unanswered",
                    path: "/Unanswered",
                    icon: "las la-comment-dots"
                },
                {
                    name: "History",
                    path: "/History",
                    icon: "las la-history"
                },
                {
                    name: "Profile",
                    path: "/Profile",
                    icon: "las la-user"
                },
                {
                    name: "Star",
                    path: "/Star",
                    icon: "las la-star"
                },
                {
                    name: "Settings",
                    path: "/Settings",
                    icon: "las la-cog"
                }
            ],

            current_page_name: "Home"
        }
    },
    methods: {
        update_current_page(page_name) {
            this.current_page_name = page_name;
        }
    }
}
</script>

<style scoped>
    .navigation_bar {
        background-color: var(--light-purple);
        border-radius: 0 25px 25px 0;
        padding: 15px 20px;
        position: fixed;
        width: 15.39%;
        top: 11.7%;
    }
    .single_link {
        display: grid;
        grid-template-columns: 1fr 3fr;
        color: var(--lighter-purple);
        margin: 0 0 15px 8px;
        text-decoration: none;
    }
    .single_link:last-child {
        margin-bottom: 0;
    }
    .single_link:hover {
        color: white
    }
    .link_icon {
        font-size: 30px;
    }
    .link_name {
        display: flex;
        align-items: center;
        font-size: 17px;
    }
    .active_page_link {
        color: white;
    }
    @media only screen and (min-width: 1600px) {
    .navigation_bar {
        width: 15.4%;
        top: 9.2%;
    }
}
</style>