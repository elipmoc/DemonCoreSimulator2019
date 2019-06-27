
export function Player(scene: g.Scene) {
    // プレイヤーを生成します
    const player = new g.Sprite({
        scene: scene,
        src: scene.assets["player"],
        width: (scene.assets["player"] as g.ImageAsset).width,
        height: (scene.assets["player"] as g.ImageAsset).height
    });

    // プレイヤーの初期座標を、画面の中心に設定します
    player.x = (g.game.width - player.width) / 2;
    player.y = (g.game.height - player.height) / 2;
    player.update.add(() => {
        // 毎フレームでY座標を再計算し、プレイヤーの飛んでいる動きを表現します
        // ここではMath.sinを利用して、時間経過によって増加するg.game.ageと組み合わせて
        player.y = (g.game.height - player.height) / 2 + Math.sin(g.game.age % (g.game.fps * 10) / 4) * 10;

        // プレイヤーの座標に変更があった場合、 modified() を実行して変更をゲームに通知します
        player.modified();
    });
    return player;
}