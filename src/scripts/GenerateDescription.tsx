import GetTwitchVODStart from './GetTwitchVODStart';
import CreateDescription from './CreateDescription';

export default async function GenerateDescription(
  VODId: string | string[],
  ReportID: string | string[]
) {
  if (VODId == undefined || ReportID == undefined) {
    return undefined;
  }

  const VODStartTime = await GetTwitchVODStart(VODId.toString());
  return CreateDescription(ReportID.toString(), VODStartTime);
}
