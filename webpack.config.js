const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {

    resolve: {
        fallback: {
            "url": require.resolve("url/"),
        },
    },
    plugins: [
        new NodePolyfillPlugin(),
    ],
};
