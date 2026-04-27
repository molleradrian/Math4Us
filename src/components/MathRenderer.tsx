import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MathRendererProps {
  content: string;
}

export function MathRenderer({ content }: MathRendererProps) {
  return (
    <div className="math-container text-[#E0D7D0] leading-relaxed overflow-x-auto text-lg font-light">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
          h1: ({ children }) => <h1 className="text-2xl font-light mb-6 text-[#F5F2ED] font-serif italic">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-light mb-4 text-[#F5F2ED] font-serif italic">{children}</h2>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-6 space-y-2 opacity-80">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-6 space-y-2 opacity-80">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          code: ({ children }) => <code className="bg-[#1A1A1A] px-2 py-0.5 rounded text-sm font-mono text-[#C5A059] border border-[#2A2A2A]">{children}</code>,
          pre: ({ children }) => <pre className="bg-[#161616] border border-[#2A2A2A] p-4 rounded-xl overflow-x-auto my-6">{children}</pre>,
          blockquote: ({ children }) => <blockquote className="border-l-2 border-[#C5A059] pl-6 italic text-[#C5A059]/70 my-6 text-xl">{children}</blockquote>,
          strong: ({ children }) => <strong className="text-[#F5F2ED] font-semibold">{children}</strong>,
          em: ({ children }) => <em className="text-[#C5A059] italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
