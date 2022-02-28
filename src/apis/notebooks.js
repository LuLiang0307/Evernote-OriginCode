import request from '@/helpers/request';

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getAll() {
        return request(URL.GET, 'GET')
    },

    addNoteBook({ title = '' } = { title: '' }) {
        return request(URL.ADD, 'POST', { title })
    },

    updateNoteBook(id, { title = '' } = { title: '' }) {
        return request(URL.UPDATE.replace(':id', id), 'PATCH', { title })
    },

    deleteNoteBook(id) {
        return request(URL.DELETE.replace(':id', id), 'DELETE')
    }
}