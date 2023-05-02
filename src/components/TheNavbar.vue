<template>
    <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
        <router-link to="/"><span className="text-2xl font-[Poppins] cursor-pointer">MirrorDiscord</span></router-link>
            <ul className="md:flex md:items-center z-[-1] md:z-auto md:static">
                <div v-if="isAdmin === true && isAuthenticated">
                    <li className="mx-4 my-6 md:my-0">
                        <router-link to="/admin" class="text-xl hover:text-cyan-500 duration-500">Admin</router-link>
                    </li>
                </div>
                <div v-if="isAuthenticated">
                    <li className="mx-4 my-6 md:my-0">
                        <router-link to="/modifyJSON" class="text-xl hover:text-cyan-500 duration-500">JSON</router-link>
                    </li>
                </div>
                <div v-if="isAuthenticated">
                    <li className="mx-4 my-6 md:my-0">
                        <router-link to="/dashboard" class="text-xl hover:text-cyan-500 duration-500"><i class="fa fa-user"></i></router-link>
                    </li>
                </div>
                <div v-if="isAuthenticated">
                    <li className="mx-4 my-6 md:my-0">
                        <a @click="logout" class="text-xl hover:text-cyan-500 duration-500"><i class="material-icons">power_settings_new</i></a>
                    </li>
                </div>
                <div v-else>
                    <li className="mx-4 my-6 md:my-0">
                        <router-link to="/login" class="text-xl hover:text-cyan-500 duration-500">Login</router-link>
                    </li>
                </div>
            </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    computed: {
        isAuthenticated() {
            const token = localStorage.getItem('token');
            return !!token;
        },   
        isAdmin() {
            const isAdmin = localStorage.getItem('isAdmin');
            console.log(isAdmin)
            if(isAdmin === 'true'){
                return true
            } else {
                return false
            }
        }    
    },  
    methods: {
        logout() {
            localStorage.removeItem('token');
            location.replace("/login");
        },
    },
    name: 'TheNavabar'
})
</script>