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
            <SurveyListItem v-for="survey in surveys" :key="survey.id" :survey="survey" @delete="deleteSurvey(survey)" />
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import SurveyListItem from '../components/SurveyListItem.vue';
import { PlusIcon } from '@heroicons/vue/solid';
import { computed } from 'vue';
import store from '../store';

const surveys = computed(() => store.state.surveys.data);

store.dispatch('getSurveys');

function deleteSurvey(survey) {
    if (confirm('Are you sure you want to delete this survey?')) {
        store.dispatch('deleteSurvey', survey.id)
            .then(() => {
                store.dispatch('getSurveys');
            });
    }
}
</script>