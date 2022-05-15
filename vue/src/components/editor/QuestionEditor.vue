<template>
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{ index + 1 }} . {{ model.question }}
        </h3>

        <div class="flex items-center">
            <!-- Add new question -->
            <button class="flex items-center gap-1 px-3 py-2 mr-2 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700" type="button" @click="addQuestion()">
                <PlusIcon class="w-4 h-4"></PlusIcon>
                Add
            </button>

            <!-- Delete question -->
            <button class="flex items-center gap-1 px-3 py-2 mr-2 text-xs text-white bg-red-600 rounded-md hover:bg-red-700" type="button" @click="deleteQuestion()">
                <TrashIcon class="w-4 h-4"></TrashIcon>
                Delete
            </button>
        </div>
    </div>

    <div class="grid md:gap-3 md:grid-cols-12">
        <!-- Question -->
        <div class="col-span-9 mt-3">
            <label :for="'question_text_' + model.data" class="block text-sm font-medium text-gray-700">Question text</label>
            <input type="text" class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="'question_text_' + model.data" id="'question_text_' + model.data" v-model="model.question" @change="dataChange">
        </div>

        <!-- Question Type -->
        <div class="col-span-3 mt-3">
            <label class="block text-sm font-medium text-gray-700" for="question_type">Select question type</label>
            <select class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="question_type" id="question_type" v-model="model.type" @change="typeChange">
                <option v-for="(type, index) in questionTypes" :key="type" :value="type">
                    {{ upperCaseFirst(type) }}
                </option>
            </select>
        </div>
    </div>

    <!-- Question Description -->
    <div class="col-span-9 mt-3">
        <label :for="'question_description_' + model.id" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" :name="'question_description_' + model.id" :id="'question_description_' + model.id" v-model="model.description" @change="dataChange"></textarea>
    </div>

    <!-- Data -->
    <div>
        <div v-if="shouldHaveOptions()" class="mt-3">
            <h4 class="flex items-center justify-between mb-2 text-sm font-semibold">Options
                <!-- Add new option -->
                <button type="button" class="flex items-center gap-1 px-3 py-2 text-xs text-white bg-gray-600 rounded-md hover:bg-gray-600" @click="addOption()">
                    <PlusIcon class="w-4 h-4"></PlusIcon>
                    Add Option
                </button>
            </h4>

            <div v-if="!model.data.options.length" class="py-3 text-sm text-center text-gray-600">
                You don't have any options defined!
            </div>
            <!-- Option list -->
            <div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center gap-1 mb-1">
                <span class="w-6 text-sm">{{ index + 1 }}</span>
                <input type="text" class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:border-indigo-500" v-model="option.text" @change="dataChange()">
                <!-- Delete option -->
                <button type="button" class="flex items-center justify-center w-6 h-6 text-red-600 transition-colors border border-transparent rounded-full hover:border-red-300" @click="removeOption(option)">
                    <TrashIcon class="w-4 h-4"></TrashIcon>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PlusIcon, TrashIcon } from "@heroicons/vue/outline";
import { v4 as uuidv4} from "uuid";
import { ref, computed } from 'vue';
import store from "../../store";

const props = defineProps({
    question: Object,
    index: Number,
});

const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

// Re create the whole question dara to avoid unintentional reference change
const model = ref(JSON.parse(JSON.stringify(props.question)));

// Get question types from vuex
const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Check if the question should have options
function shouldHaveOptions() {
    return ["select", "radio", "checkbox"].includes(model.value.type);
}

function getOptions() {
    return model.value.data.options;
}

function setOptions(options) {
    model.value.data.options = options;
}

function addOption(params) {
    setOptions([
        ...getOptions(),
        { uuid: uuidv4(), text: "" },
    ]);
    dataChange();
}

function removeOption(op) {
    setOptions(getOptions().filter((opt) => opt !== op));
    dataChange();
}

function typeChange() {
    if (shouldHaveOptions()) {
        setOptions(getOptions() || []);
    }
    dataChange();
}

function dataChange() {
    const data = JSON.parse(JSON.stringify(model.value));
    if(!shouldHaveOptions()) {
        delete data.data.options;
    }

    emit('change', data);
}

function addQuestion() {
    emit('addQuestion', props.index +1);
}

function deleteQuestion() {
    emit('deleteQuestion', props.question);
}

</script>