<template>
    <div class="activities_box">
        <div class="trends_section">
            <div class="title_and_setting">
                    <div class="title">Trends for you</div>
                <div class="setting">
                    <i class="las la-cog"></i>
                </div>
            </div>

            <div class="trend_names_and_questions"
                v-for="trend in trends_data" :key="trend.name">
                <div class="names">{{ trend.name }}</div>
                <div class="amount_of_questions">{{ trend.amount }} Questions</div>
            </div>
        </div>

        <div class="recent_activity_section">
            <div class="title">Recent Activity</div>
            <div class="recent_active_user_accounts" 
                v-for="user in recently_active_users" :key="user.acc_name">
                <img :src="get_images_url(user.acc_name)" alt="Recently active user">
                <div class="recent_active_user_infos">
                    <div class="acc_name">{{ user.acc_name }}</div>
                    <div class="status">{{ user.status }}</div>
                </div>
            </div>
        </div>
        
        <div class="footer_section">
            <div class="footer_title">
                <p>Want to learn more?</p>
            </div>

            <div class="footer_infos">
                <div class="columns left_column">
                    <p>About</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Languages</p>
                </div>

                <div class="columns right_column">
                    <p>Contact</p>
                    <p>Why us?</p>
                    <p>Careers</p>
                    <p>forum Inc. 2021</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // data for trends section 
            trends_data: [
                {
                    name: "Tech",
                    amount: "20.8k",
                },
                {
                    name: "AI",
                    amount: "10.3k",
                },
                {
                    name: "Cinema",
                    amount: "65k"
                }
            ],

            // data for recent activity sections
            recently_active_users: [
                {
                    acc_name: "@kanyesouth",
                    status: "Marked as solved"
                },
                {
                    acc_name: "@cr8",
                    status: "Asked a question"
                },
                {
                    acc_name: "@doge",
                    status: "Aswered a question"
                }
            ],
        }
    },
    methods: {
        get_images_url(acc_name) {
            var image = require.context('../assets/', false, /\.jpg$/)
            return image('./' + acc_name + ".jpg")
        }
    }
}
</script>

<style scoped>
    .activities_box {
    position: fixed;
    top: 30%;
    background-color: var(--light-purple);
    color: white;
    width: 24%;
    padding: 30px 50px 30px 40px;
    border-radius: 25px 0 0 0;
    }

    .title_and_setting {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .title_and_setting > .title {
        font-size: 20px;
    }

    .title_and_setting > .setting > i {
        font-size: 25px;
        color: var(--lighter-purple);
    }

    .title_and_setting > .setting > i:hover {
        cursor: pointer;
        color: white;
    }

    .trend_names_and_questions > .names {
        font-size: 14.5px;
    }

    .trend_names_and_questions > .amount_of_questions {
        font-size: 12px;
        margin-bottom: 15px;
        color: var(--lighter-purple);
    }

    .recent_activity_section {
        margin-top: 30px;
    }

    .recent_activity_section > .title {
        font-size: 20px;
        margin-bottom: 20px;
    }

    .recent_active_user_accounts {
        display: grid;
        grid-template-columns: 1fr 3fr;
        margin-top: 12px;
        cursor: pointer;
    }

    .recent_active_user_accounts > img {
        height: 50px;
        border-radius: 15px;
    }

    .recent_active_user_infos {
        font-size: 13px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .recent_active_user_infos > .acc_name {
        color: var(--lighter-purple);
    }

    .recent_active_user_infos > .status {
        color: grey;
    }

    .footer_section {
        display: none;
        margin-top: 30px;
    }

    .footer_section > .footer_title {
        font-size: 20px;
    }

    .footer_infos {
        display: flex;
        justify-content: space-between;
        margin-right: 20%;
        margin-top: 20px;
        font-size: 14.5px;
        color: var(--lighter-purple);
    }
    .footer_infos > .columns > p {
        margin-bottom: 11px;
    }

    .footer_infos > .columns > p:hover {
        cursor: pointer;
        color: white;
    }

    @media only screen and (min-width: 1600px) {
    .activities_box {
        top: 23.5%;
        width: 24%;
        border-radius: 25px 0 0 25px;
        padding-top: 35px;
    }
    .footer_section {
        display: block;
    }
}
</style>