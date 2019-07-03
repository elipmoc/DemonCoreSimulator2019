import * as b2 from "@akashic-extension/akashic-box2d";
import { CreateParameter } from "../../CreateParameter";
import { DebugCircle } from "./DebugCircle";

const Vec2 = b2.Box2DWeb.Common.Math.b2Vec2;
type Vec2 = b2.Box2DWeb.Common.Math.b2Vec2;

export class DemonCore extends g.Sprite {
    private b2body: b2.Box2DWeb.Dynamics.b2Body;

    constructor(
        { scene, box2d }: CreateParameter,
        src: g.ImageAsset,
        { scaleX, scaleY, y }: { scaleX: number, scaleY: number, y: number }) {
        super({
            scene,
            src,
            width: src.width,
            height: src.height,
            scaleX,
            scaleY,
        });
        this.x = g.game.width / 2 - this.width / 2;
        this.y = y;

        const fixturedef = box2d.createFixtureDef({
            density: 1.0, // 密度
            friction: 0.5, // 摩擦係数
            restitution: 0.3, // 反発係数
            shape: box2d.createPolygonShape(this.CreatePolygonShape())
        })
        const bodydef = box2d.createBodyDef({ type: b2.BodyType.Dynamic });
        this.b2body = box2d.createBody(this, bodydef, fixturedef).b2body;

        // const debugCircle = new DebugCircle(scene);
        //this.scene.append(debugCircle);

        this.update.add(() => {
            /*  debugCircle.x = this.CenterX;
              debugCircle.y = this.CenterY;
              debugCircle.modified();*/
            if (this.y > g.game.height + 50) {
                this.b2body.SetPosition(new b2.Box2DWeb.Common.Math.b2Vec2((g.game.width / 2 - this.width / 2) / 50, -100 / 50));
                this.b2body.SetType(b2.BodyType.Dynamic);
            }
        })
    }

    get CenterX() {
        return this.b2body.GetPosition().x * 50 + Math.sin(Math.PI * this.angle / 180) * this.scaleY * this.height / 2;
    }

    get CenterY() {
        return this.b2body.GetPosition().y * 50 - Math.cos(Math.PI * this.angle / 180) * this.scaleY * this.height / 2;
    }

    private CreatePolygonShape() {
        const vecs = new Array<Vec2>();
        const radius = this.height * this.scaleY / 50;

        for (let i = 18; i >= 0; i--) {
            vecs.push(new Vec2(-radius * Math.cos(i * 10 * Math.PI / 180), radius * Math.sin(i * 10 * Math.PI / 180) - this.height * this.scaleY / 50 / 2));
        }
        return vecs;
    }
}