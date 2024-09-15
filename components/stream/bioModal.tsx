import { updateUserBio } from "@/actions/user";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useState, useTransition, useRef, ElementRef } from "react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
export const BioModal = ({ intialValue }: { intialValue: string | null }) => {
  const [newValue, setNewValue] = useState(intialValue ?? "");
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);
  const onValueChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 200) {
      toast.error("The bio length must under 200 character!");
      return;
    } else {
      setNewValue(e.currentTarget.value);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => {
      updateUserBio({
        bio: newValue,
      }).then(() => {
        toast.success("Update successfully");
        closeRef.current?.click();
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex justify-center bg-slate-500 items-center w-fit p-3 -mr-2  h-fit rounded-md hover:bg-blue-600">
          <Pencil className="h-4 w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Bio" className=" col-span-4 text-left">
                Bio
              </Label>
              <Textarea
                onChange={onValueChange}
                id="Bio"
                disabled={isPending}
                value={newValue}
                placeholder="Tell us about yourself"
                className=" col-span-4 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button ref={closeRef} type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            {isPending ? (
              <Button type="submit" disabled={isPending}>
                Saving...
              </Button>
            ) : (
              <Button type="submit">Save changes</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
