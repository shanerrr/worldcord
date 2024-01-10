("use client");

import { useEffect, useState, useRef } from "react";
import AgoraRTC, { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useAgora } from "./providers/agora-provider";

const TOKEN =
  "007eJxTYHjl/PH+nuLbrNa2wmEq656VHd7UZ1ak+dNkYvAEyVMi+UkKDKYmlimWSZYmhobmpiZpacaWyYaplgaJiSkp5qmmlmmWre/npjYEMjJc/SbOysgAgSA+M0NOfg4DAwBBDR/F";
const CHANNEL = "lol";

export default function VideoRoom() {
  
  const { client } = useAgora();

  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState(false);

  // const { ready, tracks } = client.useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID!,
        name,
        TOKEN,
        null
      );
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(CHANNEL);
    }
  }, [CHANNEL, client, ready, tracks]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
}

const VideoPlayer = ({ user }) => {
  const ref = useRef(null);

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      Uid: {user.uid}
      <div ref={ref} style={{ width: "200px", height: "200px" }}></div>
    </div>
  );
};
