import * as b2 from "@akashic-extension/akashic-box2d";
import { CreateParameter } from "../CreateParameter";

export class Floor extends g.FilledRect {
    constructor({ scene, box2d }: CreateParameter) {
        super({
            scene,
            cssColor: "black",
            width: g.game.width,
            height: 50,
            y: g.game.height - 50
        });

        const fixtureDef = box2d.createFixtureDef({
            density: 1.0,
            friction: 0.5,
            restitution: 0.3,
            shape: box2d.createRectShape(this.width, this.height)
        });

        const bodyDef = box2d.createBodyDef({
            type: b2.BodyType.Static
        });

        box2d.createBody(this, bodyDef, fixtureDef);
    }
}