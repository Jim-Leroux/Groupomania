<template>
    <Navbar />

    <div class="container">

        <h1 v-if="mode != 'editProfil'" class="page__title">Profil</h1>

        <div v-if="mode == 'editProfil'" class="profil-card">
            <div @click="switchToProfil()" class="go-back"><i class="fa-regular fa-circle-xmark"></i></div>
            <label for="img">
                <img class="update-img" :src="user.imageUrl" alt="img-profil">
                <i class="icon-img fa-solid fa-circle-plus"></i>
            </label>
            <input @change="selectFile" class="update-file" type="file" name="img" id="img">
            <input v-model="firstname" type="text" name="firstname" id="firstname" placeholder="firstname">
            <input v-model="name" type="text" name="name" id="name" placeholder="name">
            <input v-model="email" type="email" name="email" id="email" placeholder="email">
            <input v-model="password" type="password" name="password" id="password" placeholder="password">

            <button @click="updateUser()" :class="{ 'button--disabled': !validatedFields }">Modifier mon
                profil</button>
        </div>

        <div v-else class="profil-card">
            <img class="user-img" :src="user.imageUrl" alt="user-img">
            <p>{{ user.firstname }}</p>
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
            <div class="form-row">
                <button @click="switchToEdit()">Modifier</button>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '@/components/Navbar.vue';
export default {
    name: "Profil",
    data() {
        return {
            mode: 'profil',
            email: '',
            firstname: '',
            name: '',
            password: '',
            imageUrl: '',
        }
    },
    mounted: function () {
        // REDIRECTION AU FORMULAIRE DE CONNEXION
        if (this.$store.state.user.userId == -1) {
            this.$router.push("/");
            return;
        }
        this.$store.dispatch("getUserInfos");
    },
    computed: {
        validatedFields() {
            if (this.firstname != "" && this.name != "" && this.email != ""
                && this.password != "") {
                return true;
            } else {
                return false;
            }
        },
        ...mapState({
            user: "userInfos",
        })
    },
    methods: {
        switchToEdit() {
            this.mode = 'editProfil';
        },
        switchToProfil() {
            this.mode = 'profil';
        },
        selectFile: function (event) {
            this.imageUrl = event.target.files[0]
            console.log(this.imageUrl);
        },
        updateUser: function () {
            let formData = new FormData();
            formData.append("user_firstname", this.firstname)
            formData.append("user_name", this.name)
            formData.append("user_email", this.email)
            formData.append("user_password", this.password)
            if (this.imageUrl != "") {
                formData.append("user_picture", this.imageUrl)
            }

            this.$store.dispatch('updateUser', formData).then((response) => {
                console.log("User updated");
                this.mode = 'profil';
                this.firstname = "";
                this.name = "";
                this.email = "";
                this.password = "";
                this.imageUrl = "";
            }), (error) => {
                console.log("error");
                console.log(error);
            }
        }
    },
    components: { Navbar }
}
</script>

<style scoped>
</style>