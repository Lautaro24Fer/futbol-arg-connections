import { PlayerBox } from "./player-box";
import { motion } from "framer-motion"
import useZStore from "./zustand";

export default function Board() {

	const allPlayers= useZStore((state) => state.allPlayers);
	const sortData = useZStore((state) => state.randomSortPlayers);

	return (
		<>
		<section className="w-full h-max grid grid-cols-4 grid-rows-5 gap-6">
			{
				allPlayers.map((data) => {
					return (<motion.div key={data.id} layout transition={{ duration: 0.3 }}>
						<PlayerBox 
							id={data.id}
							name={data.playerName}
							img={data.src} 
						/>
					</motion.div>)
				})
			}
		</section>
		<button className="text-white font-bold px-4 py-2 rounded-lg bg-red-800 absolute top-0 left-0 m-[3rem]" onClick={sortData}>Sort</button>
		</>
	)
}
