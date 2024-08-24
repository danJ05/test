(function (window) {
    window.__env = window.__env || {};

    // PROD Config
    window.__env.prod = {
        apiUrl: '',
        fileUrl: '',
        environmentDeployment: 'PROD',
        enableDebug: false
    };

    // DEV Config
    window.__env.dev = {
        apiUrl: '',
        fileUrl: '',
        environmentDeployment: 'DEV',
        enableDebug: true
    };

    window.__env.currentEnv = window.__env.prod;

}(this));