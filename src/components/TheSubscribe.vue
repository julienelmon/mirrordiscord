<template>
    <div className="p-4">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Inscription</h1>
        <form @submit.prevent="saveAccount($event)">
                <div className="mb-4">
                    <label for="email" className="block text-gray-600">Email</label>
                    <input type="email" v-model="user.email" className="border shadow-inner py-2 px-3 text-gray-700 w-full">
                </div>
                <div className="mb-4">
                    <label for="password" className="block text-gray-600">Password</label>
                    <input type="password" v-model="user.password" className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline" id="password">
                </div>
                <div className="mb-4">
                    <label for="password" className="block text-gray-600">Confirmer password</label>
                    <input type="password"  className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline" id="confirmPassword">
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Inscription</button>
            </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { register } from '@/services/UserService';
import { User } from '../../server/model/User';
import DOMPurify from 'dompurify';

export default defineComponent({
    data() {
        return {
            user: {} as User,
        }
    },
    methods: {
        async saveAccount($event: any) {
            const password = document.getElementById('password') as HTMLInputElement;
            const confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;
            
            if(DOMPurify.sanitize(password.value) === DOMPurify.sanitize(confirmPassword.value)) {
                this.user.email = DOMPurify.sanitize(this.user.email);
                this.user.password = DOMPurify.sanitize(this.user.password);
                const res = await register(this.user);
                location.replace('/login');    
            } else {
                console.log(password, confirmPassword);
                alert('Les deux mots de passe ne correspond pas !')
            }
        }
    },
    name: "TheSubscribe"
})
</script>
