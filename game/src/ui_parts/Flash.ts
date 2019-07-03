
//チェレンコフ光
export class Flash extends g.Sprite {
    constructor(scene: g.Scene, src: g.ImageAsset) {
        super({
            scene,
            src,
            width: src.width,
            height: src.height,
        });
    }

    SetLevel(level: number) {
        this.opacity = level;
        this.modified();
    }
}