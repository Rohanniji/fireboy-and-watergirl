function PowerUp (num: number) {
    game.splash(game.askForNumber("0-4 For extra life/5-9 For slower gravity", num))
    if (num < 5) {
    	
    } else {
        Player_1.setVelocity(0, 150)
        Player_2.setVelocity(0, 150)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardWater, function (sprite, location) {
    sprites.destroy(Player_1)
    game.setGameOverEffect(true, effects.confetti)
})
scene.onOverlapTile(SpriteKind.Projectile, sprites.dungeon.hazardLava1, function (sprite, location) {
    sprites.destroy(Player_2)
    game.setGameOverEffect(true, effects.confetti)
    tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
    tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
})
let Player_2: Sprite = null
let Player_1: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 255
    export const ARCADE_SCREEN_HEIGHT = 255
}
PowerUp(1)
let Tilemaps = [tilemap`level 1`, tilemap`level3`, tilemap`level12`]
tiles.setCurrentTilemap(Tilemaps._pickRandom())
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
pause(100)
Player_1 = sprites.create(assets.image`fire boy water girl`, SpriteKind.Player)
scaling.scaleByPercent(Player_1, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
Player_2 = sprites.create(assets.image`fire boy water girl0`, SpriteKind.Projectile)
scaling.scaleByPercent(Player_2, -75, ScaleDirection.Uniformly, ScaleAnchor.Middle)
controller.player1.moveSprite(Player_1)
controller.player2.moveSprite(Player_2)
tiles.placeOnTile(Player_1, tiles.getTileLocation(15, 14))
tiles.placeOnTile(Player_2, tiles.getTileLocation(14, 14))
Player_1.setVelocity(0, 250)
Player_2.setVelocity(0, 250)
game.onUpdate(function () {
    mySprite.setPosition((Player_1.x + Player_2.x) / 2, (Player_1.y + Player_2.y) / 2)
})
