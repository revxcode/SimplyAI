import { useState, useEffect } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import { common } from 'lowlight'
import bnf from 'highlight.js/lib/languages/bnf'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/atom-one-dark.css'
import remarkHtml from 'remark-html'

const MarkdownRender = (markdown) => {
    const [copiedCodes, setCopiedCodes] = useState({})

    const copyToClipboard = (code, index) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopiedCodes(prev => ({ ...prev, [index]: true }))
                setTimeout(() => {
                    setCopiedCodes(prev => ({ ...prev, [index]: false }))
                }, 2000)
            })
            .catch((err) => console.error('Failed to copy text: ', err))
    }

    const processor = unified()
        .data('settings', { fragment: true })
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(remarkMath)
        .use(remarkHtml)
        .use(rehypeSanitize, {
            schema: {
                ...defaultSchema,
                tagNames: [...defaultSchema.tagNames, 'pre', 'code'],
                attributes: {
                    '*': ['className'],
                    'code': ['className', 'data-language']
                }
            }
        })
        .use(rehypeKatex)
        .use(rehypeHighlight, { languages: { ...common, bnf } })
        .use(rehypeStringify)

    const result = processor.processSync(markdown)
    const content = result.toString()

    useEffect(() => {
        const codeBlocks = document.querySelectorAll('pre code')

        codeBlocks.forEach((block, index) => {
            if (!block.parentElement.querySelector('.copy-button')) {
                const codeText = block.innerText
                const button = document.createElement('button')
                button.className = 'copy-button text-white text-xs font-bold py-1 px-3 rounded-md absolute top-0 right-0 bg-green-500 rounded-br-none'
                button.textContent = copiedCodes[index] ? 'Copied!' : 'Copy'

                button.addEventListener('click', () => copyToClipboard(codeText, index))

                const language = document.createElement('div')
                language.className = 'absolute top-0 left-0 text-xs font-bold py-1 px-2'
                language.textContent = block.getAttribute('class').match(/language-(\w+)/)[1] || 'plaintext'

                block.parentElement.style.position = 'relative'
                block.parentElement.appendChild(button)
                block.parentElement.appendChild(language)
            }
        })

        return () => {
            codeBlocks.forEach((block) => {
                const button = block.parentElement.querySelector('.copy-button')
                if (button) {
                    button.remove()
                }
            })
        }
    }, [content, copiedCodes])

    return (
        <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}

export default MarkdownRender
