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