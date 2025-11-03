import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ProfilePhoto from "./shared/ProfilePhoto"
import { Textarea } from "./ui/textarea"
import { Images } from "lucide-react"
import { useRef, useState } from "react"
import { readFileAsDataUrl } from "@/lib/utils"
import Image from "next/image"
import { createPostAction } from "@/lib/serveractions"

export function PostDialog({ setOpen, open, src }: { setOpen: any; open: boolean; src: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const changeHandler = (e:any) => {
    setInputText(e.target.value);
  }
const fileChangeHandler = async  (e:React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if(file){
    const dataUrl =  await readFileAsDataUrl(file);
    setSelectedFile(dataUrl);
  }
}

const postActionHandler = async (formData:FormData)=> {
  const inputText = formData.get('inputText') as string;
  try{
 await createPostAction(inputText,selectedFile);
  }catch(error){
    console.log('error occurred', error);
  }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-[#161722] border border-gray-800" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <ProfilePhoto src={src} />
            <div className="text-white">
              <h1 className="font-bold">Akshay</h1>
              <p className="text-xs mt-1 text-gray-300">Post to Anyone</p>
            </div>
            
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 bg-[#161722]" action={postActionHandler}>
          <div className="flex flex-col">
            <Textarea
   
              id="name"
              name="inputText"
              value={inputText}
              onChange={changeHandler}
              className="border-none text-lg focus-visible:ring-0 text-white"
              placeholder="What's on your mind?"
            />
            <div className="my-4"></div>
            {
            selectedFile && (
              <Image
              src = {selectedFile}
              alt="preview-image"
              width={400}
              height={300}
              />
            )
            }
            
     
          </div>

          <DialogFooter>
            <div className="flex items-center gap-4">
              <input ref ={inputRef} onChange={fileChangeHandler}   type="file" name="image" className="hidden" accept="image/*" />
            
            </div>
          
          </DialogFooter>
          <div className="flex justify-between ">
       
       <Button  className="gap-2 "onClick={()=>inputRef?.current?.click()}>
         <Images className="text-blue-500"/>
         
       </Button>
       <Button className="bg-black text-white hover:bg-gray-600" variant="outline" type="submit">
               Post
             </Button>
       </div>
        </form>
      
       
      </DialogContent>
    </Dialog>
  )
}
