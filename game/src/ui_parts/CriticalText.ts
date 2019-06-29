
export class CriticalText extends g.Label {
    constructor(scene: g.Scene) {
        const font = new g.DynamicFont({
            game: g.game,
            fontFamily: g.FontFamily.SansSerif,
            size: 32
        });
        super({
            scene,
            font,
            text: "臨界まで：",
            fontSize: 32,
            x: g.game.width - 300,
            textColor: "black"
        });
    }

    SetValue(v: number) {
        this.text = "臨界まで：" + Math.min(Math.round(v * 10) / 10, 100);
        this.invalidate();
    }
}