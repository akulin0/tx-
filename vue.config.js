module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData:
                    '@import "./style/nightMode.scss";',
            },
        },
    },
};
module.exports = {
    transpileDependencies: ['@dcloudio/uni-ui']
};