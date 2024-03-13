import { useState } from "react";
import { api } from "@/trpc/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingSVG from "./LoadingSVG";
import { cn } from "@/utils/tailwind-merge";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ChatEventForm from "./ChatEventCreateForm";
import { CreateFormInfo } from "./ChatEventCreateForm";
import { useMediaQuery } from "react-responsive";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
export default function ChatMessageBox({
  toUserID,
  setOpenChatEvent,
  userRole,
  onConfirm,
}: {
  toUserID: string;
  setOpenChatEvent: () => void;
  userRole: "participant" | "host";
  onConfirm: (form: CreateFormInfo) => void;
}) {
  const [openCreate, setOpenCreate] = useState(false);
  const [message, setMessage] = useState("");
  const sendMessage = api.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
    },
  });

  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage.mutate({
          content: message,
          toUserID: toUserID,
        });
      }}
      className="bottom-0 z-10 mt-4 flex w-full flex-row items-center justify-center gap-2 bg-white px-6"
    >
      {isMobile ? (
        <Drawer open={openCreate} onOpenChange={setOpenCreate}>
          <DrawerTrigger>
            <button
              className={cn("h-fit w-fit", {
                hidden: !(userRole === "host"),
              })}
              type="button"
              onClick={setOpenChatEvent}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={cn(
                  "bg-primary-500 h-6 w-6 rounded-full p-2 text-white",
                )}
              />
            </button>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col items-center bg-white p-6">
            <ChatEventForm onConfirm={onConfirm} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger>
            <button
              className={cn("h-fit w-fit", {
                hidden: !(userRole === "host"),
              })}
              type="button"
              onClick={setOpenChatEvent}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={cn(
                  "bg-primary-500 h-6 w-6 rounded-full p-2 text-white",
                )}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center bg-white p-6">
            <ChatEventForm onConfirm={onConfirm} />
          </DialogContent>
        </Dialog>
      )}
      <input
        type="text"
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full flex-1 rounded-xl bg-neutral-50 px-4 py-2 text-black"
      />
      {message !== "" && (
        <button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white transition"
          disabled={sendMessage.isLoading}
        >
          {!sendMessage.isLoading ? (
            <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
          ) : (
            <LoadingSVG />
          )}
        </button>
      )}
    </form>
  );
}