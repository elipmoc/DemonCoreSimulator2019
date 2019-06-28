
export class Title extends g.Sprite {
    constructor(scene: g.Scene, src: g.ImageAsset) {
        super({
            scene,
            src,
            width: src.width,
            height: src.height,
            y: 0,
            x: g.game.width / 2 - src.width / 2,
            scaleX: 0.8,
            scaleY: 0.8
        });
    }
}