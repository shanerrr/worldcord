import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "countryRoute"
  | "createChannel"
  | "deleteMessage"
  | "createServer"
  
  | "invite"
  | "editServer"
  | "members"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile";

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  details?: {
    serverId?: string;
    channelId?: string;
    messageId?: string;
    countryName?: string;
    iso_a2?: string;
    iso_n3?: string;
  };
}

interface ModalStore {
  type: ModalType | null;
  modalRef: React.RefObject<HTMLDialogElement> | null;
  data: ModalData;
  onInital: (ref: React.RefObject<HTMLDialogElement> | null) => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  modalRef: null,
  data: {},
  onInital: (ref) => set({ modalRef: ref }),
  onOpen: (type, data = {}) =>
    set((state) => {
      state.modalRef?.current?.showModal();
      return { type, data };
    }),
  onClose: () =>
    set((state) => {
      state.modalRef?.current?.close();
      return state;
    }),
}));
