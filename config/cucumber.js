module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "" ,
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "./src/tests/features/"
        ],          
        require: [
            "./src/tests/steps/*.ts",
            "./src/hooks/hooks.ts"
        ],
        requireModule: ["ts-node/register"],
        parallel: 2,
        format: [
            "progress-bar",
            "html:test-result/cucumber-report.html",
            "json:test-result/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        timeout: 60000
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },   
        require: [
            "./src/tests/steps/*.ts",
            "./src/hooks/hooks.ts"
        ],
        requireModule: ["ts-node/register"],
        parallel: 1,
        format: [
            "progress-bar",
            "html:test-result/cucumber-report.html",
            "json:test-result/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        timeout: 60000
    } 
};
