require "collision"

function love.load()
  math.randomseed(os.time())
  
  coins = {}
  
  score = 0
  
  sounds = {}
  sounds.coin = love.audio.newSource("assets/coin.ogg", "static")
  
  fonts = {}
  fonts.large = love.graphics.newFont("assets/gamer.ttf", 32)
  
  images = {}
  images.background = love.graphics.newImage("assets/ground.png")
  images.coin = love.graphics.newImage("assets/coin.png")

  images.player = {}
  images.player.down = love.graphics.newImage("assets/player_down.png")
  images.player.up = love.graphics.newImage("assets/player_up.png")
  images.player.left = love.graphics.newImage("assets/player_left.png")
  images.player.right = love.graphics.newImage("assets/player_right.png")
  
  player = {}
  player.x = 50
  player.y = 300
  player.w = images.player.down:getWidth()
  player.h = images.player.down:getHeight()
  player.direction = "down"
end

function love.update(dt)
  if love.keyboard.isDown("right") and player.x <= (love.graphics.getWidth() - player.w) then
    player.x = player.x + 250 * dt
    player.direction = "right"
  elseif love.keyboard.isDown("left") and player.x >= 0 then
    player.x = player.x - 250 * dt
    player.direction = "left"
  elseif love.keyboard.isDown("up") and player.y >= 0 then
    player.y = player.y - 250 * dt
    player.direction = "up"
  elseif love.keyboard.isDown("down") and player.y <= (love.graphics.getHeight() - player.h) then
    player.y = player.y + 250 * dt
    player.direction = "down"
  end
  
  for i = #coins, 1, -1 do
    local coin = coins[i]
    
    if AABB(player, coin) then
      table.remove(coins, i)
      score = score + 1
      sounds.coin:play()
    end
  end
  
  if math.random() < 0.01 then
    local coin = {}
    coin.w = images.coin:getWidth()
    coin.h = images.coin:getHeight()
    coin.x = math.random(0, love.graphics.getWidth() - coin.w)
    coin.y = math.random(0, love.graphics.getHeight() - coin.h)
    
    table.insert(coins, coin)
  end
end

function love.draw()
  for x = 0, love.graphics.getWidth(), images.background:getWidth() do
    for y = 0, love.graphics.getHeight(), images.background:getHeight() do
      love.graphics.draw(images.background, x, y)
    end
  end
  
  local playerImage = images.player.down
  
  if player.direction == "right" then
    playerImage = images.player.right
  elseif player.direction == "left" then
    playerImage = images.player.left
  elseif player.direction == "up" then
    playerImage = images.player.up
  end
  
  love.graphics.draw(playerImage, player.x, player.y)
  
  
  for i = 1, #coins, 1 do
    local coin = coins[i]
    
    love.graphics.draw(images.coin, coin.x, coin.y)
  end
  
  love.graphics.setFont(fonts.large)
  love.graphics.print("SCORE: " .. score, 10, 10)
end