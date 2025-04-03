import { useEffect, useState } from 'react';
import type { BrowserNode } from './browser';
import { isCmsBrowserNode } from './data';
import type { Row } from '@tanstack/react-table';

export const FunctionInfoProvider = ({ row }: { row?: Row<BrowserNode> }) => {
  // fake loading via network
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (row?.getIsSelected()) {
      setLoading(true);
    }
  }, [row]);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);
  if (loading) {
    return <div>Loading javaDoc from backend...</div>;
  }
  return (
    <>
      <div>{row?.original.value}</div>
      <pre dangerouslySetInnerHTML={{ __html: `Gets the data from bla...<dl><dt>Returns:</dt><dd> ${row?.original.info}</dd></dl></>` }} />
    </>
  );
};

export const CmsInfoProvider = ({ row }: { row?: Row<BrowserNode> }) => {
  const node = row?.original;
  if (node && isCmsBrowserNode(node)) {
    return (
      <>
        <div>{node.value}</div>
        <code>
          {Object.entries(node.cmsValues).map(([key, value]) => (
            <div key={key}>
              <b>{`${key}: `}</b>
              {value}
            </div>
          ))}
        </code>
      </>
    );
  }
  return node?.value;
};
