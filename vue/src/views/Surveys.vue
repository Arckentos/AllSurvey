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
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import { PlusIcon } from '@heroicons/vue/solid';
</script>