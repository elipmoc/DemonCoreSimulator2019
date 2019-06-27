import { PlayScene } from "./scenes/PlayScene";

function main(param: g.GameMainParameterObject): void {
	g.game.pushScene(PlayScene());
}

export =main;