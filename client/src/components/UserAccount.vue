<template>
    <div class="user_infos">
        <div class="main_infos">
            <img src="../assets/my_avatar.jpg" alt="User's avatar">
            <div class="real_name_and_acc_name">
                <div class="real_name">Minh Nguyen</div>
                <div class="acc_name">@minhnguyen</div>
            </div>  
        </div>

        <div class="followers_infos">
            <div class="total_followers">4.6M followers</div>

            <div class="followers active_followers">
                <div class="circle"></div>
                <div class="amount">227</div>
            </div>
            <div class="followers inactive_followers">
                <div class="circle"></div>
                <div class="amount">363</div>
             </div>
            <div class="followers recently_posted_followers">
                <div class="circle"></div>
                <div class="amount">409</div>
            </div>
        </div>

        <div class="account_infos">
            <div class="joined_date">Joined June 2021</div>
            <div class="account_type">Plus Membership</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .user_infos {
        background-color: var(--light-purple);
        border: 1px solid var(--light-purple);
        color: white;
        border-radius: 0 0 0 25px;
        padding: 30px 5px 30px 40px;
        position: fixed;
        width: 24%;
    }

    .main_infos {
        display: grid;
        grid-template-columns: 1fr 3fr;
    }

    .main_infos > img {
        width: 60px;
        border-radius: 15px;
    }

    .real_name_and_acc_name > .real_name {
        font-size: 20px;
    }

    .real_name_and_acc_name > .acc_name {
        color: var(--lighter-purple);
    }

    .followers_infos {
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
        margin-top: 20px;
        font-size: 13px;
    }

    .total_followers {
        margin-right: 25px;
    }

    .followers {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .followers > .circle {
        height: 9px;
        width: 9px;
        border-radius: 50%;
        margin-right: 5px;
    }

    .active_followers > .circle {
        background-color: yellow;
    }

    .inactive_followers > .circle {
        background-color: grey;
    }

    .recently_posted_followers > .circle {
        background-color: indianred;
    }

    .account_infos {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        padding-right: 40px;
        margin-top: 10px;
        color: var(--lighter-purple);
    }

    @media only screen and (min-width: 1600px) {
        .user_infos {
            padding-right: 17px;
        }
    }
</style>>