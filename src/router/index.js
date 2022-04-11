import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import NoteDetail from '@/components/NoteDetail'
import TrashDetail from '@/components/TrashDetail'

Vue.use(Router)

//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = Router.prototype.push
    //修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [{
            path: '/login',
            component: Login
        },
        {
            path: '/notebooks',
            component: NotebookList
        },
        {
            path: '/note',
            component: NoteDetail
        },
        {
            path: '/trash',
            component: TrashDetail
        }
    ]
})