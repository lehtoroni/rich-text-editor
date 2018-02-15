const answer = document.getElementById('answer1')
makeRichText(answer, {
    screenshot: {
        saver: ({data}) =>
            new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = evt => resolve(evt.target.result)
                reader.readAsDataURL(data)
            }),
        limit: 10
    },
    baseUrl: ''
})
answer.focus()

const trackError = (e = {}) => {
    const category = 'JavaScript error'
    const action = e.message
    const label = e.filename + ':' + e.lineno
    ga('send', 'event', category, action, label)
}

if (window.addEventListener) {
    window.addEventListener('error', trackError, false)
} else if (window.attachEvent) {
    window.attachEvent('onerror', trackError)
} else {
    window.onerror = trackError
}
const $tools = $('[data-js="tools"]')
$tools.on('mousedown', '[data-js="expandCollapseCharacters"]', () => ga('send', 'event', 'toolbar', 'toggle', ($tools.hasClass('rich-text-editor-characters-expanded') ? 'expand' : 'collapse')))
$('[data-js="mathToolbar"]').on('mousedown', 'button', e => ga('send', 'event', 'toolbar', 'latex', e.currentTarget.dataset.latexcommand))
$('[data-js="charactersList"]').on('mousedown', 'button', e => ga('send', 'event', 'toolbar', 'character', e.currentTarget.innerText))
