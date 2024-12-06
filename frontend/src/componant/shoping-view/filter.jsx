import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { filterOptions } from "@/config"
import { LogOut } from "lucide-react"
import { Fragment } from "react"

function ProductFilter({filters,handleFilter}) {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className="p-4 border-b">
            <h2 className='text-lg font-extrabold'>Filters</h2>
        </div>
        <div className="p-4 space-y-">
            {
                Object.keys(filterOptions).map(keyItems=>
                    <Fragment>
                        <div>
                            <h3 className=" text-base font-bold">{keyItems}</h3>
                            <div className="grid gap-2 mt-2">
                                {
                                    filterOptions[keyItems].map((options=><Label className='flex gap-2 items-center font-medium '>
                                        
                                            <Checkbox 
                                            checked={
                                                filters && Object.keys(filters).length > 0 && 
                                                filters[keyItems] && filters[keyItems].indexOf(options.id) >-1
                                            }
                                            onCheckedChange={()=>handleFilter(keyItems,options.id)}/>
                                            {options.label}
                                            
                                        
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <Separator/>
                    </Fragment>
                )
            }
        </div>
    </div>
  )
}

export default ProductFilter