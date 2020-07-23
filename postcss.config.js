module.exports = ({
    env
}) => {
    let environment = {
        plugins: [
            require("tailwindcss")("./tailwind.config.js"),
            require('autoprefixer'),
            require("postcss-import")
        ]
    };

    // Disabling PurgeCSS for now since it's being overly aggressive and
    // removing CSS that we're using by means of javascript plugins.
    // For example, the Prism line numbers and copy to clipboard plugins.
    // We still get Tailwind purging via their built-in support.
    // // Only run PurgeCSS in production
    // if (env === "production") {
    //     environment.plugins.push(
    //         require('@fullhuman/postcss-purgecss')({
    //             content: [
    //                 './**/*.hbs',
    //                 './src/**/*.js',
    //             ],
    //             defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
    //         })
    //     );
    // }

    // Only run cssnano in production
    if (env === "production") {
        environment.plugins.push(
            require("cssnano")({
                preset: "default"
            })
        );
    }

    return environment;
};
