/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import Markdown from "react-markdown";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import ruby from "highlight.js/lib/languages/ruby";
import php from "highlight.js/lib/languages/php";
import swift from "highlight.js/lib/languages/swift";
import csharp from "highlight.js/lib/languages/csharp";
import go from "highlight.js/lib/languages/go";
import typescript from "highlight.js/lib/languages/typescript";
import rust from "highlight.js/lib/languages/rust";
import kotlin from "highlight.js/lib/languages/kotlin";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy, Check } from "lucide-react";

// Register languages for syntax highlighting
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("php", php);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("go", go);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);

export const MDRender = ({ children }) => {
  // const { markdown } = props;

  // console.log(children);

  return (
    <Markdown
      children={children}
      components={{
        // Custom code block rendering for syntax highlighting
        code(props) {
          const { children, className, ...rest } = props;
          let language = className?.replace(/language-/, "");
          if (!language) {
            // Try to detect language if not provided
            const autoDetectResult = hljs.highlightAuto(children);
            language = autoDetectResult.language;
          }
          // Only allow specified languages
          if (!language || !hljs.getLanguage(language)) {
            language = "plaintext"; // Default to plaintext if language not found or allowed
          }
          // console.log(language);
          const [copied, setCopied] = useState(false);

          return language != "plaintext" ? (
            <div className="relative">
              <CopyToClipboard
                text={String(children).replace(/\n$/, "")}
                onCopy={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
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
                {...rest}
                language={language}
                s
                style={materialDark}
                className="my-4 rounded-lg shadow-lg bg-red-400" // Example TailwindCSS classes for syntax highlight block
                codeTagProps={{
                  className: `language-${language} text-xs`,
                }}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="text-sm hover:font-bold hover:text-blue-600 dark:hover:text-yellow-500 duration-200">
              {children}
            </code>
          );
        },
        // Common markdown components
        h1(props) {
          return <h1 className="text-3xl font-bold my-4" {...props} />;
        },
        h2(props) {
          return <h2 className="text-2xl font-bold my-3" {...props} />;
        },
        h3(props) {
          return <h3 className="text-xl font-bold my-3" {...props} />;
        },
        h4(props) {
          return <h4 className="text-lg font-bold my-2" {...props} />;
        },
        h5(props) {
          return <h5 className="text-base font-bold my-2" {...props} />;
        },
        h6(props) {
          return <h6 className="text-sm font-bold my-2" {...props} />;
        },
        p(props) {
          return <p className="text-base my-4 leading-relaxed" {...props} />;
        },
        ul(props) {
          return <ul className="list-disc list-inside my-3" {...props} />;
        },
        ol(props) {
          return <ol className="list-decimal list-inside my-3" {...props} />;
        },
        li(props) {
          return <li className="my-1 py-0.5" {...props} />;
        },
        img(props) {
          return <img className="my-4 rounded-lg shadow-lg" {...props} />;
        },
        a(props) {
          return (
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              {...props}
            />
          );
        },
        blockquote(props) {
          return (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 my-4 italic"
              {...props}
            />
          );
        },
        hr(props) {
          return <hr className="my-4 border-gray-300" {...props} />;
        },
        table(props) {
          return (
            <table
              className="my-4 border-collapse border border-gray-300"
              {...props}
            />
          );
        },
        tbody(props) {
          return <tbody className="divide-y divide-gray-300" {...props} />;
        },
        td(props) {
          return <td className="border border-gray-300 px-4 py-2" {...props} />;
        },
        th(props) {
          return (
            <th
              className="border border-gray-300 px-4 py-2 bg-gray-100"
              {...props}
            />
          );
        },
        thead(props) {
          return <thead className="bg-gray-200" {...props} />;
        },
        tr(props) {
          return <tr className="bg-white" {...props} />;
        },
        // Add more components as needed based on your Markdown content
      }}
    />
  );
};
