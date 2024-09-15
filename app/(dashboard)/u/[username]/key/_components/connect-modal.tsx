"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { ElementRef, useRef, useState, useTransition } from "react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);
type IngressType = typeof RTMP | typeof WHIP;
function ConnectModal() {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [ingressType, setIngressTyep] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();
  const handleGenerate = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Connection generated");
          closeRef?.current?.click();
        })
        .catch((error) => {
          toast.error("Error generating connection", error);
        });
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Generate connection</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Generation connection </DialogTitle>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-red-600">Warning!</AlertTitle>
              <AlertDescription>
                This action will reset all active connections
              </AlertDescription>
            </Alert>
          </DialogHeader>
          <Select
            value={ingressType}
            disabled={isPending}
            onValueChange={(value) => setIngressTyep(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Ingress Type"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RTMP}>RTMP</SelectItem>
              <SelectItem value={WHIP}>WHIP</SelectItem>
            </SelectContent>
          </Select>
          <div className="items-center justify-between flex">
            <DialogClose ref={closeRef} asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            {isPending ? (
              <Button disabled>Generating...</Button>
            ) : (
              <Button onClick={handleGenerate}>Generate</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConnectModal;
