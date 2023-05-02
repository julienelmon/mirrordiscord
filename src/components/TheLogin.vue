<template>
  <div className="p-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Connection</h1>
    <form @submit.prevent="loginUser($event)">
      <div className="mb-4">
        <label for="email" className="block text-gray-600">Email</label>
        <input
          type="email"
          v-model="user.email"
          className="border shadow-inner py-2 px-3 text-gray-700 w-full"
        />
      </div>
      <div className="mb-4">
        <label for="password" className="block text-gray-600">Password</label>
        <input
          type="password"
          v-model="user.password"
          className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline"
          id="password"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Connection
      </button>
    </form>
    <p>
      Pas de compte ? <router-link to="/register">Inscrivez-vous</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { login } from "@/services/UserService";
import { User } from "../../server/model/User";

export default defineComponent({
  data() {
    return {
      user: {} as User,
    };
  },
  methods: {
    async loginUser($event: any) {
      try {
        console.log(document.getElementById('password'));
        console.log(document.getElementById('confirmPassword'));
        const res = await login(this.user);
        localStorage.setItem("token", JSON.stringify(res));
        localStorage.setItem("userId", JSON.stringify(res.data.user._id));
        localStorage.setItem("isAdmin", JSON.stringify(res.data.user.isadmin));
        alert("Vous êtes connecter !");
        location.replace(`/`);
      } catch (error) {
        alert("Mauvais email ou mot de passe !");
      }

    },
  },
  components: {},
  name: "TheLogin",
});
</script>
