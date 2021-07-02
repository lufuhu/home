import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('../views/index.vue')
const Home = () => import('../views/home.vue')
const Article = () => import('../views/article.vue')
const Cheatsheet = () => import('../views/cheatsheet.vue')
const Tool = () => import('../views/tool.vue')
const Login = () => import('../views/login.vue')

const EditArticle = () => import('../views/edit/article')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
            },
            {
                path: '/article',
                name: 'Article',
                component: Article,
            },{
                path: '/cheatsheet',
                name: 'Cheatsheet',
                component: Cheatsheet,
            },{
                path: '/tool',
                name: 'Tool',
                component: Tool,
            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
            }
        ],
    },
    {
        path: '/edit/:id?',
        name: 'EditArticle',
        component: EditArticle,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: to => {
        if (to.hash) {
            return {selector: to.hash};
        } else {
            return {x: 0, y: 0};
        }
    }
})

export default router