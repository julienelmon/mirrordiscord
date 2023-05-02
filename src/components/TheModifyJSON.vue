<template>
  
  <div class="p-4">
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Modifier votre JSON</h1>
    <form>
      <label class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200 uppercase last:mr-0 mr-1">Nom : </label><div class="mb-4"><input id="name" v-model="itemName" className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline" /></div>
      <label class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200 uppercase last:mr-0 mr-1">Age : </label><div class="mb-4"><input id="age" v-model="itemAge" className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline" /></div>

      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl>Modifier les channels">Channels Discord</h1>
      <div v-for="(value, key) in itemChannels" :key="key">
        <div class="mb-4">
          <pre>{{ key }}</pre>
          <input type="text" v-model="itemChannels[key]" className="border shadow-inner py-2 px-3 text-gray-700 w-full focus:shadow-outline" />
          <button @click="deleteKeyValuePair(key)"><strong>X</strong></button>
        </div>
      </div>

      <button
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="updateData($event)"
      >
        Modifier
      </button>
    </form>

    <button
      className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      @click="createUserJson"
    >
      Générer votre JSON
    </button>
    <button
      className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      @click="addKeyValuePair"
    >
      Ajouter un channels discord
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "TheModifyJSON",
  data() {
    return {
      items: [],
      formData: {},
      itemName: String,
      itemAge: Number,
      itemChannels: [],
      lastName: "",
      lastNumber: 0,
      lastChannels: [],
    };
  },
  methods: {
    async updateData($event: any) {
      const userId = localStorage.getItem("userId");
      let newStr = userId?.substring(1, userId.length - 1);
      if (this.itemName || this.itemAge || this.itemChannels) {
        const res = await axios.put(`http://localhost:3000/content/${newStr}`, {
          name: this.itemName,
          age: this.itemAge,
          channels: this.itemChannels,
        });
      } else {
        const res = await axios.put(`http://localhost:3000/content/${newStr}`, {
          name: this.lastName,
          age: this.lastNumber,
          channels: this.lastChannels,
        });
      }
    },
    createUserJson() {
      const userId = localStorage.getItem("userId");
      let newStr = userId?.substring(1, userId.length - 1);
      axios.post("http://localhost:3000/content", {
        id: newStr,
        name: "",
        channels: "",
        age: 0,
      });
      location.reload();
    },
    addKeyValuePair(): void {
      let keyName = "itemChannels" + Object.keys(this.itemChannels).length;
      this.itemChannels = Object.assign({}, this.itemChannels, {
        [keyName]: "",
      });
    },
    deleteKeyValuePair(key: any): void {
      delete this.itemChannels[key];
    },
  },
  async mounted() {
    const userId = localStorage.getItem("userId");
    let newStr = userId?.substring(1, userId.length - 1);
    const res = await axios.get(`http://localhost:3000/content/${newStr}`);
    this.items = res.data;
    this.itemName = res.data.name;
    this.itemAge = res.data.age;
    this.itemChannels = res.data.channels;
  },
});
</script>

