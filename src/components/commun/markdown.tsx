import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const Markdown: React.FC<{ content?: string; className?: string }> = ({
  content,
  className,
}) => {
  return (
    <>
      {content && (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} className={className}>
          {content}
        </ReactMarkdown>
      )}
    </>
  );
};
