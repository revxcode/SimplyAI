/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Copy, Check } from "lucide-react"
import Markdown from "react-markdown"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"
import java from "highlight.js/lib/languages/java"
import ruby from "highlight.js/lib/languages/ruby"
import php from "highlight.js/lib/languages/php"
import swift from "highlight.js/lib/languages/swift"
import csharp from "highlight.js/lib/languages/csharp"
import go from "highlight.js/lib/languages/go"
import typescript from "highlight.js/lib/languages/typescript"
import rust from "highlight.js/lib/languages/rust"
import kotlin from "highlight.js/lib/languages/kotlin"
import sql from "highlight.js/lib/languages/sql"
import xml from "highlight.js/lib/languages/xml"
import css from "highlight.js/lib/languages/css"
import bash from "highlight.js/lib/languages/bash"
import json from "highlight.js/lib/languages/json"
import yaml from "highlight.js/lib/languages/yaml"
import remarkGfm from "remark-gfm"
// import rehypeRaw from "rehype-raw"

// Register languages for syntax highlighting
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("java", java)
hljs.registerLanguage("ruby", ruby)
hljs.registerLanguage("php", php)
hljs.registerLanguage("swift", swift)
hljs.registerLanguage("csharp", csharp)
hljs.registerLanguage("go", go)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("rust", rust)
hljs.registerLanguage("kotlin", kotlin)
hljs.registerLanguage("sql", sql)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("css", css)
hljs.registerLanguage("bash", bash)
hljs.registerLanguage("json", json)
hljs.registerLanguage("yaml", yaml)

export const MdRender = ({ children }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      children={children}
      components={{
        code({ node, inline, className, children, ...props }) {
          const [copied, setCopied] = useState(false)
          const match = /language-(\w+)/.exec(className || "")
          const language = match ? match[1] : ""

          return !inline && match ? (
            <div className="relative mt-6">
              <span className="absolute -top-3 left-4 text-xs md:text-sm rounded z-10 bg-zinc-300 dark:bg-zinc-700 px-2 py-0.5 shadow-md">{language}</span>
              <CopyToClipboard
                text={String(children).replace(/\n$/, "")}
                onCopy={() => {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
              >
                <button className="absolute top-1 right-1 text-xs rounded z-10 m-1">
                  {copied ? (
                    <div className="flex gap-1 items-center">
                      <Check className="w-5 h-5 text-green-500 p-0.5" />
                      <span className="text-zinc-200">Copied</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <Copy className="w-5 h-5 text-zinc-400 peer p-0.5" />
                      <span className="absolute bg-zinc-700 py-1 px-2 -top-6 right-0 rounded-md shadow-md rounded-br-none text-white opacity-0 peer-hover:opacity-100 peer-hover:delay-500 peer-hover:right-5 peer-hover:duration-200">
                        Copy
                      </span>
                    </div>
                  )}
                </button>
              </CopyToClipboard>
              <SyntaxHighlighter
                style={materialDark}
                language={language}
                PreTag="div"
                codeTagProps={{
                  className: `language-${language} text-xs`,
                }}
                className="my-4 rounded-lg shadow-lg bg-red-400"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="text-xs md:text-sm font-semibold hover:text-blue-600 dark:hover:text-purple-500 duration-200">
              {children}
            </code>
          )
        },
        h1({ children }) {
          return <h1 className="text-3xl font-bold my-3">{children}</h1>
        },
        h2({ children }) {
          return <h2 className="text-2xl font-bold my-3">{children}</h2>
        },
        h3({ children }) {
          return <h3 className="text-xl font-bold my-2">{children}</h3>
        },
        h4({ children }) {
          return <h4 className="text-lg font-bold my-2">{children}</h4>
        },
        h5({ children }) {
          return <h5 className="text-base font-bold my-1">{children}</h5>
        },
        h6({ children }) {
          return <h6 className="text-sm font-bold my-1">{children}</h6>
        },
        p({ children }) {
          return (
            <p className="text-xs md:text-sm my-2 leading-relaxed">
              {children}
            </p>
          )
        },
        ul({ children }) {
          return (
            <ul className="text-xs md:text-sm list-disc list-inside my-2">
              {children}
            </ul>
          )
        },
        ol({ children }) {
          return (
            <ol className="text-xs md:text-sm list-decimal list-inside my-2">
              {children}
            </ol>
          )
        },
        li({ children }) {
          return <li className="my-0.5 py-0.5">{children}</li>
        },
        img({ src, alt }) {
          return (
            <img
              className="my-2 md:my-4 rounded-lg shadow-lg"
              src={src}
              alt={alt}
            />
          )
        },
        a({ href, children }) {
          return (
            <a
              className="text-xs md:text-sm text-blue-500 hover:underline"
              target="_blank"
              href={href}
            >
              {children}
            </a>
          )
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-zinc-300 pl-2 my-2 italic">
              {children}
            </blockquote>
          )
        },
        hr() {
          return <hr className="my-2 border-zinc-300" />
        },
        table({ children }) {
          return (
            <div className="p-1">
              <table className="border-collapse border border-zinc-500">
                {children}
              </table>
            </div>
          )
        },
        tbody({ children }) {
          return <tbody className="divide-y divide-zinc-300 ">{children}</tbody>
        },
        td({ children }) {
          return (
            <td className="border border-zinc-500 px-4 py-2">{children}</td>
          )
        },
        th({ children }) {
          return (
            <th className="border border-zinc-500 px-4 py-2 bg-zinc-700">
              {children}
            </th>
          )
        },
        thead({ children }) {
          return <thead className="bg-zinc-900">{children}</thead>
        },
        tr({ children }) {
          return <tr className="bg-zinc-900">{children}</tr>
        },
      }}
    />
  )
}
