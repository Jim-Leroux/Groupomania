import axios from "axios";
import { createStore } from "vuex";

// CRÉATION DE L'URL DE BASE
const instance = axios.create({
  baseURL: "http://localhost:8888",
});

let config = {
  headers: {
    "Content-Type": "multipart/form-data; boundary=${formData._boundary} ",
  },
};

// RÉCUPÉRATION DU USER DEPUIS LE LOCAL STORAGE
let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    access_token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] =
      "Bearer " + user.access_token;
  } catch (error) {
    user = {
      userId: -1,
      access_token: "",
    };
  }
}

// CRÉATION D'UNE NOUVELLE INSTANCE DU STORE
const store = createStore({
  // OBJET QUI CONTIENT DES VALEURS
  state: {
    status: "",
    user: user,
    userInfos: {
      email: "",
      name: "",
      firstname: "",
      password: "",
      imageUrl: "",
    },
    postDatas: {},
    postLiked: {},
  },

  // EVENEMENT QUI VIENT MODIFIER UN ELEMENT DU STATE
  mutations: {
    // PREND LE STATE EN PARAMS + LA VARIABLE STATUS
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      // AJOUT DU TOKEN DANS LE HEADERS AUTHORIZATION
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.access_token;
      // SAUVEGARDE DU USER DANS LE LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    postDatas(state, postDatas) {
      state.postDatas = postDatas;
    },
    postLiked(state, postLiked) {
      state.postLiked = postLiked;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        access_token: "",
      };
      localStorage.removeItem("user");
    },
  },
  // store.commit PERMET D'INVOQUER LE GESTIONNAIRE DES MUTATIONS

  // PERMET D'EXECUTER UNE MUTATIONS
  actions: {
    // DEUX ARGUMENTS, LE COMMIT, ET L'OBJET QUI CONTIENT LES DONNÉES
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        // MUTATION DE STATUS VIA LE GESTIONNAIRE COMMIT
        instance
          .post("/users", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response.data.message);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit, state }) => {
      const id = state.user.userId;
      instance
        .get(`/users/${id}`)
        .then(function (response) {
          commit("userInfos", response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateUser: ({ state, dispatch }, formData) => {
      let id = state.user.userId;

      instance
        .post(
          `/users/update/${id}`,
          formData,

          config // l'ajout de la config envoi un objet vide au backend
        )
        .then((res) => {
          dispatch("getUserInfos");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPosts: ({ commit }) => {
      instance
        .get("/posts")
        .then((res) => {
          let postDatas = res.data.data.reverse();
          commit("postDatas", postDatas);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createPost: ({ state, dispatch }, formData) => {
      const id = state.user.userId;

      formData.append("user_id", id);

      instance
        .put("posts", formData, config)
        .then(function (response) {
          console.log(response);
          dispatch("getPosts");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updatePost: ({ dispatch }, newpost) => {
      let postId = newpost.postId;

      let formData = newpost.formData;

      instance
        .put(`posts/update/${postId}`, formData, config)
        .then(function (response) {
          console.log(response);
          dispatch("getPosts");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deletePost: ({ dispatch }, selectedPost) => {
      instance
        .delete(`posts/delete/${selectedPost}`)
        .then(function (response) {
          dispatch("getPosts");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createComment: ({ state, dispatch }, newComment) => {
      const id = state.user.userId;

      instance
        .put("comments", {
          user_id: id,
          newComment,
        })
        .then(function (response) {
          dispatch("getPosts");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateComment: ({ dispatch }, updatedComment) => {
      let commentId = updatedComment.selectedComment;
      instance
        .patch(`/comments/${commentId}`, {
          updatedComment,
        })
        .then((res) => {
          dispatch("getPosts");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteComment: ({ dispatch }, selectedComment) => {
      instance
        .delete(`comments/delete/${selectedComment}`)
        .then(function (response) {
          dispatch("getPosts");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getLikes: ({ commit }) => {
      instance
        .get("/posts/getLikes")
        .then((res) => {
          let likes = res.data.likes;
          commit("postLiked", likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likeDislike: ({ state, dispatch }, selectedPost) => {
      const id = state.user.userId;
      instance
        .post(`posts/like`, {
          user_id: id,
          post_id: selectedPost,
        })
        .then(function (response) {
          dispatch("getLikes");
          dispatch("getPosts");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

export default store;
