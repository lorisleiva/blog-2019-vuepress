module.exports = (options) => ({
    name: 'disqus',
    enhanceAppFiles () {
        let name = options.name || 'Disqus'
        let component = `'vue-disqus/src/vue-disqus.vue'`

        return {
            name: 'disqus-component-registration',
            content: `export default ({ Vue }) => { Vue.component('${name}', ${component}) }`
        }
    }
})