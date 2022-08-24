<template>
    <nav>
        <img @click="this.$router.push('/home')" class="logo" src="../assets/logo.png" alt="logo">
        <div class="nav-links">
            <i @click="this.$router.push('/home')" class="fa-solid fa-house"></i>
            <img @click="this.$router.push('/profil')" class="profil-link" :src="user.imageUrl" alt="img-profil">
            <i @click="logout()" class="fa-solid fa-right-from-bracket"></i>
        </div>

    </nav>
    <div class="fixed-div"></div>
</template>;

<script>
import { mapState } from "vuex";


export default {
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    methods: {
        logout: function () {
            this.$store.commit("logout");
            this.$router.push("/");
        }
    },
}
</script>


<style scoped lang="scss">
nav {
    z-index: 1;
    position: fixed;
    top: 0rem;
    left: 0;
    right: 0;
    padding: 0.5rem 2rem;
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 10px 3px rgb(194, 194, 194);
    grid-template-areas:
        "title profil";

    .logo {
        display: none;
        width: 300px;
        cursor: pointer;
        grid-area: title;
    }

    .nav-links {
        display: flex;

        .profil-link {
            margin: 0 3rem;
            width: 3rem;
            height: 3rem;
            background-color: rgb(111, 183, 255);
            box-shadow: 0px 0px 10px 3px rgb(194, 194, 194);
            border-radius: 200%;
            grid-area: profil;
            cursor: pointer;
        }

        i {
            margin-top: 0.5rem;
            font-size: 2rem;
            cursor: pointer;
        }
    }

    @media only screen and (min-width: 768px) {
        justify-content: space-between;

        .logo {
            display: flex;
        }

        .profil-link {
            margin: 0 2rem !important;
        }
    }
}

.fixed-div {
    height: 78.7px;
}
</style>