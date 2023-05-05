<template>
    <div class="p-4">
        <div className="bg-white shadow-lg rounded-lg text-center">
            <button @click="toggleShowUsers"><h3 className="py-2 text-2xl text-gray-700 text-lg">Gérer les utilisateurs</h3></button>
        </div>
        <div className="mb-4">
            <user-search @search="filterUsers" v-show="showComponent1"></user-search>
                <ul class="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
                    <li>
                        <ol v-for="(user, index) in filteredUsers" :key="index" v-show="showComponent1" class="pl-5 mt-2 space-y-1 list-decimal list-inside">
                            <p v-show="showComponent1" v-html="sanitize(user.email)"></p><button @click="userDelete(user._id)" v-show="showComponent1"><span class="glyphicon" v-show="showComponent1">&#xe020;</span></button>
                        </ol>
                    </li>
                </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getUsers, deleteUser } from '../services/UserService';
import { User } from '../../server/model/User';
import UserSearch from './TheSearchUser.vue';
import DOMPurify from "dompurify";
import axios from "axios";

export default defineComponent ({
    data() {
        return {
            showComponent1: false,
            users: [] as User[],
            filteredUsers: [] as User[]
        };
    },
    components: {
        UserSearch
    },
    methods: {
        toggleShowUsers() {
            this.showComponent1 = !this.showComponent1;
        },
        async loadUser() {
            const res = await getUsers();
            this.users = res.data;
            this.filteredUsers = this.users
        },
        async userDelete(id: number) {
            const confirmed = confirm("Êtes vous sûr de vouloir supprimer cette utilisateur ? ");
            if(confirmed){
                if(typeof id === "string") {
                    const res = await deleteUser(id);
                    const deleteJSON = await axios.delete(`http://localhost:3000/content/${id}`);
                    location.replace("/admin");
                }
            } else {
                this.$router.push('/admin');
            }
        },
        async filterUsers(searchTerm: string) {
            if(!searchTerm) {
                this.filteredUsers = this.users;
                return;
            }

            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            this.filteredUsers = this.users.filter(user => 
            user.email.toLowerCase().includes(lowerCaseSearchTerm),
            );
        },
        sanitize(value: string) {
            return DOMPurify.sanitize(value)
        },
    },
    mounted() {
        this.loadUser();
    },
})
</script>