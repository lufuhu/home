const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
module.exports = {
    publicPath: "/",
    configureWebpack: config => {
        if (IS_PROD) {
            config.externals = {
                vue: "Vue",
                Vuex: 'Vuex',
                "vue-router": "VueRouter",
                axios: "axios",
                'element-ui': 'ELEMENT',
                "overlayscrollbars": 'Overlayscrollbars',
                "overlayscrollbars-vue": 'OverlayScrollbarsVue',
            };
        }
    },
    chainWebpack: config => {
        const cdn = IS_PROD ? {
            css: [
            ],
            js: [
                "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js",
                "https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js",
                "https://unpkg.com/vue-router/dist/vue-router.min.js",
                "https://unpkg.com/vuex",
                "https://unpkg.com/axios@0.21.1/dist/axios.min.js",
                "https://unpkg.com/element-ui/lib/index.js",
                "https://unpkg.com/overlayscrollbars@1.13.1/js/OverlayScrollbars.js",
                "https://unpkg.com/overlayscrollbars-vue@0.2.2/dist/overlayscrollbars-vue.js",
            ]
        } : {};
        config.plugin("html").tap(args => {
            args[0].cdn = cdn;
            args[0].title = "LUFUHU";
            return args;
        });
        // 修复HMR
        config.resolve.symlinks(true);
    }
};