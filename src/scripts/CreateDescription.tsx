export default function CreateDescription(ReportID: string, TwitchStartTime: number) {
  if (ReportID == undefined) {
    return '';
  }
  return ReportID.toString() + ' aaaaaaa';
}
