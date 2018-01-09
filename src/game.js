const canvas = document.getElementById('stage')
, stage = canvas.getContext('2d')
, stageW = 600
, stageH = 420
, c = {
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
    WHITE: 'white',
    BLACK: 'black'
}
, buttons = {
    P1_LEFT: 0,
    P1_RIGHT: 0,
    P1_UP: 0,
    P1_DOWN: 0,
    P1_FIRE: 0,
    P2_LEFT: 0,
    P2_RIGHT: 0,
    P2_UP: 0,
    P2_DOWN: 0,
    P2_FIRE: 0
}
, playerStates = {
    STANDING: 0,
    JUMPING: 1
}

canvas.width = stageW
canvas.height = stageH

// Events

document.addEventListener('keydown', ev => {
    // Player 1
    if (ev.key === 'a') {
        if (!buttons.Left) buttons.P1_LEFT = 1
    } else if (ev.key === 'd') {
        if (!buttons.Right) buttons.P1_RIGHT = 1
    } else if (ev.key === 's') {
        if (!buttons.Down) buttons.P1_DOWN = 1
    } else if (ev.key === 'w') {
        if (!buttons.Up) buttons.P1_UP = 1
    } else if (ev.key === 'f') {
        if (!buttons.Jump) buttons.P1_FIRE = 1
    }
    // Player 2
    if (ev.key === 'j') {
        if (!buttons.Left) buttons.P2_LEFT = 1
    } else if (ev.key === 'l') {
        if (!buttons.Right) buttons.P2_RIGHT = 1
    } else if (ev.key === 'k') {
        if (!buttons.Down) buttons.P2_DOWN = 1
    } else if (ev.key === 'i') {
        if (!buttons.Up) buttons.P2_UP = 1
    } else if (ev.key === 'h') {
        if (!buttons.Jump) buttons.P2_FIRE = 1
    }
})

document.addEventListener('keyup', ev => {
    // Player 1
    if (ev.key === 'a') {
        if (!buttons.Left) buttons.P1_LEFT = 0
    } else if (ev.key === 'd') {
        if (!buttons.Right) buttons.P1_RIGHT = 0
    } else if (ev.key === 's') {
        if (!buttons.Down) buttons.P1_DOWN = 0
    } else if (ev.key === 'w') {
        if (!buttons.Up) buttons.P1_UP = 0
    } else if (ev.key === 'f') {
        if (!buttons.Jump) buttons.P1_FIRE = 0
    }
    // Player 2
    if (ev.key === 'j') {
        if (!buttons.Left) buttons.P2_LEFT = 0
    } else if (ev.key === 'l') {
        if (!buttons.Right) buttons.P2_RIGHT = 0
    } else if (ev.key === 'k') {
        if (!buttons.Down) buttons.P2_DOWN = 0
    } else if (ev.key === 'i') {
        if (!buttons.Up) buttons.P2_UP = 0
    } else if (ev.key === 'h') {
        if (!buttons.Jump) buttons.P2_FIRE = 0
    }
})

const Player = (x, y, color=c.RED) => ({
    x, y,
    state: playerStates.STANDING,
    c: color,
    w: 10,
    h: 20,
    dx: 0,
    dy: 0.1,
    moveSpeed: 4,
    jumpSpeed: -10
})

let player1 = Player(20, 400)
, player2 = Player(570, 400, c.GREEN)
, players = [player1, player2]
, platforms = [
    {x: 200, y: 380, w: 85, h: 10}
]

const clear = () => {
    stage.fillStyle = c.BLACK
    stage.fillRect(0, 0, stageW, stageH)
}

const btn = name => name in buttons && buttons[name] != 0
const clamp = (min, max, v) => v < min ? 0 : v > max ? max : v
const landsOn = (player, platforms) => {
    for (const platform of platforms) {
        if (player.x > platform.x &&
            player.x + player.w < platform.x + platform.w) {
            if (player.y + player.h + 1 >= platform.y) {
                return true
            }
        }
    }
    return false
}

const update = dt => {
    if (btn('P1_LEFT')) player1.dx = -player1.moveSpeed
    if (btn('P1_RIGHT')) player1.dx = player1.moveSpeed
    if (btn('P1_UP') && player1.state === playerStates.STANDING) {
        player1.state = playerStates.JUMPING
        player1.dy = player1.jumpSpeed
    }
    if (btn('P2_LEFT')) player2.dx = -player2.moveSpeed
    if (btn('P2_RIGHT')) player2.dx = player2.moveSpeed
    if (btn('P2_UP') && player2.state === playerStates.STANDING) {
        player2.state = playerStates.JUMPING
        player2.dy = player2.jumpSpeed
    }

    for (const player of players) {
        player.x += player.dx
        player.y = clamp(0, 400, player.y + player.dy)
        if (player.x >= stageW) {
            player.x = 0 - player.w
        } else if (player.x + player.w <= 0) {
            player.x = stageW
        }
        const playerBottom = player.y + player.h
        if (landsOn(player, platforms) || playerBottom === stageH) {
            player.state = playerStates.STANDING
            player.dy = 0.0
        } else {
            player.state = playerStates.JUMPING //hack
        }
        if (player.state === playerStates.JUMPING)
            player.dy += 0.8
    }
}

const renderPlayer = p => {
    stage.fillStyle = p.c
    stage.fillRect(p.x, p.y, p.w, p.h)
}

const renderPlatforms = () => {
    for (const platform of platforms) {
        stage.fillStyle = c.BLUE
        stage.fillRect(platform.x, platform.y, platform.w, platform.h)
    }
}

const render = dt => {
    clear()
    renderPlayer(player1)
    renderPlayer(player2)
    renderPlatforms()
}

const loop = dt => {
    update()
    render()
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
