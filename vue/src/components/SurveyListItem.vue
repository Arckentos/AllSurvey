<template>
    <div class="flex rounded-md flex-col py-4 px-5 shadow-md bg-white hover:bg-gray-50 h-[470px]">
        <img class="object-cover w-full h-48 rounded" :src="survey.image_url" alt="">
        <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
        <div class="flex-1 overflow-hidden" v-html="survey.description"></div>

        <div class="flex items-center justify-between mt-3">
            <router-link class="flex px-4 py-2 text-sm text-white bg-blue-600 border-transparent rounded-md hover:bg-blue-700 focus:ring-offset-2 focus:ring-blue-500" :to="{ name: 'SurveyView', params: { id: survey.id } }">
                <PencilIcon class="w-5 h-5 mr-2"></PencilIcon>
                Edit
            </router-link>
            <button type="button" class="flex items-center justify-center w-8 h-8 text-sm text-red-500 border border-transparent rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-red-500" v-if="survey.id" @click="emit('delete', survey)">
                <TrashIcon class="inline-block w-5 h-5 -mt-1"></TrashIcon>
            </button>
        </div>
    </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/solid';

const { survey } = defineProps({
    survey: Object
});

const emit = defineEmits(['delete']);
</script>