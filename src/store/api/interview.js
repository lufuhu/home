export default {
    interviewGetSelect: {
        url: '/interview/get_select_data',
        method: 'GET',
        cache:true,
    },
    interviewList: {
        url: '/interview/interview',
        method: 'GET',
        cache:true,
    },
    interviewView: {
        url: '/interview/interview/{id}',
        method: 'GET',
    },
    interviewAdd: {
        url: '/interview/interview',
        method: 'POST',
    },
    interviewEdit: {
        url: '/interview/interview/{id}',
        method: 'POST'
    },
    interviewDel: {
        url: '/interview/interview/{id}',
        method: 'DELETE'
    },
}