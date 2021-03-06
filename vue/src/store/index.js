import { createStore } from 'vuex';
import axiosClient from '../axios';

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
        surveys: {
            loading: false,
            data: [],
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    },
    getters: {},
    actions: {
        getSurveys({commit}) {
            commit('setSurveysLoading', true);
            return axiosClient.get('/survey')
                .then((res) => {
                    commit('setSurveysLoading', false);
                    commit('setSurveys', res.data);
                    return res;
                }).catch((err) => {
                    commit('setSurveysLoading', false);
                    throw err;
                })
        },
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
        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading;
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setSurveys: (state, surveys) => {
            state.surveys.data = surveys.data;
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