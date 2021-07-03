export default {
    qrcodeToken: {
        url: '/auth/qrcode_token',
        method: 'GET',
    },
    qrcodeVerify: {
        url: '/auth/qrcode_verify',
        method: 'POST',
        error: false,
    },
    loginOut: {
        url: '/auth/loginout',
        method: 'POST',
        error: false,
    },
}