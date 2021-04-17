module.exports = {
    require: ['@babel/register'],
    timeout: 5000,
    reporter: 'spec',
    recursive: true,
    spec: ['src/**/*.spec.js'],
    extension: ['js'],
    ui: 'bdd'
}