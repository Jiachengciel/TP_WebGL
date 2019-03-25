Arena = function(game) //on créée notre objet Arena qui prend l'objet game en argument
{
    // VARIABLES UTILES
    this.game = game;
    scene = game.scene;

    //EXEMPLE 
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    cube = BABYLON.Mesh.CreateBox("cube", 10, scene, false);

    cube.position.y = 1;

    this.game.scene.cube = cube;// va nous permettre d'accéder à notre mesh pour réaliser des animations au sein du prototype 
    //(à faire à chaque fois que vous comptez animer un mesh)

    var boxArena = BABYLON.Mesh.CreateBox("box1", 100, scene, false, BABYLON.Mesh.BACKSIDE);

    boxArena.scaling.y = 2;

    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);

    boxArena.material = materialGround;
    boxArena.checkCollisions = true;

    //LIRE LA DOC

    // LUMIERES 

    /*TODO :  -3 lumières différentes
              -couleurs et intensités
    */
    // Point Light
    var pointlight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, -10, 1), scene);
    pointlight.diffuse = new BABYLON.Color3(0, 0.3, 0.6);
    pointlight.specular = new BABYLON.Color3(0, 0.4, 0);
    pointlight.intensity = 0.1;

    // Directional Light
    var direclight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    direclight.diffuse = new BABYLON.Color3(0, 0.2, 0.5);
    direclight.specular = new BABYLON.Color3(0, 1, 0.5);
    direclight.intensity = 0.2;

    //Spot Light
    var spotlight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 30, -10),
        new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    spotlight.diffuse = new BABYLON.Color3(0, 0, 1);
    spotlight.specular = new BABYLON.Color3(0, 1, 0);
    spotlight.intensity = 0.2;


    // MATERIAUX ET TEXTURES

    /*TODO :    -materiau standard
                -multi-materiaux
                -video-texture
                -normal map
                -texture procedurale (feu, nuage...)
    */
    // Video texture
    videomat = new BABYLON.StandardMaterial("videomat", scene);
    videotexture = new BABYLON.VideoTexture("video", ["assets/video/big_buck_bunny.mp4"], scene, true);
    videomat.diffuseTexture = videotexture;

    // texture procedurale
    fire = new BABYLON.StandardMaterial("fire", scene);
    fire.ambientTexture = new BABYLON.Texture("assets/textures/fire.png", scene);

    grass = new BABYLON.StandardMaterial("grass", scene);
    grass.ambientTexture = new BABYLON.Texture("assets/textures/grass.png", scene);

    // normal map
    floor = new BABYLON.StandardMaterial("floor", scene);
    floor.ambientTexture = new BABYLON.Texture("assets/textures/floor.png", scene);
    floor.bumpTexture = new BABYLON.Texture("assets/textures/floor_bump.png", scene);


    //MESHS ET COLLISIONS

    /*TODO :    -box
                -sphere
                -cylindre
                -tore
                -appliquer les collisions
    */
    // Box
    box1 = BABYLON.Mesh.CreateBox("box1", 3, scene, false);
    box1.position.x = -10;
    box1.checkCollisions = true;

    box2 = BABYLON.Mesh.CreateBox("box2", 3, scene, false);
    box2.position.x = -20;
    box2.checkCollisions = true;

    box3 = BABYLON.Mesh.CreateBox("box2", 3, scene, false);
    box3.position.x = -20;
    box3.position.y = -10;
    box3.checkCollisions = true;

    // Sphere
    sphere0 = BABYLON.Mesh.CreateSphere("sphere0", 16, 4, scene);
    sphere0.position.y = 10;
    sphere0.position.x = 10;

    // Cylindre
    cylindre1 = BABYLON.Mesh.CreateCylinder("cylindre1", 4, 2, 5);
    cylindre1.position.y = -100;
    cylindre1.checkCollisions = true;
    // plate
    plate = BABYLON.Mesh.CreateGround("gamePlateForm", 500, 500, 5,scene);
    plate.position.y = -120;
    plate.checkCollisions = true;

    this.game.scene.box1 = box1;
    this.game.scene.box2 = box2;
    this.game.scene.box3 = box3;
    this.game.scene.sphere0 = sphere0;
    this.game.scene.cylindre1 = cylindre1;
    this.game.scene.plate = plate;

    // mettre les textures
    box1.material = fire;
    box2.material = fire;
    box3.material = fire;
    plate.material = grass;
    cube.material = floor;
    cylindre1.material = grass;
    sphere0.material = fire;
    boxArena.material = grass;

    // Pour devant le skybox
    cube.renderingGroupId = 1;
    boxArena.renderingGroupId = 1;
    box1.renderingGroupId = 1;
    box2.renderingGroupId =1;
    box3.renderingGroupId = 1;
    sphere0.renderingGroupId = 1;
    cylindre1.renderingGroupId = 1;
    plate.renderingGroupId = 1;


    //AUDIO

    /*TODO : -sons d'ambiance
             -sons liés à des objets --> le son doit être localisé spatialement
    */
    // sons d'ambiance
    var music1 = new BABYLON.Sound("music1", "assets/audio/tiankong.mp3", scene, null, { loop : true, autoplay : true });
    // myTODO : with keyboard pause the music
    // window.addEventListener("keydown", function (evt) {
    //     // Press space key to fire
    //     mykeyboard = false;
    //     if (evt.keyCode === 32 ) {
    //         if(mykeyboard == false){
    //             music1.play();
    //             mykeyboard = true;
    //         }
    //         else{
    //             music1.pause();
    //             mykeyboard = false;
    //         }
    //
    //     }
    // });

    // son spatialement
    var sonSpatiale = new BABYLON.Sound("sonSpatiale", "assets/audio/haoyunlai.mp3", scene, null, { loop : true, autoplay : true });
    sonSpatiale.setDirectionalCone(90, 180, 0);
    sonSpatiale.setLocalDirectionToMesh(new BABYLON.Vector3(0, 0.8, 0));
    sonSpatiale.attachToMesh(cylindre1);

    //SKYBOX

    /*TODO : -Créer une (grande) box
             -Un materiau avec une CubeTexture, attention à bien faire correspodre les faces.
    */
    // creer une skybox
    var skybox = BABYLON.Mesh.CreateBox("skybox", 100.0, scene);
    skybox.position.y = 10;
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // mettre les textures
    skyboxMaterial.backFaceCulling = false;
    skybox.infiniteDistance = true;

    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skybox/", scene,
        ["skybox_px.jpg", "skybox_py.jpg", "skybox_pz.jpg", "skybox_nx.jpg", "skybox_ny.jpg", "skybox_nz.jpg"]);

    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    // mettre le skybox sous l'autre mesh
    skybox.renderingGroupId = 0;

};

Arena.prototype={

    //ANIMATION
    _animateWorld : function(ratioFps)
    {
      // Animation des plateformes (translation, rotation, redimensionnement ...)
      /*TODO*/



        // Redimensionnement
        // var animationBox = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        //
        // var keyFrames = [];
        //
        // keyFrames.push({
        //     frame: 0,
        //     value: 1
        // });
        //
        // keyFrames.push({
        //     frame: 40,
        //     value: 0.2
        // });
        //
        // keyFrames.push({
        //     frame: 100,
        //     value: 1
        // });
        //
        // animationBox.setKeys(keyFrames);
        // box3.animations = [];
        // box3.animations.push(animationBox);
        // scene.beginAnimation(box3, 0, 100, true);

        // Rotation
        var animationBall = new BABYLON.Animation("AnimeBox", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var ballKeys = [];

        ballKeys.push({
            frame: 0,
            value: 0
        });

        ballKeys.push({
            frame: 2,
            value: Math.PI
        });

        ballKeys.push({
            frame: 10,
            value: 2 * Math.PI
        });

        animationBall.setKeys(ballKeys);
        box2.animations = [];
        box2.animations.push(animationBall);
        scene.beginAnimation(box2, 0, 100, true);

        // Translation
        var startPoint = new BABYLON.Vector3(-10, 3, 2);
        box1.position = startPoint;

        var direction0 = new BABYLON.Vector3(2, 3, 4);
        direction0.normalize();
        var direction1 = new BABYLON.Vector3(0, 1, 0);
        direction1.normalize();
        var direction2 = new BABYLON.Vector3(-5, -10, -8);
        direction2.normalize();
        distance = 0.01;

        var i = 0;
        scene.registerBeforeRender(function () {
            if(i++<200) box1.translate(direction0, distance, BABYLON.Space.LOCAL);
            else if(i++<800) box1.translate(direction1, distance, BABYLON.Space.LOCAL);
            else if(i++<3200) box1.translate(direction2, distance, BABYLON.Space.LOCAL);
        });


    },
};