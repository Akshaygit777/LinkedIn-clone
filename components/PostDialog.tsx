import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProfilePhoto from "./shared/ProfilePhoto"

export function PostDialog({setOpen, open ,src}:{setOpen:any , open:boolean, src:string}) {
  return (
    <Dialog open ={open}>
      <form>
        <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2">
                <ProfilePhoto
                src={src}/>
                <div>
                    <h1>Akshay</h1>
                    <p className="text-xs">Post to Anyone</p>
                </div>
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
         <form action="">
            <div className="flex flex-col">
                
            </div>
         </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}