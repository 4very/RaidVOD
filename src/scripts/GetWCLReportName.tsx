async function getToken(): Promise<string> {
  const clientId = process.env.WCLClientID;
  const clientSecret = process.env.WCLClientPrivate;

  const basicAuth = btoa(`${clientId}:${clientSecret}`);

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

async function getNameData(ReportID: string) {
  let query = `{ reportData { report(code: "${ReportID}") { title } } }`;

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
  return content.data.reportData.report.title;
}

export default async function GetWCLName(ReportID: string) {
  if (ReportID == undefined) {
    return;
  }
  //   const token = await getToken();
  //   console.log(token);
  return await getNameData(ReportID);
}
