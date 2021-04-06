function love.load()
  arena = {}
  arena.width = love.graphics.getWidth()
  arena.height = love.graphics.getHeight()
  
  ship = {}
  ship.x = arena.width / 2
  ship.y = arena.height / 2
  ship.angle = 0
  ship.speedX = 0
  ship.speedY = 0
  ship.radius = 30
  
  bullets = {}
  bulletTimerLimit = 0.5
  bulletTimer = bulletTimerLimit
  bulletRadius = 5
  
  asteroids = {
    {
      x = 100,
      y = 100
    },
    {
      x = arena.width - 100,
      y = 100
    },
    {
      x = arena.width / 2,
      y = arena.height - 100
    }
  }
  
  asteroidStages = {
    {
      speed = 120,
      radius = 15
    },
    {
      speed = 70,
      radius = 30
    },
    {
      speed = 50,
      radius = 50
    },
    {
      speed = 20,
      radius = 80
    }
  }
  
  for asteroidIndex, asteroid in ipairs(asteroids) do
    asteroid.angle = love.math.random() * (2 * math.pi)
    asteroid.stage = #asteroidStages
  end
end

function love.update(dt)
  local turnSpeed = 10
  
  -- Turning the ship clockwise
  if love.keyboard.isDown('right') or love.keyboard.isDown('d') then
    ship.angle = ship.angle + turnSpeed * dt
  end
  
  -- Turning the ship counterclockwise
  if love.keyboard.isDown('left') or love.keyboard.isDown('a') then
    ship.angle = ship.angle - turnSpeed * dt
  end
  
  -- Wrapping the ship angle
  -- Prevents the angle to go beyond the ship π or lower than 0.
  ship.angle = ship.angle % (2 * math.pi)
  
  -- Ship acceleration
  if love.keyboard.isDown('up') or love.keyboard.isDown('w') then
    local shipSpeed = 100
    
    ship.speedX = ship.speedX + math.cos(ship.angle) * shipSpeed * dt
    ship.speedY = ship.speedY + math.sin(ship.angle) * shipSpeed * dt
  end
  
  -- Wrapping the ship position
  -- Prevents the ship to be lost to the void.
  ship.x = (ship.x + ship.speedX * dt) % arena.width
  ship.y = (ship.y + ship.speedY * dt) % arena.height
  
  -- Asteroids colliding with ship
  local function areCirclesIntersecting(c1X, c1Y, c1Radius, c2X, c2Y, c2Radius)
    return (c1X - c2X)^2 + (c1Y - c2Y)^2 <= (c1Radius + c2Radius)^2
  end
  
  -- Moving bullets
  for bulletIndex = #bullets, 1, -1 do
    local bullet = bullets[bulletIndex]
    
    bullet.timeLeft = bullet.timeLeft - dt
    
    if bullet.timeLeft <= 0 then
      table.remove(bullets, bulletIndex)
    else
      local bulletSpeed = 500
      bullet.x = (bullet.x + math.cos(bullet.angle) * bulletSpeed * dt) % arena.width
      bullet.y = (bullet.y + math.sin(bullet.angle) * bulletSpeed * dt) % arena.height
    end
    
    -- Bullets colliding with asteroids
    for asteroidIndex = #asteroids, 1, -1 do
      local asteroid = asteroids[asteroidIndex]
      
      if areCirclesIntersecting(bullet.x, bullet.y, bulletRadius, asteroid.x, asteroid.y, asteroidStages[asteroid.stage].radius) then
        table.remove(bullets, bulletIndex)
        
        if asteroid.stage > 1 then
          -- Breaking asteroids
          local angle1 = love.math.random() * (2 * math.pi)
          local angle2 = love.math.random() % (2 * math.pi)
          
          table.insert(asteroids, {
            x = asteroid.x,
            y = asteroid.y,
            angle = angle1,
            stage = asteroid.stage - 1
          })
          
          table.insert(asteroids, {
            x = asteroid.x,
            y = asteroid.y,
            angle = angle2,
            stage = asteroid.stage - 1
          })
        end
        
        table.remove(asteroids, asteroidIndex)
        break
      end
    end
  end
  
  -- Adding bullets at the current x, y, and angle of the aim.
  bulletTimer = bulletTimer + dt
  
  if love.keyboard.isDown('s') or love.keyboard.isDown('down') then
    if bulletTimer >= bulletTimerLimit then
      bulletTimer = 0
      
      table.insert(bullets, {
        x = ship.x + math.cos(ship.angle) * ship.radius,
        y = ship.y + math.sin(ship.angle) * ship.radius,
        angle = ship.angle,
        timeLeft = 4
      })
    end
  end
  
  -- Moving asteroids
  for asteroidsIndex, asteroid in ipairs(asteroids) do
    asteroid.x = (asteroid.x + math.cos(asteroid.angle) * asteroidStages[asteroid.stage].speed * dt) % arena.width
    asteroid.y = (asteroid.y + math.sin(asteroid.angle) * asteroidStages[asteroid.stage].speed * dt) % arena.height
  end
  
  for asteroidIndex, asteroid in ipairs(asteroids) do
    local asteroidSpeed = 20
    asteroid.x = (asteroid.x + math.cos(asteroid.angle) * asteroidSpeed * dt) % arena.width
    asteroid.y = (asteroid.y + math.sin(asteroid.angle) * asteroidSpeed * dt) % arena.height
    
    if areCirclesIntersecting(ship.x, ship.y, ship.radius, asteroid.x, asteroid.y, asteroidStages[asteroid.stage].radius) then
      love.load()
      break
    end
  end
  
  if #asteroids == 0 then
    love.load()
  end
end

function love.draw()
  -- Using for to draw partially off-screen objects
  for y = -1, 1 do
    for x = -1, 1 do
      love.graphics.origin()
      love.graphics.translate(x * arena.width, y * arena.height)
      
      -- Drawing the ship.
      love.graphics.setColor(255, 255, 255)
      love.graphics.circle('fill', ship.x, ship.y, ship.radius)
      
      -- Drawing the ship aim
      local shipCircleDistance = 20
      love.graphics.setColor(0, 0, 0)
      love.graphics.circle('fill',
        ship.x + math.cos(ship.angle) * shipCircleDistance,
        ship.y + math.sin(ship.angle) * shipCircleDistance,
        5)
      
      -- Drawing bullets
      for bulletIndex, bullet in ipairs(bullets) do
        love.graphics.setColor(255, 255, 0)
        love.graphics.circle('fill', bullet.x, bullet.y, bulletRadius)
      end
      
      -- Drawing asteroids
      for asteroidIndex, asteroid in ipairs(asteroids) do
        love.graphics.setColor(255, 255, 255)
        love.graphics.circle('line', asteroid.x, asteroid.y, asteroidStages[asteroid.stage].radius)
      end
    end
  end

  -- Temporary
  love.graphics.origin()
  love.graphics.setColor(255, 255, 255)
  love.graphics.print(table.concat({
    'ship.angle: '..ship.angle,
    'ship.x: '..ship.x,
    'ship.y: '..ship.y,
    'ship.speedX: '..ship.speedX,
    'ship.speedY: '..ship.speedY
  }, '\n'))
end