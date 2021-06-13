import Cookies from 'js-cookie'
import Utils from '../utils'

export default {
    initDone:{},
    user: {
        mutations: function () {
            return Cookies.get('user') ? JSON.parse(Utils.decodeEntities(Cookies.get('user'))) : {}
        },
    },
    token: {},
    scrollTop: {
        getters: function (val) {
            return val > 0 ? parseInt(val) : 0
        }
    },
    scrollBottom: {
        getters: function (val) {
            return val > 0 ? parseInt(val) : 0
        }
    },
    mdDraft: {
        title: '',
        content: ''
    },
}