<template>
    <!-- RENDU CONDITIONNEL VIA LES V-IF V-ELSE -->
    <div class="container">
        <img class="logo" src="../assets/logo.png" alt="logo">
        <div class="card">
            <!-- V MODEL LIE LE CHAMP DU FORMULAIRE AU CONTENDU DE LA DATA -->
            <div class="form-row">
                <input v-model="email" class="form-row__input" type="text" placeholder="Email" />
            </div>

            <div class="form-row-name" v-if="mode == 'create'">
                <input v-model="firstname" class="form-row__input" type="text" placeholder="Prénom" />
                <div></div>
                <input v-model="name" class="form-row__input" type="text" placeholder="Nom" />
            </div>

            <div class="form-row">
                <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" />
            </div>

            <!-- CLASS CONDITIONNEL BTN-DISABLED -->
            <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
                Adresse mail ou mot de passe invalide
            </div>
            <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
                Adresse mail ou mot de passe invalide
            </div>
            <div class="form-row">
                <button @click="login()" class="button" :class="{ 'button--disabled': !validatedFields }"
                    v-if="mode == 'login'">
                    Connexion
                </button>
                <button @click="createAccount()" class="button" :class="{ 'button--disabled': !validatedFields }"
                    v-else>
                    Créer mon compte
                </button>
            </div>

            <h2 class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action"
                    @click='switchToCreate()'>Créer un
                    compte</span></h2>
            <h2 class="card__subtitle" v-else>Tu as déja un compte ? <span class="card__action"
                    @click='switchToLogin()'>Se
                    connecter</span></h2>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';


export default {
    name: "Login",
    // Déclaration des datas
    data() {
        return {
            mode: "login",
            email: "",
            firstname: "",
            name: "",
            password: "",
        };
    },
    mounted: function () {
        if (this.$store.state.user.userId != -1) {
            this.$router.push("/profil");
            return;
        }
    },
    // COMPUTED PERMET D'EVITER LA RÉPÉTITION DES CONDITIONS EN BOUCLES
    computed: {
        validatedFields: function () {
            if (this.mode == "create") {
                if (this.email != "" && this.firstname != "" && this.name != "" && this.password != "" && this.confirmPassword != "") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (this.email != "" && this.password != "") {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        // ACCÈS AU STATUT DU STATE
        ...mapState(["status"])
    },
    // METHODS ÉXECUTE LA FONCTION À CHAQUE APPEL
    methods: {
        // Déclarations des fonctions
        switchToCreate: function () {
            this.mode = "create";
        },
        switchToLogin: function () {
            this.mode = "login";
        },
        createAccount: function () {
            const self = this;
            // DISPATCH EXECUTE UNE ACTION ET ENVOI UN PAYLOAD DANS LE STORE, 
            this.$store.dispatch("createAccount", {
                email: this.email,
                firstname: this.firstname,
                name: this.name,
                password: this.password,
            }).then(function () {
                self.login(); // APPEL DE LA MÉTHODE LOGIN
            }), function (error) {
                console.log(error);
            };
        },
        login: function () {
            const self = this; // ACCÈS AU THIS DANS UN SOUS ÉLÉMENT
            this.$store.dispatch("login", {
                email: this.email,
                password: this.password,
            }).then(function () {
                self.$router.push("/home");
            }), function (error) {
                console.log(error);
            };
        }
    },
}
</script>

<style scoped>

</style>