import { Pause } from "lucide-react";

export default function Button({
  bg,
  icon,
  position,
  cta,
  type,
  onClick,
  width,
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${bg} flex ${
          position || "justify-center"
        } items-center text-brown border border-brown py-4 px-6 ${
          width || "w-full"
        } shadow-button hover:shadow-none duration-500 transition-all rounded-full`}
      >
        {cta}
        {icon}
      </button>
    </>
  );
}

export function SubtleButton({ cta, onClick, type }) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className="hover:underline text-brown transition-all duration-500"
      >
        {cta}
      </button>
    </>
  );
}

export function IconButton({ icon, onClick, type }) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className="p-2 border border-transparent transition-all duration-500 hover:border-brown rounded-sm hover:bg-beige"
      >
        {icon}
      </button>
    </>
  );
}

export function MenuIcon({ icon, activeAudio, audioId, type, show, form, display, color, onClick }) {
  return (
    <>
      <button
        form={form}
        type={type}
        onClick={onClick}
        className={`${display} ${show === false && "hidden"} ${color ? color : "bg-beige"} transition-all hover:shadow-none duration-500 w-fit rounded-full p-2 border border-brown text-brown shadow-button`}
      >
        {activeAudio ? (
          <Pause />
        ) : (
          icon
        )}
      </button>
    </>
  );
}
