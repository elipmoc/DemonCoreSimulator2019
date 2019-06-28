const TEXT = "ver 1.0";

export class VersionText extends g.Label {
    constructor(scene: g.Scene) {
        const font = new g.DynamicFont({
            game: g.game,
            fontFamily: g.FontFamily.SansSerif,
            size: 32
        });
        super({
            scene,
            font,
            text: TEXT,
            fontSize: 32,
            textColor: "black"
        });
    }
}