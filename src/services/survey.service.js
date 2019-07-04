import axios from 'axios';

export default {
    
    async getSurvey() {
        return await axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
            .then(res => {
                return { "id": 1, "name": "Survey 1", "questions": [{ "id": 1, "question": "Is this question 1?" }, { "id": 2, "question": "Is this question 2?" }, { "id": 3, "question": "Is this question 3?" }, { "id": 4, "question": "Is this question 4?" }, { "id": 5, "question": "Is this question 5?" }] };
            })
    },

    async saveSurvey(data) {
        return await axios.post(`https://reqres.in/api/users`, data)
            .then(res => {
                return {status: 200};
            })
    },

}
