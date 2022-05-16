import { createStore } from 'vuex';
import axiosClient from '../axios';

const tmpSurveys = [
    {
        id: 100,
        title: "Test survey number 100",
        slug: "test-survey-number-100",
        status: "draft",
        image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
        description: "This is a test survey to work on the render",
        created_at: "2022-05-15 14:48:00",
        updated_at: "2022-05-15 14:48:00",
        expire_date: "2022-06-15 14:48:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "71b4c350-ec7e-4e35-a62f-30f1b81afc43",
                            text: "USA"
                        },
                        {
                            uuid: "474127d1-7b8c-409d-bbe7-ce746d58c19a",
                            text: "France"
                        },
                        {
                            uuid: "185d0a60-47bf-4336-99ce-a7c138aba4e4",
                            text: "Spain"
                        },
                        {
                            uuid: "7be36198-d4bc-419d-ab64-cb0e28c57fe4",
                            text: "Georgia"
                        },
                    ]
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "Which language do you use?",
                description: "Lorem ipsum dolor sit amet",
                data: {
                    options: [
                        {
                            uuid: "71b4c350-ec7e-4e35-a62f-30f1b81afc43",
                            text: "JavaScript"
                        },
                        {
                            uuid: "474127d1-7b8c-409d-bbe7-ce746d58c19a",
                            text: "PHP"
                        },
                        {
                            uuid: "185d0a60-47bf-4336-99ce-a7c138aba4e4",
                            text: "C++"
                        },
                        {
                            uuid: "7be36198-d4bc-419d-ab64-cb0e28c57fe4",
                            text: "C#"
                        },
                    ]
                },
            },
            {
                id: 3,
                type: "radio",
                question: "Which domain do you like the most?",
                description: "Lorem ipsum dolor sit amet",
                data: {
                    options: [
                        {
                            uuid: "71b4c350-ec7e-4e35-a62f-30f1b81afc43",
                            text: "Frontend"
                        },
                        {
                            uuid: "474127d1-7b8c-409d-bbe7-ce746d58c19a",
                            text: "Backend"
                        },
                    ]
                },
            },
            {
                id: 4,
                type: "text",
                question: "What's your favorite TV Show?",
                description: null,
                data: {},
            },
            {
                id: 5,
                type: "text",
                question: "What do you think about The 100?",
                description: "Write your honest opinion.",
                data: {},
            },
        ],
    },
    {
        id: 200,
        title: "Laravel 8",
        slug: "laravel-8",
        status: "draft",
        image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
        description: "This is a test survey to work on the render",
        created_at: "2022-05-15 14:48:00",
        updated_at: "2022-05-15 14:48:00",
        expire_date: "2022-06-15 14:48:00",
        questions: []
    },
    {
        id: 300,
        title: "Laravel 9",
        slug: "laravel-9",
        status: "draft",
        image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
        description: "This is a test survey to work on the render",
        created_at: "2022-05-15 14:48:00",
        updated_at: "2022-05-15 14:48:00",
        expire_date: "2022-06-15 14:48:00",
        questions: []
    },
    {
        id: 400,
        title: "Vue 3",
        slug: "vue-3",
        status: "draft",
        image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
        description: "This is a test survey to work on the render",
        created_at: "2022-05-15 14:48:00",
        updated_at: "2022-05-15 14:48:00",
        expire_date: "2022-06-15 14:48:00",
        questions: []
    },
    {
        id: 500,
        title: "Tailwind 3",
        slug: "tailwind-3",
        status: "draft",
        image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
        description: "This is a test survey to work on the render",
        created_at: "2022-05-15 14:48:00",
        updated_at: "2022-05-15 14:48:00",
        expire_date: "2022-06-15 14:48:00",
        questions: []
    },
]

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        currentSurvey: {
            loading: false,
            data: {},
        },
        surveys: [...tmpSurveys],
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    },
    getters: {},
    actions: {
        getSurvey({ commit }, id) {
            commit('setCurrentSurveyLoading', true);
            return axiosClient.get(`/survey/${id}`)
                .then((res) => {
                    commit('setCurrentSurvey', res.data);
                    commit('setCurrentSurveyLoading', false);
                    return res;
                })
                .catch((err) => {
                    commit('setCurrentSurveyLoading', false);
                    throw err;
                });
        },
        saveSurvey({ commit }, survey) {
            delete survey.image_url;
            let response;
            if (survey.id) {
                response = axiosClient.put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res;
                    })
                    .catch((err) => {
                        throw err;
                    });
            } else {
                response = axiosClient.post('/survey', survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res;
                    })
                    .catch((err) => {
                        throw err;
                    });
            }

            return response;
        },
        deleteSurvey({ }, id) {
            return axiosClient.delete(`/survey/${id}`);
        },
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
                })
                .catch((err) => {
                    throw err;
                });
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
                })
                .catch((err) => {
                    throw err;
                });
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then((response) => {
                    commit('logout');
                    return response;
                })
                .catch((err) => {
                    throw err;
                });
        }
    },
    mutations: {
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.data = userData.data;
            state.user.token = userData.token;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {},
});

export default store;