"use client";

// import { EditServerModal } from "@/components/modals/edit-server-modal";
// import { InviteModal } from "@/components/modals/invite-modal";
// import { CreateServerModal } from "@/components/modals/create-server-modal";
// import { MembersModal } from "@/components/modals/members-modal";
// import { CreateChannelModal } from "@/components/modals/create-channel-modal";
// import { LeaveServerModal } from "@/components/modals/leave-server-modal";
// import { DeleteServerModal } from "@/components/modals/delete-server-modal";
// import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
// import { EditChannelModal } from "@/components/modals/edit-channel-modal";
// import { MessageFileModal } from "@/components/modals/message-file-modal";
// import { DeleteMessageModal } from "@/components/modals/delete-message-modal";

import { useModal } from "@worldcord/hooks/use-modal";
import { useEffect, useRef } from "react";
import DeleteMessageModal from "../modals/delete-message-modal";
import CountryRouteModal from "../modals/country-route-modal";
import CreateChannelModal from "../modals/create-channel-modal";

const modalMap = {
  deleteMessage: <DeleteMessageModal />,
  countryRoute: <CountryRouteModal />,
  createChannel: <CreateChannelModal />,
};

export default function ModalProvider() {
  const ref = useRef(null);

  const { onInital, type } = useModal();

  useEffect(() => {
    onInital(ref);

    return () => {
      onInital(null);
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-s"
    >
      {modalMap[type!]}
    </dialog>
  );
}
