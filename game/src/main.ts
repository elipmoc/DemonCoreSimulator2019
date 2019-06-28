import { TitleScene } from "./scenes/TitleScene";

function main(param: g.GameMainParameterObject): void {
	g.game.pushScene(TitleScene());
}

export =main;