window.addEventListener('load', function () {
    (function () {
        'use strict'

        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)

        // defined a sleep function to delay click event, avoiding stackoverflow
        function sleep(ms = 1000) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, ms)
            })
        }
        
        // create an observer innstace to watch the change in attributes of element node
        const attrObserver = new MutationObserver((mutations) => {
            mutations.forEach(mu => {  
                const node = mu.target
                
                if (mu.type !== "attributes" && mu.attributeName !== "class") return
  
                if (node.classList.contains('shown')) {
                    sleep(1500).then(() => document.addEventListener('click', isClickOutside))
                } else {
                    document.removeEventListener('click', isClickOutside)
                }
            })
        })

        // defined click outside element node event
        function isClickOutside (event) {
            if (!event.target.closest('.dialog')) $('.dialog').classList.remove('shown')
        }

        // query all dialogs available in document
        const dialogs = $$('.dialog')
        // loop through every node to add event
        dialogs.forEach(el => {
            const cancelBtn = el.querySelector('.btn-cancel')
            cancelBtn.onclick = () => {
                el.classList.remove('shown')
            }
            attrObserver.observe(el, { attributes: true })
        })

    })()
})