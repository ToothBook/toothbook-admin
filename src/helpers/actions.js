import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

//action for SERVICES
export function getServices() {
    return axios.get(`${BASE_URL}/api/service/list`)
        .then(response => response.data)
}

export function deleteService(id) {
    return axios.post(`${BASE_URL}/api/service/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}

export function createService(data) {
    return axios.post(`${BASE_URL}/api/service/create`, { name: data.name, time: data.time })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

export function updateService(data, id) {
    return axios.post(`${BASE_URL}/api/service/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

//action for APPOINTMENTS
export function getAppointments() {
    return axios.get(`${BASE_URL}/api/appointment/list`)
        .then(response => response.data)
}

export function deleteAppointment(id) {
    return axios.post(`${BASE_URL}/api/appointment/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message))
}

export function createAppointment(data){
    return axios.post(`${BASE_URL}/api/appointment/create`, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        contact: data.contact,
        date: data.date,
        reason: data.reason,
        note: data.note,
        status: data.status,
        check: data.check,
        dateOfSubmit: data.dateOfSubmit
    })
    .then(response => {
        return response.data
    })
    .catch (err => Promise.reject(err.message))
}

export function updateAppointment(data, id){
    return axios.post(`${BASE_URL}/api/appointment/update/${id}`, {data})
    .then(response => {
        return response.data
    })
    .catch(err=> Promise.reject(err.message))
}

//Admin - Account
export function getAccount() {
    return axios.get(`${BASE_URL}/api/account/retrieve`)
        .then(response => response.data)
}

export function deleteAccount(id) {
    return axios.post(`${BASE_URL}/api/account/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}

export function createAccount(data) {
    return axios.post(`${BASE_URL}/api/account/create`, { username: data.username, password: data.password })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

export function updateAccount(data, id) {
    return axios.post(`${BASE_URL}/api/account/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

//Hours
export function getHours() {
    return axios.get(`${BASE_URL}/api/hours/get`)
        .then(response => response.data)
}

export function createHours(data) {
    return axios.post(`${BASE_URL}/api/hours/create`, { totalHours: data.totalHours, hoursRequested: data.hoursRequested })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

export function updateHours(data, id) {
    return axios.post(`${BASE_URL}/api/hours/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

