import { PlayScene } from "../scenes/PlayScene";

export class GoButton extends g.Sprite {
    constructor(scene: g.Scene, src: g.ImageAsset) {
        super({
            scene,
            src,
            width: src.width,
            height: src.height,
            y: 300,
            x: g.game.width / 2 - src.width / 2
        });

        this.touchable = true;
        this.pointDown.add(() => {
            g.game.replaceScene(PlayScene());
        })
    }
}