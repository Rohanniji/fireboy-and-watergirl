controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jump < 2) {
        jump += 1
        Player_1.vy = -150
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (!(Player_1.isHittingTile(CollisionDirection.Top))) {
        jump = 0
    }
    if (Player_1.isHittingTile(CollisionDirection.Right) || Player_1.isHittingTile(CollisionDirection.Left)) {
        Player_1.vy = 0
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.field0, function (sprite, location) {
    game.splash("Game Over")
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
})
scene.onOverlapTile(SpriteKind.Projectile, sprites.dungeon.hazardLava0, function (sprite, location) {
    while (WaterDeaths < 2) {
        WaterDeaths += 1
        sprites.destroy(Player_2, effects.spray, 500)
        game.splash("You have one more chance")
        tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 13))
        tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 13))
    }
    game.splash("Game Over")
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jump < 2) {
        jump += 1
        Player_2.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Projectile, sprites.builtin.field0, function (sprite, location) {
    game.splash("Game Over")
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
})
function doSomething (num: number) {
    if (num < 5) {
        Player_1.ay = 300
        Player_2.ay = 300
        Tilemaps = [tilemap`level 1`, tilemap`level3`, tilemap`level11`]
        tiles.setCurrentTilemap(Tilemaps._pickRandom())
        tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
        tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
    } else {
        Player_1.ay = 225
        Player_2.ay = 225
        Tilemaps = [tilemap`level 1`, tilemap`level3`, tilemap`level11`]
        tiles.setCurrentTilemap(Tilemaps._pickRandom())
        tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
        tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
    }
    if (Player_1.tileKindAt(TileDirection.Center, sprites.dungeon.chestClosed) && Player_2.tileKindAt(TileDirection.Center, sprites.dungeon.chestClosed)) {
        game.splash("You Win!")
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardWater, function (sprite, location) {
    FireDeaths += 1
    while (FireDeaths < 2) {
        sprites.destroy(Player_1, effects.spray, 500)
        game.splash("You have one more chance")
        doSomething2()
    }
    game.splash("Game Over")
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (!(Player_2.isHittingTile(CollisionDirection.Top))) {
        jump = 0
    }
    if (Player_2.isHittingTile(CollisionDirection.Right) || Player_2.isHittingTile(CollisionDirection.Left)) {
        Player_2.vy = 0
    }
})
function doSomething2 () {
    Player_1 = sprites.create(assets.image`fire boy water girl`, SpriteKind.Player)
    Player_2 = sprites.create(assets.image`fire boy water girl0`, SpriteKind.Projectile)
    scaling.scaleByPercent(Player_2, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    scaling.scaleByPercent(Player_1, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    controller.player1.moveSprite(Player_1, 100, 0)
    controller.player2.moveSprite(Player_2, 100, 0)
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
}
let Tilemaps: tiles.TileMapData[] = []
let WaterDeaths = 0
let FireDeaths = 0
let jump = 0
let Player_2: Sprite = null
let Player_1: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 255
    export const ARCADE_SCREEN_HEIGHT = 255
}
Player_1 = sprites.create(assets.image`fire boy water girl`, SpriteKind.Player)
Player_2 = sprites.create(assets.image`fire boy water girl0`, SpriteKind.Projectile)
scaling.scaleByPercent(Player_2, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
scaling.scaleByPercent(Player_1, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
controller.player1.moveSprite(Player_1, 100, 0)
controller.player2.moveSprite(Player_2, 100, 0)
doSomething(game.askForNumber("You get 2 lives each character! Press 5-9 for extra help", 1))
jump = 0
FireDeaths = 0
WaterDeaths = 0
