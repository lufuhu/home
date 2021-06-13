export default {
    articleGetSelect: {
        url: '/home/article/get_select_data',
        method: 'GET',
    },
    articleGetEnum: {
        url: '/home/article/get_enum',
        method: 'GET',
    },
    articleView: {
        url: '/home/article/article/{id}',
        method: 'GET',
    },
    articleList: {
        url: '/home/article/article',
        method: 'GET',
    },
    articleAdd: {
        url: '/home/article/article',
        method: 'POST',
    },
    articleEdit: {
        url: '/home/article/article/{id}',
        method: 'POST'
    },
    articleDel: {
        url: '/home/article/article/{id}',
        method: 'DELETE'
    },
}