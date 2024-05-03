import { X } from "lucide-react";
import Button from "./button";

export default function Popup({title, desc, onClose, onCancel, onConfirm}) {
    return (
        <>
        <div className="shadow-lg max-w-[500px] backdrop-blur-sm text-brown w-fit gap-4 self-center mx-auto inset-0 absolute border border-brown rounded-[16px] p-4 bg-bg md:p-8 flex flex-col justify-center">
            <div className="flex justify-between gap-4">
            <div className="flex flex-col">
            <h1>{title}</h1>
            <p className="text-brown/50">{desc}</p>
            </div>
            <X onClick={onClose} className="text-brown/50 hover:text-brown/100 transition-all duration-200 cursor-pointer"/>
            </div>
            <div className="flex gap-4 justify-center">
                <Button onClick={onCancel} cta="Cancel" width="w-full min-w-[200px]" bg="bg-beige" />
                <Button onClick={onConfirm} cta="Confirm" width="w-full min-w-[200px]" bg="bg-lightBrown" />
            </div>
        </div>
        </>
    )
}