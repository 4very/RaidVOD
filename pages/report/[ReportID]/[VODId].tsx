import GenerateDescription from '../../../src/scripts/GenerateDescription';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useState } from 'react';

export async function getStaticProps(context) {
  const { ReportID, VODId } = context.params;
  const in_props = await GenerateDescription(VODId, ReportID);

  return {
    props: in_props, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { ReportID: `KBJrRqPanyHTp1Yh`, VODId: `1181599130` } }, // See the "paths" section below
    ],
    fallback: true, // See the "fallback" section below
  };
}

export default function ContentPage(props) {
  // const id = GetTwitchVODStart(VODId);
  const { DescriptionText, ReportName, VodName } = props;
  const [isCopied, setCopied] = useState(false);
  const [style, setStyle] = useState({ display: `none` });

  return (
    <div className="w-screen h-screen place-items-center justify-center flex ">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <table className="mb-5">
          <tbody>
            <tr>
              <td>Report Title:</td>
              <td>{ReportName}</td>
            </tr>
            <tr>
              <td>Twitch Vod Title:</td>
              <td>{VodName}</td>
            </tr>
          </tbody>
        </table>
        <div style={style}>
          <div className="mx-2 absolute">
            <div className="bg-gray-700 text-white text-xs rounded py-1 px-4 right-0 bottom-full shadow-lg">
              {isCopied ? `Copied` : `Click to Copy`}
            </div>
          </div>
        </div>
        <CopyToClipboard text={DescriptionText} onClick={() => setCopied(true)}>
          <pre
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight hover:ring-1 hover:ring-purple-200 hover:shadow-outline hover:shadow-lg"
            onMouseEnter={() => {
              setStyle({ display: `block` });
            }}
            onMouseLeave={() => {
              setStyle({ display: `none` });
            }}>
            {DescriptionText}
          </pre>
        </CopyToClipboard>
      </div>
    </div>
  );
}
