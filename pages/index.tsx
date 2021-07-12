import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const redirectUser = (event) => {
    event.preventDefault();
    const vodid: string = event.target.TVODID.value;
    const rid: string = event.target.WCLID.value;
    let link = `/`;
    if (vodid == `` && rid == ``) {
      link = `/report/` + event.target.WCLID.placeholder + `/` + event.target.TVODID.placeholder;
    } else {
      link = `/report/` + vodid + `/` + rid;
    }

    router.push(link);
  };
  return (
    <div className="w-screen h-screen place-items-center justify-center flex ">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={redirectUser}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Twitch Vod ID</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-1 focus:ring-purple-500 focus:shadow-outline"
              id="TVODID"
              type="text"
              placeholder="1083966977"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Warcraft Logs Report ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-1 focus:ring-purple-500 focus:shadow-outline"
              id="WCLID"
              type="text"
              placeholder="fHyjqYB1Qwc7D2AN"
            />
          </div>
          <div className="flex items-center justify-between flex-wrap-reverse">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
