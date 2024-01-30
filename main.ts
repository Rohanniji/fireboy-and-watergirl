scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (!(Player_1.isHittingTile(CollisionDirection.Top))) {
        jump = 0
    }
    if (Player_1.isHittingTile(CollisionDirection.Right) || Player_1.isHittingTile(CollisionDirection.Left)) {
        Player_1.vy = 0
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jump < 2) {
        jump += 1
        Player_1.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.field0, function (sprite, location) {
    game.splash("Game Over")
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
})
function TilemapSetUp (num: number) {
    if (num < 5) {
        mySprite = 1
        Player_1.ay = 300
        Player_2.ay = 300
        Tilemaps = [tilemap`level 1`, tilemap`level3`, tilemap`level11`]
        tiles.setCurrentTilemap(Tilemaps._pickRandom())
        tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
        tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
    } else {
        mySprite = 2
        Player_1.ay = 200
        Player_2.ay = 200
        Tilemaps = [tilemap`level 1`, tilemap`level3`, tilemap`level11`]
        tiles.setCurrentTilemap(Tilemaps._pickRandom())
        tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
        tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
    }
    if (Player_1.tileKindAt(TileDirection.Center, assets.tile`myTile1`) && Player_2.tileKindAt(TileDirection.Center, assets.tile`myTile0`)) {
        game.gameOver(true)
    }
}
scene.onOverlapTile(SpriteKind.Projectile, sprites.dungeon.hazardLava0, function (sprite, location) {
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
    WaterDeaths += 1
    if (WaterDeaths >= 2 && game.runtime() - lastTimestamp >= 500) {
        game.gameOver(false)
    } else {
        game.splash("You have one more chance")
    }
    lastTimestamp = game.runtime()
})
scene.onOverlapTile(SpriteKind.Projectile, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile`)
    info.changeScoreBy(1)
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
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
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardWater, function (sprite, location) {
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
    FireDeaths += 1
    if (FireDeaths >= 2 && game.runtime() - lastTimestamp >= 500) {
        game.gameOver(false)
    } else {
        game.splash("You have one more chance")
    }
    lastTimestamp = game.runtime()
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (!(Player_2.isHittingTile(CollisionDirection.Top))) {
        jump = 0
    }
    if (Player_2.isHittingTile(CollisionDirection.Right) || Player_2.isHittingTile(CollisionDirection.Left)) {
        Player_2.vy = 0
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile`)
    info.changeScoreBy(1)
})
let Tilemaps: tiles.TileMapData[] = []
let mySprite = 0
let lastTimestamp = 0
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
controller.player1.moveSprite(Player_1, 100, 0)
controller.player2.moveSprite(Player_2, 100, 0)
Player_1.setScale(0.25, ScaleAnchor.Middle)
scaling.scaleByPercent(Player_2, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
TilemapSetUp(game.askForNumber("You get 2 lives each character! Press 5-9 for extra help", 1))
info.setScore(0)
jump = 0
FireDeaths = 0
WaterDeaths = 0
lastTimestamp = game.runtime()
