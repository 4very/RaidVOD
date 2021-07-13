type FightData = {
  id: number;
  startTime: number;
  endTime: number;
  fightPercentage: number;
  encounterID: number;
  kill: boolean;
  name: string;
};

function padToTwo(input: number): string {
  if (input.toString().length == 2) return input.toString();
  else return '0' + input.toString();
}

function secondsToTimestamp(input: number): string {
  const seconds: string = padToTwo(input % 60);
  const minutes: number = Math.floor(input / 60) % 60;
  const hours: number = Math.floor(input / 3600) % 60;

  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${padToTwo(minutes)}:${seconds}`;
}

export default function CreateDescription(
  TwitchStartTime: number,
  ReportStartTime: number,
  ReportFightData: FightData[]
) {
  const DescriptionArray: String[] = [];
  // if (TwitchStartTime < ReportStartTime) {
  //   DescriptionArray.push('0:00 Pre Raid');
  // } else {
  //   // do something
  // }
  DescriptionArray.push('0:00 Pre Raid');

  let LastEncounterID: number = undefined;
  let PullCounter = new Object();

  ReportFightData.forEach((fight: FightData) => {
    // if last fight was trash and this fight is too
    if (fight.encounterID == 0 && fight.encounterID == LastEncounterID) return;

    if (PullCounter[fight.encounterID] == undefined) {
      PullCounter[fight.encounterID] = 1;
    } else {
      PullCounter[fight.encounterID] += 1;
    }

    let FightStartTime: number = Math.floor(fight.startTime / 1000) + ReportStartTime;
    let RelativeFightTime = FightStartTime - TwitchStartTime;
    let formattedDuration = secondsToTimestamp(RelativeFightTime);

    let DescriptorString = `[${fight.id}] `;
    if (fight.encounterID != 0) {
      DescriptorString += fight.name;
      DescriptorString +=
        PullCounter[fight.encounterID] > 1 ? ` P${PullCounter[fight.encounterID]}` : '';
      DescriptorString += fight.kill ? ' Kill' : ` (${fight.fightPercentage.toFixed(1)}%)`;
    } else {
      DescriptorString += 'Trash';
    }

    DescriptionArray.push(formattedDuration + ' ' + DescriptorString);
    LastEncounterID = fight.encounterID;
  });

  return DescriptionArray.join('\n');
}
