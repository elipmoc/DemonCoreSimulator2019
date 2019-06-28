import { PlayScene } from "./scenes/PlayScene";
import { EndScene } from "./scenes/EndScene";

function main(param: g.GameMainParameterObject): void {
	g.game.pushScene(EndScene());
}

export =main;