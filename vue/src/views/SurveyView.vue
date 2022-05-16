<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : 'Create a survey' }}
                </h1>
            </div>
        </template>
        <form @submit.prevent="saveSurvey">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey fields -->
                <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Image</label>
                        <div class="flex items-center mt-1">
                            <img class="object-cover w-64 h-48" v-if="model.image" :src="model.image" :alt="model.title">
                            <span class="flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full" v-else>
                                <PhotographIcon class="h-[80%] w-[80%] text-gray-300"></PhotographIcon>
                            </span>
                            <button type="button" class="relative px-3 py-2 ml-5 overflow-hidden text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <input type="file" class="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer" name="" id="">
                                Change
                            </button>
                        </div>
                    </div>

                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="title" id="title" v-model="model.title" autocomplete="survey_title">
                    </div>

                    <!-- Description -->
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <div class="mt-1">
                            <textarea class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="description" id="description" rows="3" v-model="model.description" autocomplete="survey_description" placeholder="Describe your survey"></textarea>
                        </div>
                    </div>

                    <!-- Expire date -->
                    <div>
                        <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
                        <input class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="date" name="expire_date" id="expire_date" v-model="model.expire_date">
                    </div>

                    <!-- Status -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" type="checkbox" name="status" id="status" v-model="model.status">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status" class="font-medium text-gray-700">Active</label>
                        </div>
                    </div>

                    <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
                        <h3 class="flex items-center justify-between text-2xl font-semibold">Questions
                            <!-- Add new question -->
                            <button type="button" class="flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700">
                                <PlusIcon class="w-4 h-4"></PlusIcon>
                                Add Question
                            </button>
                        </h3>
                        <div class="text-center text-gray-600" v-if="!model.questions.length">
                            You don't have any questions created !
                        </div>
                        <div v-for="(question, index) in model.questions" :key="question.id">
                            <QuestionEditor :question="question" :index="index" @change="questionChange" @addQuestion="addQuestion" @deleteQuestion="deleteQuestion" />
                        </div>
                    </div>

                    <div class="px-4 py-3 text-right rounded-md bg-gray-50 sm:px-6">
                        <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                    </div>

                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
import { PhotographIcon, PlusIcon } from "@heroicons/vue/outline";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import store from "../store";
import { useRoute, useRouter } from "vue-router";

import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const router = useRouter();
const route = useRoute();

let model = ref({
    title: "",
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: [],
})

if (route.params.id) {
    model.value = store.state.surveys.find(
        (s) => s.id === parseInt(route.params.id)
    )
}

function addQuestion(index) {
    const newQuestion = {
        id: uuidv4(),
        type: "text",
        question: "",
        description: null,
        data: {},
    }

    model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
    model.value.questions = model.value.questions.filter(
        (q) => q.id !== question.id
    );
}

function questionChange(question) {
    model.value.questions = model.value.questions.map(
        (q) => {
            if (q.id === questions.id) {
                return JSON.parse(JSON.stringify(question));
            }
            return q;
        }
    )
}

/**
 * Create or update survey 
 */
function saveSurvey() {
    store.dispatch("saveSurvey", model.value)
        .then(({ data }) => {
            router.push({ name: 'SurveyView', params: { id: data.data.id } });
        });
}
</script>