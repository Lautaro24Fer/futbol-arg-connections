export interface IPlayer {
	id: number;
	playerName: string;
	category: string;
	src: string;
}

export interface IPlayerSelectedState {
	players: IPlayer[];
	status: SelectedStatus;
}

type SelectedStatus = 'none' | 'three' | 'all';