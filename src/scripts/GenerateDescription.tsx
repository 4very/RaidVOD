import GetTwitchVODStart from './GetTwitchVODStart';
import CreateDescription from './CreateDescription';
import GetWCLFightTimings from './GetWCLFightTimings';
import GetTwitchVODName from './GetTwitchVodName';
import GetWCLName from './GetWCLReportName';

export default async function GenerateDescription(
  VODId: string | string[],
  ReportID: string | string[]
) {
  if (VODId == undefined || ReportID == undefined) {
    return undefined;
  }

  const VODStartTime = await GetTwitchVODStart(VODId.toString());
  const { ReportStartTime, ReportFightData } = await GetWCLFightTimings(ReportID.toString());

  var VodName = await GetTwitchVODName(VODId.toString());
  var ReportName = await GetWCLName(ReportID.toString());

  if (VodName == undefined) {
    VodName = 'Could not fetch name';
  }
  if (ReportName == undefined) {
    ReportName = 'Could not fetch name';
  }

  return {
    DescriptionText: CreateDescription(VODStartTime, ReportStartTime, ReportFightData),
    VodName: VodName,
    ReportName: ReportName,
  };

  // return CreateDescription(WCLData, VODStartTime);
}
