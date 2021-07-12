import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';

function getApiClient(): ApiClient {
  const clientId = process.env.twitchClientID;
  const clientSecret = process.env.twitchPrivateKey;

  const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
  const apiClient = new ApiClient({ authProvider });
  return apiClient;
}

export default async function GetTwitchVODName(VODId: string) {
  if (VODId == undefined) {
    return 0;
  }

  const apiClient = getApiClient();
  const VOD = await apiClient.helix.videos.getVideoById(VODId);
  return VOD.title;
}
