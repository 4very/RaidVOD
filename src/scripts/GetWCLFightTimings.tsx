async function getToken(): Promise<string> {
  const clientId = process.env.WCLClientID;
  const clientSecret = process.env.WCLClientPrivate;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://www.warcraftlogs.com/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const content = await response.json();
  return content.access_token;
}

async function getFightsData(ReportID: string) {
  let query = `{ reportData { report(code: "${ReportID}") { startTime, fights{ id, startTime, endTime, fightPercentage, encounterID, kill, name } } } }`;

  const response = await fetch('https://www.warcraftlogs.com/api/v2/client', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //   Accept: 'application/json',
      Authorization: `Bearer ${await getToken()}`,
    },
    body: JSON.stringify({ query: query }),
  });

  const content = await response.json();
  return content.data.reportData.report;
}

export default async function GetWCLFightTimings(
  ReportID: string
): Promise<{ ReportStartTime; ReportFightData }> {
  if (ReportID == undefined) {
    return;
  }
  //   const token = await getToken();
  //   console.log(token);
  const { startTime, fights } = await getFightsData(ReportID);
  return { ReportStartTime: Math.floor(startTime / 1000), ReportFightData: fights };
}
