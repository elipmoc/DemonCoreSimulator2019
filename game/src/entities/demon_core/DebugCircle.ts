export class DebugCircle extends g.FilledRect {
    constructor(scene: g.Scene) {
        super({
            width: 8,
            height: 8,
            cssColor: "black",
            scene
        })
    }
}