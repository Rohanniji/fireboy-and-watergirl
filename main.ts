scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.splash("Game Over")
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
})
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
scene.onOverlapTile(SpriteKind.Projectile, sprites.dungeon.hazardLava0, function (sprite, location) {
    WaterDeaths += 1
    sprites.destroy(Player_2, effects.spray, 500)
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 13))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jump < 2) {
        jump += 1
        Player_2.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`myTile0`, function (sprite, location) {
    game.splash("Game Over")
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
})
function doSomething (num: number) {
    Tilemaps = [tilemap`level 1`, tilemap`level3`, tilemap`level11`]
    tiles.setCurrentTilemap(Tilemaps._pickRandom())
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 13))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 13))
    if (num < 5) {
        while (FireDeaths < 2) {
            if (Player_1.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardWater)) {
                game.splash("You have one more chance")
                tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 13))
                tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 13))
            }
        }
        if (Player_1.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardWater)) {
            game.splash("Game Over")
            tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 13))
            tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 13))
        }
        if (true) {
            while (WaterDeaths < 2) {
                if (Player_2.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardLava0)) {
                    game.splash("You have one more chance")
                    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 13))
                    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 13))
                }
            }
            if (Player_2.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardLava0)) {
                game.splash("Game Over")
                tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 13))
                tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 13))
            }
        }
    } else {
        Player_1.ay = 225
        Player_2.ay = 225
    }
    if (Player_1.tileKindAt(TileDirection.Center, sprites.dungeon.chestClosed) && Player_2.tileKindAt(TileDirection.Center, sprites.dungeon.chestClosed)) {
        game.splash("You Win!")
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardWater, function (sprite, location) {
    FireDeaths += 1
    sprites.destroy(Player_1, effects.spray, 500)
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 13))
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (!(Player_2.isHittingTile(CollisionDirection.Top))) {
        jump = 0
    }
    if (Player_2.isHittingTile(CollisionDirection.Right) || Player_2.isHittingTile(CollisionDirection.Left)) {
        Player_2.vy = 0
    }
})
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
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Food)
Player_1 = sprites.create(assets.image`fire boy water girl`, SpriteKind.Player)
Player_2 = sprites.create(assets.image`fire boy water girl0`, SpriteKind.Projectile)
scaling.scaleByPercent(Player_2, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
scaling.scaleByPercent(Player_1, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
controller.player1.moveSprite(Player_1, 100, 0)
controller.player2.moveSprite(Player_2, 100, 0)
Player_1.ay = 300
Player_2.ay = 300
jump = 0
FireDeaths = 0
WaterDeaths = 0
doSomething(game.askForNumber("0-4 For extra life/5-9 For slower gravity", 1))
game.onUpdate(function () {
    mySprite.setPosition((Player_1.x + Player_2.x) / 2, (Player_1.y + Player_2.y) / 2)
    scene.cameraFollowSprite(mySprite)
})
