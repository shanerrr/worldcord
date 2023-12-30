import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@worldcord/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function MapDialog({
  data,
  close,
}: {
  data: MapState;
  close: () => void;
}) {
  const router = useRouter();
  return (
    <Dialog open={data.open} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-4xl flex justify-center gap-2">
            {data.name}
            <Image
              src={`https://flagsapi.com/${data.iso_a2}/flat/64.png`}
              width={40}
              height={40}
              alt={data.name!}
            />
          </DialogTitle>
          <DialogDescription className="py-4 text-center">
            Are you sure you want to connect?
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={close}>
              Keep Exploring
            </Button>
            <Button onClick={() => router.push(`/servers/${data.iso_n3}`)}>
              Connect
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
