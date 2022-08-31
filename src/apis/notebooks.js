import request from '@/helpers/request';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET, 'GET').then(res => {
        res.data = res.data.sort((notebook1, notebook2) => notebook1.updatedAt < notebook2.updatedAt ? 1 : -1)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
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