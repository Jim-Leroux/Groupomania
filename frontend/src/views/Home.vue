<template>
    <Navbar />
    <div class="container">
        <!-- ----------------- PUBLICATION POSTS ----------------- -->
        <div class="post-form">
            <div v-if="url" class="img-preview">
                <img :src="url" />
            </div>
            <div class="block-post-field">
                <input v-model="description" class="post-field" type="text" placeholder="Comment allez vous ?">
            </div>

            <div class="import-file">
                <label for="file" class="label-file"><i class="fa-solid fa-image"></i></label>
                <input @change="onFileChange" id="file" class="input-file" type="file">
                <button @click="createPost()" :class="{ 'button--disabled': !validatedFields }">Publier</button>
            </div>
        </div>

        <!-- ----------------- AFFICHAGE POSTS ----------------- -->
        <div v-for="post in posts" :key="post.id" class="post-card">
            <div v-if="post.User" class="user-data">
                <div>
                    <img class="img-profil" :src="post.User.imageUrl" />
                    <p class="user-name">{{ post.User.firstname }} {{ post.User.name }}</p>
                </div>

                <!-- ----------------- POST OPTIONS ----------------- -->
                <div v-if="post.user_id == user.id && mode != 'update'" class="post-options">
                    <p @click="updateMode(post.id)"><i class="fa-solid fa-pen-to-square"></i></p>
                    <p @click="deletePost(Object.values(post))"><i class="fa-solid fa-trash"></i></p>
                </div>
                <div v-if="post.user_id != user.id && mode != 'update' && user.email == `${VUE_APP_ADMIN_ACCESS}`"
                    class="post-options">
                    <p @click="deletePost(Object.values(post))"><i class="fa-solid fa-trash"></i></p>
                </div>
            </div>

            <p class="post-msg">{{ post.description }}</p>

            <div class="post-data">
                <img class="post-img" v-if="post.imageUrl" :src="post.imageUrl" alt="post-img">
            </div>

            <!-- ----------------- COMMENTAIRE & LIKE ----------------- -->
            <div v-if="mode != 'comment' || post.id != postId" class="like-comment">

                <input type="checkbox" name="checkbox" v-bind:id="post.id" :value="post.id" v-model="liked">
                <label @click="likeDislike(post.id)" v-bind:for="post.id"><i class="fa-solid fa-heart"></i></label>

                <p @click="swichToComment(post.id)" class="show-comment-btn">Commenter</p>

                <!-- <p v-if="like.user_id == user.id" @click="likeDislike(post.id)"><i class="fa-solid fa-heart"></i></p> -->
                <!-- <p v-if="like.user_id != user.id" @click="likeDislike(post.id)"><i class="fa-solid fa-heart"></i></p> -->
            </div>

            <!-- ----------------- MODIFICATION POST ----------------- -->
            <div v-if="mode == 'update' && post.id == postId" class="post-comment">
                <p @click="switchToNull()"><i class="fa-regular fa-circle-xmark"></i></p>
                <label for="file" class="label-file"><i class="fa-solid fa-image"></i></label>
                <input @change="updateFile" id="file" class="input-file" type="file">
                <input v-model="update_description" class="comment-content" type="text"
                    placeholder="Modifier la description">
                <button @click="updatePost(post.id)"
                    :class="{ 'updateAndCommentButton--disabled': !updateAndCommentFields }"
                    class="send-comment">Modifier</button>
            </div>

            <!-- ----------------- AFFICHAGE COMMENTAIRE ----------------- -->
            <div v-if="mode == 'comment' && post.id == postId" v-for="comment in post.Comments" :key="post.Comments.id"
                class="comment-section">
                <div v-if="comment" class="comment-description">
                    <img :src="comment.User.imageUrl" alt="img-profil" class="comment-user-img">
                    <div>
                        <p>{{ comment.User.firstname }} {{ comment.User.name }}</p>
                    </div>

                    <!-- ----------------- COMMENTAIRE OPTIONS ----------------- -->
                    <div v-if="comment.User.id == user.id && commentMode != 'commentUpdate'" class="comment-options">
                        <p @click="swichToUpdateComment(comment.id)"><i class="fa-solid fa-pen-to-square"></i></p>
                        <p @click="deleteComment(comment.id)"><i class="fa-solid fa-trash"></i></p>
                    </div>
                    <div v-if="post.user_id != user.id && commentMode != 'commentUpdate' && user.email == `${VUE_APP_ADMIN_ACCESS}`"
                        class="comment-options">
                        <p @click="deleteComment(comment.id)"><i class="fa-solid fa-trash"></i></p>
                    </div>
                </div>
                <p class="comment-text">{{ comment.description }}</p>

                <!-- ----------------- MODIFICATION COMMMENTAIRE ----------------- -->
                <div class="post-comment">
                    <p v-if="commentMode == 'commentUpdate' && commentId == comment.id" @click="switchToNull()"><i
                            class="fa-regular fa-circle-xmark"></i></p>
                    <input v-if="commentMode == 'commentUpdate' && commentId == comment.id"
                        v-model="comment_description" class="comment-content" type="text" placeholder="Modifier..">
                    <button v-if="commentMode == 'commentUpdate' && commentId == comment.id"
                        @click="updateComment(comment.id)"
                        :class="{ 'updateAndCommentButton--disabled': !updateAndCommentFields }"
                        class="send-comment">Modifier</button>
                </div>

            </div>

            <!-- ----------------- PUBLICATION COMMENTAIRE ----------------- -->
            <div v-if="mode == 'comment' && post.id == postId" class="post-comment">
                <p v-if="commentMode != 'commentUpdate'" @click="switchToNull()"><i
                        class="fa-regular fa-circle-xmark"></i></p>
                <input v-if="commentMode != 'commentUpdate'" v-model="comment_description" class="comment-content"
                    type="text" placeholder="Commenter..">
                <button v-if="commentMode != 'commentUpdate'" @click="createComment(Object.values(post))"
                    :class="{ 'updateAndCommentButton--disabled': !updateAndCommentFields }"
                    class="send-comment">Envoyer</button>


            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex';

import Navbar from "@/components/Navbar.vue"

export default {
    name: "Home",
    data() {
        return {
            mode: "",
            postId: "",
            commentMode: "",
            commentId: "",
            url: null,
            description: "",
            update_description: "",
            imageUrl: "",
            comment_description: "",
            liked: [],
            VUE_APP_ADMIN_ACCESS: process.env.VUE_APP_ADMIN_ACCESS
        }
    },
    mounted: function () {
        // REDIRECTION AU FORMULAIRE DE CONNEXION
        if (this.$store.state.user.userId == -1) {
            this.$router.push("/");
            return;
        }
        this.$store.dispatch("getPosts");
        this.$store.dispatch("getUserInfos");

        this.getLikeCookie;

        console.log(this.posts);
    },
    computed: {
        ...mapState({
            user: "userInfos",
            posts: 'postDatas',
        }),
        validatedFields() {
            if (this.description != "" || this.imageUrl != "") {
                return true;
            } else {
                return false;
            }
        },
        updateAndCommentFields() {
            if (this.update_description != "" || this.comment_description != "" || this.imageUrl != "") {
                return true;
            } else {
                return false;
            }
        },
        getLikeCookie() {
            let cookieValue = JSON.parse($cookies.get('like'));
            cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },
    },
    methods: {
        onFileChange(event) {
            this.imageUrl = event.target.files[0];
            this.url = URL.createObjectURL(this.imageUrl);
        },
        updateFile(event) {
            this.imageUrl = event.target.files[0];
        },
        updateMode: function (post_id) {
            this.postId = post_id;
            this.mode = "update";
        },
        swichToComment: function (post_id) {
            this.comment_description = "";
            this.postId = post_id;
            this.mode = "comment";
        },
        swichToUpdateComment: function (comment_id) {
            this.commentId = comment_id;
            this.commentMode = "commentUpdate";
        },
        switchToNull: function () {
            this.mode = "";
            this.commentMode = "";
        },
        createPost: function () {
            let formData = new FormData();
            formData.append("description", this.description)
            formData.append("imageUrl", this.imageUrl)

            this.$store.dispatch('createPost', formData).then((response) => {
                this.description = "";
                console.log("Post Created");
            }), (error) => {
                console.log("error");
                console.log(error);
            }
        },
        updatePost: function (postId) {
            let formData = new FormData();

            if (this.update_description != "") {
                formData.append("description", this.update_description)
            }
            if (this.imageUrl != "") {
                formData.append("imageUrl", this.imageUrl)
            }

            let newpost = {
                postId,
                formData
            }


            this.$store.dispatch('updatePost', newpost).then((response) => {
                console.log("Post Updated");
                this.mode = "";
            }), (error) => {
                console.log("error");
                console.log(error);
            }

        },
        deletePost: function (value) {
            const selectedPost = value[0] // récuparation de l'id du post

            this.$store.dispatch('deletePost', selectedPost).then((response) => {
                console.log("Post Deleted");
            }), (error) => {
                console.log("error");
                console.log(error);
            }
        },
        createComment: function (value) {
            const selectedPost = value[0] // récuparation de l'id du post

            let newComment = {
                selectedPost,
                description: this.comment_description,
            }

            this.$store.dispatch('createComment', newComment).then((response) => {
                console.log("Comment Created");
                this.comment_description = "";
            }), (error) => {
                console.log("error");
                console.log(error);
            }

        },
        updateComment: function (comment_id) {
            const selectedComment = comment_id // récuparation de l'id du comment

            let updatedComment = {
                selectedComment,
                description: this.comment_description,
            }

            this.$store.dispatch('updateComment', updatedComment).then((response) => {
                console.log("Comment Updated");
                this.comment_description = "";
                this.commentMode = "";
            }), (error) => {
                console.log("error");
                console.log(error);
            }
        },
        deleteComment: function (comment_id) {
            const selectedComment = comment_id // récuparation de l'id du comment

            this.$store.dispatch('deleteComment', selectedComment).then((response) => {
                console.log("Comment Deleted");
            }), (error) => {
                console.log("error");
                console.log(error);
            }
        },
        likeDislike: function (post_id) {
            document.addEventListener('input', () => {
                setTimeout(() => {
                    this.$cookies.set('like', JSON.stringify(this.liked))
                }, 300);
            })
            const selectedPost = post_id // récuparation de l'id du post

            this.$store.dispatch('likeDislike', selectedPost).then((response) => {
            }), (error) => {
                console.log("error");
                console.log(error);
            }
        },
    },
    components: { Navbar }
}
</script>

<style scoped>
</style> 