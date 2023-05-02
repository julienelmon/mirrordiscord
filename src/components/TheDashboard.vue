<template>
    <div class="p-4">
        <div className="bg-white shadow-lg rounded-lg text-center">
            <button @click="toggleShowPassword"><h3 className="py-2 text-2xl text-gray-700 text-lg">Modifier votre mot de passe</h3></button>
        </div>
        <div className="mb-4">
            <div className="bg-white shadow-lg rounded-lg">
                <form @submit.prevent="changePassword()">
                    <label v-show="showComponent1" className="block text-gray-600">Nouveaux mot de passe</label>
                    <input type="password" id="password" v-model="user.password" v-show="showComponent1" className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline"/>
                    <label v-show="showComponent1" className="block text-gray-600">Confirmer mot de passe</label>
                    <input type="password" id="confirmPassword" v-show="showComponent1" className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline"/>
                    <button v-show="showComponent1" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Modifier</button>
                </form>
            </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg text-center">
            <button @click="toggleShowEmail"><h3 className="py-2 text-2xl text-gray-700 text-lg">Modifier votre email</h3></button>
        </div>
            <div className="mb-4">
                <div className="bg-white shadow-lg rounded-lg">
                    <form @submit.prevent="changeEmail()">
                        <label v-show="showComponent2" className="block text-gray-600">Nouvelle email</label>
                        <input type="email"  v-show="showComponent2" v-model="user.email" className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline"/>
                        <button v-show="showComponent2" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Modifier</button>
                    </form>
                </div>
            </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "../../server/model/User";
import { updatePassword, updateEmail } from "../services/UserService"

export default defineComponent({
  name: "TheDashboard",
  data() {
    return {
      showComponent1: false,
      showComponent2: false,
      user: {} as User,
    };
  },
  methods: {
    toggleShowPassword() {
      this.showComponent1 = !this.showComponent1;
    },
    toggleShowEmail() {
      this.showComponent2 = !this.showComponent2;
    },
    async changePassword() {
        const confirmPassword = document.getElementById('confirmPassword');
        const password = document.getElementById('password')
        const userId = localStorage.getItem('userId');
        let newStr = userId?.substring(1, userId.length - 1);
        if(this.user.password !== undefined){
            if(newStr !== undefined){
                const res = await updatePassword(newStr, this.user);
                localStorage.removeItem('token');
                location.replace('/login');
            } else {
                console.log('Erreur undefined');
            }
        } else {
            alert('Saissisez un mot de passe !!');
        }
    },
    async changeEmail () {
        const userId = localStorage.getItem('userId');
        let newStr = userId?.substring(1, userId.length - 1);
        if(this.user.email !== undefined){
            if(newStr !== undefined){
                const res = await updateEmail(newStr, this.user);
                localStorage.removeItem('token');
                location.replace('/login');
            } else {
                console.log('Erreur undefined');
            }
        } else {
            alert('Saissisez un email !!');
        }
    }
  },
});
</script>
