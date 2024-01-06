import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { MapState } from "@worldcord/types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@worldcord/components/ui/card";
import { useModal } from "@worldcord/hooks/use-modal";

export default function CountryRouteModal() {
  const { onClose, data } = useModal();
  const router = useRouter();

  return (
    <Card>
      <CardContent className="overflow-hidden focus-visible:outline-none p-0">
        <CardHeader>
          <CardTitle className="text-center text-4xl flex justify-center gap-2">
            {data.details?.countryName}
            <Image
              src={`https://flagsapi.com/${data.details?.iso_a2}/flat/64.png`}
              width={40}
              height={40}
              alt={data.details?.countryName!}
              priority={true}
            />
          </CardTitle>
          <CardDescription className="pt-4 text-center">
            Are you sure you want to connect to this country?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={onClose}>
            Keep Exploring
          </Button>
          <Button
            onClick={() => {
              router.push(`/servers/${data.details?.iso_n3}`);
              onClose();
            }}
          >
            Connect
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
