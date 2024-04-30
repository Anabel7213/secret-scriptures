export default function InputField({required, placeholder, type, onChange, name}) {
    return (
        <>
        <input required={required} autoComplete="off" onChange={onChange} name={name} type={type} placeholder={placeholder} className="py-3 px-4 border border-brown/50 placeholder:text-brown/50 focus:placeholder:text-brown/70 focus:border-brown/100 rounded-full bg-transparent w-full outline-none md:min-w-[300px]" />
        </>
    )
}