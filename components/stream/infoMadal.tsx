import React, { ElementRef, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthings";
import { updateStream } from "@/actions/stream";
import Hint from "../hint";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
  initialDescription: string | null;
}

const InfoModal: React.FC<InfoModalProps> = ({
  initialName,
  initialThumbnailUrl,
  initialDescription,
}) => {
  const [formData, setFormData] = useState({
    name: initialName,
    thumbnailUrl: initialThumbnailUrl,
    description: initialDescription,
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemoveThumbnail = () => {
    startTransition(() => {
      updateStream({ thumnailUrl: null })
        .then(() => {
          toast.success("Your Image profile has been removed");
          closeRef.current?.click();
          setFormData({ ...formData, thumbnailUrl: null });
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleSubmit = () => {
    const hasChanges = Object.entries(formData).some(
      ([key, value]) =>
        value !== initialName &&
        value !== initialDescription &&
        value !== initialThumbnailUrl
    );

    if (!hasChanges) {
      toast.error("No changes were made");
      setTimeout(() => closeRef.current?.click(), 2000);
      return;
    }

    startTransition(() => {
      updateStream(formData)
        .then(() => {
          toast.success("Your Profile updated successfully!");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex justify-center items-center w-fit p-3 h-fit rounded-md hover:bg-blue-600">
        <Pencil className="h-4 w-4 text-white" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Editing your stream Info</DialogTitle>
          <DialogDescription className="space-y-3">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputField
              label="Description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Stream Description"
            />
            <ThumbnailUpload
              thumbnailUrl={formData.thumbnailUrl}
              onRemove={handleRemoveThumbnail}
              onUpload={(url) =>
                setFormData({ ...formData, thumbnailUrl: url })
              }
              isPending={isPending}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <DialogClose asChild>
              <Button type="button" ref={closeRef} variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              variant="outline"
              className="bg-blue-600 text-muted hover:bg-teal-600"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}> = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    <Input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="font-semibold text-black"
    />
  </div>
);

const ThumbnailUpload: React.FC<{
  thumbnailUrl: string | null;
  onRemove: () => void;
  onUpload: (url: string) => void;
  isPending: boolean;
}> = ({ thumbnailUrl, onRemove, onUpload, isPending }) => (
  <>
    <Label>Thumbnail</Label>
    {thumbnailUrl ? (
      <div className="relative aspect-video rounded-xl overflow-hidden border border-white">
        <div className="absolute top-2 right-2 z-[10]">
          <Hint label="Remove thumbnail" asChild side="top" align="start">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={onRemove}
              className="h-auto w-auto p-1.5 hover:bg-rose-500 bg-slate-400"
            >
              <Trash className="h-4 w-4 text-black" />
            </Button>
          </Hint>
        </div>
        <Image
          src={thumbnailUrl}
          alt="thumbnail"
          fill
          className="object-cover"
        />
      </div>
    ) : (
      <div className="rounded-xl text-slate-800 outline-muted">
        <UploadDropzone
          endpoint="imageUploader"
          appearance={{
            label: { color: "#bbbb" },
            allowedContent: { color: "#FFFFFF" },
          }}
          onClientUploadComplete={(res) => {
            if (res?.[0]?.url) {
              onUpload(res[0].url);
            }
          }}
        />
      </div>
    )}
  </>
);

export default InfoModal;
