//  http://brm.io/matter-js/docs/
//  http://brm.io/matter-js/demo/#mixed
//  https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js
//  https://en.wikipedia.org/wiki/Rotation_matrix

/*    ideas
change the collision filter group for the body the portal is on
if the player touches the portal make the player not able to collide with the wall
add in some invisible edges to the portal
if the player's center touches the portal teleport to the other portal
make portals fireable with ray casting  (consider using point checks, not raycasting)
  https://github.com/liabru/matter-js/issues/181


*/

/*function rotateVector(vector, angle) {
  return {
    x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
    y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle)
  }
} */


//game objects values
var game = {
  cycle: 0,
  width: 1200,
  height: 800,
}

var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Events = Matter.Events,
  Body = Matter.Body,
  //Composites = Matter.Composites,
  Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

engine.world.gravity.y = 0;

var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: game.width, //window.outerWidth,
    height: game.height, //window.innerHeight,
    pixelRatio: 1,
    background: 'rgba(255, 0, 0, 0.0)',
    wireframeBackground: '#222',
    enabled: true,
    wireframes: false,
    showVelocity: false,
    showAngleIndicator: true,
    showCollisions: false,
  }
});

//add the walls
var offset = 5;
World.add(engine.world, [
  Bodies.rectangle(400, -offset, game.width * 2 + 2 * offset, 50, {
    isStatic: true
  }),
  Bodies.rectangle(400, game.height + offset, game.width * 2 + 2 * offset, 50, {
    isStatic: true
  }),
  Bodies.rectangle(game.width + offset, 300, 50, game.height * 2 + 2 * offset, {
    isStatic: true
  }),
  Bodies.rectangle(-offset, 300, 50, game.height * 2 + 2 * offset, {
    isStatic: true
  })
]);

const playerOneXPos = 100;
const playerTwoXPos = 1100;

// define and add playerOne, playerTwo, ball
var playerOne = Bodies.rectangle(playerOneXPos, 150, 20, 200, {
  inertia: Infinity, isStatic: false, angle: Math.PI, alive: true, x:0, y:0
});
var playerTwo = Bodies.rectangle(playerTwoXPos, 150, 20, 200, {
  inertia: Infinity, isStatic: false, angle: Math.PI, alive: true
});

var ball = Bodies.circle(400, 200, 16, {
  density: 0.0001,
  frictionStatic: 0,
  frictionAir: 0,
  restitution: 1,

  collisionFilter:{
    category: 1,
    group: 1,
    mask: 1
  },
  render:{
    strokeStyle:'black',
    fillStyle:'black'
  },
});
ball.collisionFilter.group = -1

Matter.Body.setVelocity(ball, {
    x: 10,
    y: 0
});

// add setInterval fn to gradually increase velocity

// setInterval(function() {
//   Matter.Body.setVelocity(ball, {
//     x: ball.velocity.x + 0.05,
//     y: ball.velocity.y + 0.01
//   })
// }, 1000);



World.add(engine.world, [playerOne, playerTwo, ball]);

$(document).keydown(function(e) {
	var key = String.fromCharCode(e.which);
  if (key == 'W') {
    playerOne.force = {
      x: 0,
      y: -0.1
    }
  } else if (key == 'S') {
    playerOne.force = {
      x: 0,
      y: 0.1
    }
  } else if (key == '&') {
    playerTwo.force = {
      x: 0,
      y: -0.1
    }
  } else if(key == '(') {
    playerTwo.force = {
      x: 0,
      y: 0.1
    }
  }
})

// "hacky" way to make make sure players' x-coords don't permanently change during collisions
// needs to be fixed, maybe by making an invisible wall?
Events.on(engine, "collisionStart", function(event) {
  Matter.Body.setPosition(playerOne, { x: playerOneXPos, y: playerOne.position.y } );
  Matter.Body.setPosition(playerTwo, { x: playerTwoXPos, y: playerTwo.position.y } );

});
// Events.on(engine, "collisionActive", function(event) {
// });
Events.on(engine, 'collisionEnd', function(event) {
  Matter.Body.setPosition(playerOne, { x: playerOneXPos, y: playerOne.position.y } );
  Matter.Body.setPosition(playerTwo, { x: playerTwoXPos, y: playerTwo.position.y } );
})

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);








//// OLD/BOILERPLATE CODE ////

// //Keyboard input
// var keys = [];
// document.body.addEventListener("keydown", function(e) {
//   keys[e.keyCode] = true;
// });
// document.body.addEventListener("keyup", function(e) {
//   keys[e.keyCode] = false;
// });

// Events.on(engine, "afterTick", function(event) {
//   // if (keys[38].keyup === true) {
//   // playerOne.force = {
//   //     x: 0,
//   //     y: 1
//   //   }
//   // }
// });
// // Pressing down arrow first will make the paddle go down, pressing up afterwards will make it go up. However pressing up first and then attempting to go down doesn't work.
// Events.on(engine, "beforeTick", function(event) {
//   // game.cycle++;
//   // //spin left and right
//   //
//   // const limit = 0.3;
//   // if (keys[38] > -limit) {
//   //   Matter.Body.setVelocity(playerOne, {
//   //       x: 0,
//   //       y: -5
//   //     })
//   // } else if (keys[40] > -limit) {
//   //   Matter.Body.setVelocity(playerOne, {
//   //       x: 0,
//   //       y: 5
//   //     })
//   // }
// });


//don't uncomment, this'll break the code... Add your player!
/*const playerRadius = 25
var player = Bodies.circle(800, game.height-200, playerRadius, {
  density: 0.001,
  friction: 0.7,
  frictionStatic: 0,
  frictionAir: 0.005,
  restitution: 0.3,
  ground: false,
  jumpCD: 0,

  collisionFilter:{
    category: 1,
    group: 1,
    mask: 1
  },
  render:{
    strokeStyle:'black',
    fillStyle:'darkgrey'
  },
});
player.collisionFilter.group = -1

//this sensor check if the player is on the ground to enable jumping
var playerSensor = Bodies.rectangle(0, 0, playerRadius, 5, {
  isSensor: true,
  render:{
    visible: false
  },
  //isStatic: true,
})
playerSensor.collisionFilter.group = -1

//populate world
World.add(engine.world, [player, playerSensor]);
*/
//looks for key presses and logs them
/*var keys = [];
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

function playerGroundCheck(event, ground) { //runs on collisions events
  var pairs = event.pairs
  for (var i = 0, j = pairs.length; i != j; ++i) {
    var pair = pairs[i];
    if (pair.bodyA === playerSensor) {
      player.ground = ground;
    } else if (pair.bodyB === playerSensor) {
      player.ground = ground;
    }
  }
}*/

// Events.on(engine, "afterTick", function(event) {
//   //set sensor velocity to zero so it collides properly
//   Matter.Body.setVelocity(playerSensor, {
//       x: 0,
//       y: 0
//     })
//     //move sensor to below the player
//   Body.setPosition(playerSensor, {
//     x: player.position.x,
//     y: player.position.y + playerRadius
//   });
// });
//
// Events.on(engine, "beforeTick", function(event) {
//   game.cycle++;
//   //jump
//   if (keys[38] && player.ground && player.jumpCD < game.cycle) {
//     player.jumpCD = game.cycle + 10; //adds a cooldown to jump
//     player.force = {
//       x: 0,
//       y: -0.07
//     };
//   }
//   //spin left and right
//   const spin = 0.05;
//   const limit = 0.3;
//   if (keys[37] && player.angularVelocity > -limit) {
//     player.torque = -spin;
//   } else {
//     if (keys[39] && player.angularVelocity < limit) {
//       player.torque = spin;
//     }
//   };
// });*/
