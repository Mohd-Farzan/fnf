import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import axios from "axios";

function ProductImageUpload({ 
    imageFile,
    setImageFile,
    UploadedImageUrl,
    setUploadedImageUrl,
    ImageLoadingState,
    isEditMode,
    SetImageLoadingstate}) {
  const InputRef = useRef(null);
  console.log(isEditMode,"isEditMode")

  function handleImageFileChange(event) {
    // console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }
  function handleDragOver(event){
    event.preventDefault()
  }
  function handleDrop(event){
    event.preventDefault()
    const droppedFile=event.dataTransfer.files?.[0]
    if (droppedFile) setImageFile(droppedFile)
  }
function handleRemoveImage(){
    setImageFile(null)
    if(InputRef.current){
        InputRef.current.value = ''
    }
}
async function UploadImageToCloudinary() {
    SetImageLoadingstate(true)
    const data=new FormData();
    data.append('my_file',imageFile)
    const response = await axios.post('http://localhost:5000/api/admin/products/upload',data)
    
    console.log('response',response)
    if(response?.data?.success){
        setUploadedImageUrl(response.data.result.url);
        SetImageLoadingstate(false)
    }
}
useEffect(()=>{
    if(imageFile!==null) UploadImageToCloudinary()
},[imageFile])

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode? 'opacity-50':""}border-2 border-dashed p-2 rounded-lg`}>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={InputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? 'cursor-not-allowed ':"cursor-pointer"} flex flex-col items-center justify-center h-32`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to Upload Image</span>
          </Label>
        ) : (
          ImageLoadingState?
          <Skeleton className='h-10 bg-gray-500'/>:
          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8"/>
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                <XIcon className="w-4 h-4"/>
                <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
