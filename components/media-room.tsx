"use client";

import { useState } from "react";

import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";

type MediaRoomProps = {
  channelId: string;
  userId: string;
};

export default function MediaRoom({ channelId, userId }: MediaRoomProps) {
  // set the connection state
  const [activeConnection, setActiveConnection] = useState(true);

  // track the mic/video state - Turn on Mic and Camera On
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(false);

  // get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  // Join the channel
  useJoin(
    {
      uid: userId,
      appid: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
      channel: "test",
      token:
        "007eJxTYAje27l7+2PnaQHJnAyVkiu+tqb/MS9SPSh+KG+dqkv8xZcKDKYmlimWSZYmhobmpiZpacaWyYaplgaJiSkp5qmmlmmWDzKWpTYEMjIs+SbDwsgAgSA+C0NJanEJAwMAXSkgNw==",
    },
    activeConnection
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  //remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // play the remote user audio tracks
  audioTracks.forEach((track) => track.play());

  return (
    <section className="flex-1">
      <div id="flex-1">
        {
          // Initialize each remote stream using RemoteUser component
          remoteUsers.map((user) => (
            <div key={user.uid} className="remote-video-container">
              <RemoteUser user={user} />
            </div>
          ))
        }
      </div>
      <div id="localVideo">
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          playAudio={micOn}
          playVideo={cameraOn}
          className=""
        />
        <div>
          {/* media-controls toolbar component - UI controling mic, camera, & connection state  */}
          <div id="controlsToolbar">
            <div id="mediaControls">
              <button className="btn" onClick={() => setMic((a) => !a)}>
                Mic
              </button>
              <button className="btn" onClick={() => setCamera((a) => !a)}>
                Camera
              </button>
            </div>
            <button
              id="endConnection"
              onClick={() => {
                setActiveConnection(false);
                // navigate("/");
              }}
            >
              {" "}
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
