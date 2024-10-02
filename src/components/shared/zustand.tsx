import { create } from "zustand";
import { IPlayer } from "../entities/PlayerModel";
import { mockData } from "../../mocks/data-mocked";

type Action = {
	addPlayer: (id: number) => void;
	removePlayer: (id: number) => void;
	randomSortPlayers: () => void;
	sortResolvedPlayers: () => void;
	deleteResolvedPlayers: () => void;
}

type Properties = {
	allPlayers: IPlayer[], 
	currentClicked: IPlayer[], 
	unsresolvedPlayers: IPlayer[], 
	resolvedPlayers: IPlayer[]
}

const useZStore = create<Properties & Action>((set) => ({
  allPlayers: mockData as IPlayer[], // eliminable
	unsresolvedPlayers: mockData as IPlayer[],
	resolvedPlayers: [] as IPlayer[],
  currentClicked: [] as IPlayer[],
	addPlayer(id: number) {
		set((state) => {
			if(state.currentClicked.length < 4) {
				const player = state.allPlayers.find((m) => +m.id === id);
				if(player && !state.currentClicked.some((m) => m.id === id) ) {
					return { currentClicked: [ ...state.currentClicked, player ] }; // Se debe retornar un nuevo estado, no mutar el estado actual
				}
			}
			return state;
		})
	},
	removePlayer(id: number) {
		set((state) => {
			return { currentClicked: state.currentClicked.filter((m) => +m.id !== id) } 
		})
	},
	randomSortPlayers() {
		set((state) => {
			const sortedPlayers: IPlayer[] = [...state.allPlayers].sort(() => (Math.random() - 0.5));
			return { allPlayers: sortedPlayers };
		})
	},
	sortResolvedPlayers() {

		// Hace la transaccion de elementos de no-resueltos a resueltos
		set((state) => {
			
			const playersSorted = [...state.unsresolvedPlayers]

			// Recorremos el array de jugadores actualmente seleccionados
			state.currentClicked.forEach((playerSelected: IPlayer, index: number) => {
				// Para el jugador de la iteración actual, encontramos su posición en el array de la grilla
				const playerIndex: number = playersSorted.findIndex(u => +u.id === playerSelected.id);

				// Si (array de no seleccionados en posicion 0, 1, 2, 3) no coincide con el array actual de seleccionados
				// Cambiar las posiciones
				if(playersSorted[index].id !== playersSorted[playerIndex].id) {
					const aux: IPlayer = { ...state.unsresolvedPlayers[index] };
					playersSorted[index] = { ...playersSorted[playerIndex] };
					playersSorted[playerIndex] = { ...aux }
				}
			});

			return { resolvedPlayers: playersSorted }
		})
	},

	// Debe ejecutarse despues de sortResolvedPlayers para no eliminar elementos no resueltos
	deleteResolvedPlayers() {
		set((state) => {
			// Elimina los primeros 4 elementos del array, suponiendo que estos están resueltos
			const restantUnresolvedPlayers = [...state.unsresolvedPlayers].filter((_, index) => index > 3);
			return { unsresolvedPlayers: restantUnresolvedPlayers };
		})
	}
	
}));

export default useZStore
