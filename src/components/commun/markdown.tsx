import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const Markdown: React.FC<{ content?: string }> = ({ content }) => {
  // TODO améliorer, les liens ne sont pas bons avec cette lib

  return (
    <>
      {content && (
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      )}
    </>
  );
};
