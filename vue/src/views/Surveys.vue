<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
                <router-link :to="{ name: 'SurveyCreate' }" class="px-3 py-2 text-white rounded-md bg-emerald-500 hover:bg-emerald-600">
                    <PlusIcon class="inline-block w-4 h-4 -mt-1" />
                    Add new survey
                </router-link>
            </div>
        </template>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="flex rounded-md flex-col py-4 px-5 shadow-md cursor-pointer bg-white hover:bg-gray-50 h-[470px]" v-for="survey in surveys" :key="survey.id">
                <img class="object-cover w-full h-48 rounded" :src="survey.image" alt="">
                <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
                <div class="flex-1 overflow-hidden" v-html="survey.description"></div>

                <div class="flex items-center justify-between mt-3">
                    <router-link class="flex px-4 py-2 text-sm text-white bg-blue-600 border-transparent rounded-md hover:bg-blue-700 focus:ring-offset-2 focus:ring-blue-500" :to="{ name: 'SurveyView', params: { id: survey.id } }">
                        <PencilIcon class="w-5 h-5 mr-2"></PencilIcon>
                        Edit
                    </router-link>
                    <button type="button" class="flex items-center justify-center w-8 h-8 text-sm text-red-500 border border-transparent rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-red-500" v-if="survey.id" @click="deleteSurvey(survey)">
                        <TrashIcon class="inline-block w-5 h-5 -mt-1"></TrashIcon>
                    </button>
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/solid';
import { computed } from 'vue';
import store from '../store';

const surveys = computed(() => store.state.surveys);
</script>