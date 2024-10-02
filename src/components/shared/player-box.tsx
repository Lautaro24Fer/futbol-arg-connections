import { useState } from "react";
import useZStore from "./zustand";

interface PlayerBoxProps {
  id: number;
  name: string;
  img: string;
}

export const PlayerBox = ({ id, name, img, }: PlayerBoxProps) => {

  const currentClicked  = useZStore((state) => state.currentClicked);
  const addPlayer = useZStore((state) => state.addPlayer);
  const removePlayer  = useZStore((state) => state.removePlayer);

  const [isSelected, setIsSelected] = useState('')

  const handleClick = () => {
    if(isSelected){
     setIsSelected('');
     return removePlayer(id);
    }
    if(currentClicked.length < 4){
      setIsSelected('bg-gray-800');
      return addPlayer(id);
    }
  }

  return (
    <div className={`relative sm:h-[8rem] sm:w-full grid cursor-pointer
                    justify-center items-center rounded-md border border-slate-600 hover:border-slate-400 
                    shadow-sm shadow-slate-700 ${isSelected}`} onClick={handleClick}>
      <img src={img} alt={`${name}-image`} className="h-[6rem] object-contain" />
      <p className="absolute bottom-0 text-white bg-gray-900 px-2 text-center text-sm font-bold rounded-full mx-[50%] -translate-x-[50%] -mb-2">
        {name.split(' ').length > 1 ? name.split(' ')[1].toLocaleUpperCase() : name.toLocaleUpperCase()}
      </p>
    </div>
  )
}

