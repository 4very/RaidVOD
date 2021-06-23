import GetTwitchVODStart from './GetTwitchVODStart';
import CreateDescription from './CreateDescription';
import GetWCLFightTimings from './GetWCLFightTimings';

export default async function GenerateDescription(
  VODId: string | string[],
  ReportID: string | string[]
) {
  if (VODId == undefined || ReportID == undefined) {
    return undefined;
  }

  const VODStartTime = await GetTwitchVODStart(VODId.toString());
  const { ReportStartTime, ReportFightData } = await GetWCLFightTimings(ReportID.toString());
  return CreateDescription(VODStartTime, ReportStartTime, ReportFightData);

  //   return CreateDescription(WCLData, VODStartTime);
}
