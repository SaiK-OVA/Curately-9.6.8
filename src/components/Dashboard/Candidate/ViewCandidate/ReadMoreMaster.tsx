import React, { useEffect } from 'react';
import './ReadMoreMaster.scss';

interface ExpandableContentProps {
  content: string;
  maxLines: number;
  expanded: boolean;
}

const ReadMoreMaster: React.FC<ExpandableContentProps> = ({ content, maxLines, expanded }) => {

  content = content.replace('<style type="text/css">', '<style type="text/css"> .htmlCont {');
  content = content.replace('<style style="text/css">', '<style style="text/css"> .htmlCont {');
  content = content.replace('<style>', '<style> .htmlContent {');
  content = content.replace('</style>', '} </style>');

  const cleanedContent = content
    .replace(/<p>\s*<\/p>/g, '');   // Remove empty <p> tags
    // .replace(/<br\s*\/?>/g, '');    // Remove <br> tags

  const tempElement = document.createElement('div');
  tempElement.innerHTML = cleanedContent;
  const text = tempElement.innerText.trim();

  return (
    <div
      className="readMoreContent"
      style={{
        maxHeight: expanded ? 'none' : `${maxLines * 20}px`,
        color: expanded ? '#1a1a1a' : '#737373',
        padding: expanded ? '10px' : '2px',
        overflow: expanded ? 'auto' : 'hidden'
      }}
    >

      <div dangerouslySetInnerHTML={{ __html: expanded ? cleanedContent : text.substring(0, 50) }} />
    </div>
  );
};

export default ReadMoreMaster;
