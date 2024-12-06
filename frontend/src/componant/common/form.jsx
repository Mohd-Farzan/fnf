import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select,SelectContent,SelectItem,SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

function Commonform({ formControls, formData, setFormData, onSubmit, buttonText }) {
    const renderInputByComponentType = (controlItem) => {
        const value = formData[controlItem.name] || '';

        switch (controlItem.componentType) {
            case 'input':
                return (
                    <Input
                        className='text-black'
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [controlItem.name]: e.target.value
                        })}
                    />
                );

            case 'select':
                return (
                    <Select
                        onValueChange={(value) => setFormData({
                            ...formData,
                            [controlItem.name]: value
                        })}
                        value={value}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={controlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {controlItem.options && controlItem.options.length>0
                            ?controlItem.options.map(optionItem => (
                                <SelectItem key={optionItem.id} value={optionItem.id}>
                                    {optionItem.label}
                                </SelectItem>
                            )):null}
                        </SelectContent>
                    </Select>
                );

            case 'textarea':
                return (
                    <Textarea
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.id}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [controlItem.name]: e.target.value
                        })}
                    />
                );

            default:
                return (
                    <Input
                        className='text-black'
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [controlItem.name]: e.target.value
                        })}
                    />
                );
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div className="grid w-full gap-1.5 text-slate-100 " key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {renderInputByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <button type="submit" className="mt-2 w-full bg-green-500 hover:bg-green-800">
                {buttonText || 'Submit'}
            </button>
        </form>
    );
}

export default Commonform;
