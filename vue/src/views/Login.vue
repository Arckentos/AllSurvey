<template>
  <div>
    <img class="w-auto h-12 mx-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>
    <p class="mt-2 text-sm text-center text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{ name: 'Register' }" class="font-medium text-indigo-600 hover:text-indigo-500"> register for free </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="login">
    <div class="flex items-center justify-between px-5 py-3 text-white bg-red-600 rounded-md" v-if="errorMsg">
      {{ errorMsg }}
      <span class="flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"  @click="errorMsg = ''">
        <XIcon class="w-6 h-6" aria-hidden="true" />
      </span>
    </div>
    <input type="hidden" name="remember" value="true" />
    <div class="-space-y-px rounded-md shadow-sm">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" autofocus required="" class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" v-model="user.email" />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required="" class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" v-model="user.password" />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" name="remember-me" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" v-model="user.remember" />
        <label for="remember-me" class="block ml-2 text-sm text-gray-900"> Remember me </label>
      </div>

      <!-- <div class="text-sm">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
      </div> -->
    </div>

    <div>
      <button type="submit" class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Sign in
      </button>
    </div>
  </form>
</template>

<script setup>
import { LockClosedIcon, XIcon } from '@heroicons/vue/solid'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store';

const router = useRouter();

const user = {
  email: '',
  password: '',
  remember: false,
}

let errorMsg = ref('');

function login(ev) {
  ev.preventDefault();

  store.dispatch('login', user)
    .then(() => {
      router.push({
        name: 'Dashboard'
      })
    })
    .catch((err) => {
      errorMsg.value = err.response.data.error;
    })
}
</script>