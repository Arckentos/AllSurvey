<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ route.params.id ? model.title : 'Create a survey' }}
                </h1>

                <button type="button" v-if="route.params.id" @click="deleteSurvey()" class="flex items-center justify-center gap-1 px-3 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
                    <TrashIcon class="inline-block w-4 h-4"></TrashIcon>
                    Delete survey
                </button>
            </div>
        </template>
        <div v-if="surveyLoading" class="flex justify-center">Loading...</div>
        <form v-else @submit.prevent="saveSurvey">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey fields -->
                <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Image</label>
                        <div class="flex items-center mt-1">
                            <img v-if="model.image_url" class="object-cover w-64 h-48 rounded" :src="model.image_url" :alt="model.title">
                            <span v-else class="flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                                <PhotographIcon class="h-[80%] w-[80%] text-gray-300"></PhotographIcon>
                            </span>
                            <button type="button" class="relative px-3 py-2 ml-5 overflow-hidden text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <input type="file" class="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer" @change="onImageChoose">
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
                            <button type="button" class="flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700" @click="addQuestion">
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
import { PhotographIcon, PlusIcon, TrashIcon } from "@heroicons/vue/outline";
import { v4 as uuidv4 } from "uuid";
import { computed, ref, watch } from "vue";
import store from "../store";
import { useRoute, useRouter } from "vue-router";

import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const router = useRouter();
const route = useRoute();

const surveyLoading = computed(() => store.state.currentSurvey.loading);

let model = ref({
    title: "",
    status: false,
    description: null,
    image_url: null,
    expire_date: null,
    questions: [],
})

// Wtach the current survey data change and when this happen we update local survey
watch(
    () => store.state.currentSurvey.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft",
        }
    }
);

if (route.params.id) {
    store.dispatch('getSurvey', route.params.id);
}

function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        // The field to send on backend and apply validations
        model.value.image = reader.result;

        // The field to display here
        model.value.image_url = reader.result;
    };
    reader.readAsDataURL(file);
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
            if (q.id === question.id) {
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
            router.push({
                name: 'SurveyView',
                params: { id: data.data.id }
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

/**
 * Delete survey
 */
function deleteSurvey() {
    if (confirm('Are you sure you really want to delete this survey?')) {
        store.dispatch('deleteSurvey', model.value.id)
            .then(() => {
                router.push({
                    name: "Surveys",
                })
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
</script>