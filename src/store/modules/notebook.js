import Notebook from "@/apis/notebooks"
import { Message } from 'element-ui'

const state = {
  //传进来的值为真实的空
  notebooks: null,
  curBookId: null
}

const getters = {
  notebooks: state => state.notebooks || {},
  curBook: state =>{
    if(!Array.isArray(state.notebooks)) return {} //如果为空，则置为对象
    if(!state.curBookId) return state.notebooks[0] //如果不存在，就选择列表的第一个
    //返回找到的那一个
    return state.notebooks.find(notebook => notebook.id == state.curBookId) //等号两边传递的不是同一个数据类型，不能用===
  }
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },

  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },

  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.id === payload.notebookId) || {}
    notebook.title = payload.title
  },
  
  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id !== payload.notebookId)
  },

  setCurBook(state, payload) {
    state.curBookId = payload.curBookId
  }
}

const actions = {
  getNotebooks({ commit }) {
    return Notebook.getAll()
      .then(res => {
        commit('setNotebooks', { notebooks: res.data })
      })
  },

  addNotebook({ commit }, payload) {
    return Notebook.addNoteBook({title: payload.title})
      .then(res=>{
        console.log(res)
        commit('addNotebook', {notebook: res.data})
        Message.success(res.msg)
      })
  },

  updateNotebook({ commit }, payload) {
    return Notebook.updateNoteBook(payload.notebookId,{ title: payload.title})
      .then(res =>{
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
        Message.success(res.msg)
      })
  },

  deleteNotebook({ commit }, payload) {
    return Notebook.deleteNoteBook(payload.notebookId)
      .then(res => {
        commit('deleteNotebook', {notebookId: payload.notebookId})
        Message.success(res.msg)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}