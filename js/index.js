function superPong() {
 //global game values
 var game = {
   round: 0
  //  players: [player1, player2]
 }

  //looks for key presses and logs them
  var keys = [];
  $("body").on("keydown", function(e) {
    keys[e.keyCode] = true;
  });
  $("body").on("keyup", function(e) {
    keys[e.keyCode] = false;
  });

  // module aliases
  var Engine = Matter.Engine,
       World = Matter.World,
      Events = Matter.Events,
   Composite = Matter.Composite,
    Vertices = Matter.Vertices,
        Body = Matter.Body,
      Bodies = Matter.Bodies;

  // create an engine
  var engine = Engine.create();
  //turn off gravity
  engine.world.gravity.y = 0;
  // run the engine
  Engine.run(engine);

  function addWalls() { // look at this function and the one below to figure out how to add players
    //add the walls
    var wallSettings = {
      size: 200,
      isStatic: true,
      render: {
        restitution: 0,
        fillStyle: 'rgba(0, 0, 0, 0.0)',
        strokeStyle: '#00ffff'
      }
    };
    World.add(engine.world, [
      Bodies.rectangle(game.width * 0.5, -wallSettings.size * 0.5, game.width, wallSettings.size, wallSettings), //top
      Bodies.rectangle(game.width * 0.5, game.height + wallSettings.size * 0.5, game.width, wallSettings.size, wallSettings), //bottom
      Bodies.rectangle(-wallSettings.size * 0.5, game.height * 0.5, wallSettings.size, game.height + wallSettings.size * 2, wallSettings), //left
      Bodies.rectangle(game.width + wallSettings.size * 0.5, game.height * 0.5, wallSettings.size, game.height + wallSettings.size * 2, wallSettings) //right
    ]);
  }

  //add the masses
  var mass = [];
  //
  function addPlayer() {
  //   //add the player object as the first mass in the array
  //   mass.push();
  //   //var arrow = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0');
  //   var arrow = Vertices.fromPath('0 15 -10 -15 10 -15');
  //   mass[0] = Matter.Bodies.fromVertices(Math.random() * game.width, Math.random() * game.height, arrow, {
  //     //density: 0.001,
  //     alive: true,
  //     thrust: 0.00012, //forward acceleration, if mass goes up this needs to go up
  //     yaw: 0.0007, //angular acceleration, needs to be higher with  larger mass
  //     friction: 0,
  //     frictionStatic: 0,
  //     frictionAir: 0,
  //     restitution: 0, //bounce 1 = 100% elastic
  //     rotationLimit: 0.05, //max acceleration for player in radians/cycle
  //     angularFriction: 0.98, // 1 = no friction,  0.9 = high friction
  //     durability: 1,
  //     fireCD: 0,
  //     lastPlayerVelocity: {
  //       x: 0,
  //       y: 0
  //     },
  //   });
  //   World.add(engine.world, mass[0]);
  }

  function controls() {
    // type stuff here
  }
}
