import axios from "axios";
import { createStore } from "vuex";

// RÉCUPÉRATION DE LA VARIABLE D'ENVIRONNEMENT
const admin_access = process.env.VUE_APP_ADMIN_ACCESS;

// CRÉATION DE L'URL DE BASE
const instance = axios.create({
  baseURL: "http://localhost:8888",
});

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
    postDatas: {
      User: {
        email: "",
        name: "",
        firstname: "",
        password: "",
        imageUrl: "",
      },
      Comment: {
        id: "",
        user_id: "",
        post_id: "",
        description: "",
        imageUrl: "",
        createdAt: "",
        User: {
          email: "",
          name: "",
          firstname: "",
          password: "",
          imageUrl: "",
        },
      },
      id: "",
      user_id: "",
      description: "",
      imageUrl: "",
      createdAt: "",
    },
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
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        // MUTATION DE STATUS VIA LE GESTIONNAIRE COMMIT
        instance
          .put("/users", userInfos)
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
      commit("setStatus", "loading");
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
        .post(`/users/${id}`, {
          user_id: id,
        })
        .then(function (response) {
          commit("userInfos", response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateUser: ({ commit, state }, formData) => {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.access_token,
        },
      };
      let id = state.user.userId;
      instance
        .patch(
          `/users/${id}`,
          {
            user_id: id,
            formData,
          },
          config // l'ajout de la config envoi un objet vide au backend
        )
        .then((res) => {
          commit("userInfos", formData);
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
          console.log(res.data.data);
          let postDatas = res.data.data.reverse();
          commit("postDatas", postDatas);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createPost: ({ commit, state }, newPost) => {
      const id = state.user.userId;
      instance
        .put("posts", {
          user_id: id,
          newPost,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updatePost: ({ state }, updatedPost) => {
      const id = state.user.userId;
      instance
        .patch(`posts/${updatedPost.selectedPost}`, {
          user_id: id,
          description: updatedPost.description,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deletePost: ({ state }, selectedPost) => {
      const id = state.user.userId;
      const admin_access = state.userInfos.email;

      if (state.userInfos.email === admin_access) {
        instance
          .post(`posts/delete/${selectedPost}`, {
            admin_access: admin_access,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        instance
          .post(`posts/delete/${selectedPost}`, {
            user_id: id,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    createComment: ({ state }, newComment) => {
      const id = state.user.userId;

      instance
        .put("comments", {
          user_id: id,
          newComment,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateComment: ({ state }, updatedComment) => {
      let id = state.user.userId;
      let commentId = updatedComment.selectedComment;
      instance
        .patch(`/comments/${commentId}`, {
          user_id: id,
          updatedComment,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteComment: ({ state }, selectedComment) => {
      const id = state.user.userId;
      const admin_access = state.userInfos.email;
      if (state.userInfos.email === admin_access) {
        instance
          .post(`comments/delete/${selectedComment}`, {
            admin_access: admin_access,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        instance
          .post(`comments/delete/${selectedComment}`, {
            user_id: id,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    likeDislike: ({ state }, selectedPost) => {
      const id = state.user.userId;
      instance
        .post(`posts/like`, {
          user_id: id,
          post_id: selectedPost,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

export default store;
