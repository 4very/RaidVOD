import { useRouter } from 'next/router';
import CreateDescription from '../../../src/scripts/CreateDescription';
import GenerateDescription from '../../../src/scripts/GenerateDescription';
import GetTwitchVODStart from '../../../src/scripts/GetTwitchVODStart';

export async function getServerSideProps(context) {
  let { ReportID, VODId } = context.params;
  const DescriptionText = await GenerateDescription(VODId, ReportID);

  return {
    props: { DescriptionText: DescriptionText }, // will be passed to the page component as props
  };
}

export default function ContentPage(props) {
  // const id = GetTwitchVODStart(VODId);
  let { DescriptionText } = props;

  return <div>{DescriptionText}</div>;
}
