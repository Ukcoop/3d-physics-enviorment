let Ammo: any = require("ammo.js");

export default class physicsHandler {
  collisionConfiguration: any;
  dispatcher: any;
  broadphase: any;
  solver: any;
  physicsWorld: any;
  dynamicBodies: Array<any>;

  constructor() {
    this.collisionConfiguration = Ammo.btDefaultCollisionConfiguration();
    this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
    this.broadphase = new Ammo.btDbvtBroadphase();
    this.solver = new Ammo.btSequentialImpulseConstraintSolver();
    this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration);
    this.physicsWorld.setGravity(new Ammo.btVector3(0, -9.82, 0));
    this.dynamicBodies = [];
  }

  attachPhysicsToRect(position: Array<number>, rotation: Array<number>, dimentions: Array<number>, mass: number, isDynamic: boolean, id: string, graphicsObjects: any) {
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( position[0], position[1], position[2] ) );
    transform.setRotation( new Ammo.btQuaternion( rotation[0], rotation[1], rotation[2], rotation[3] ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( dimentions[0], dimentions[1], dimentions[2] ) );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    this.physicsWorld.addRigidBody( body );
    
    if(isDynamic) {
      graphicsObjects[id].userData.physicsBody = body;
    }
    return graphicsObjects; // may not be needed?
  }

  attachPhysicsToSphere(position: Array<number>, rotation: Array<number>, radius: number, mass: number, isDynamic: boolean, id: string, graphicsObjects: any) {
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( position[0], position[1], position[2] ) );
    transform.setRotation( new Ammo.btQuaternion( rotation[0], rotation[1], rotation[2], rotation[3] ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btSphereShape( radius );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    physicsWorld.addRigidBody( body );

    if(isDynamic) {
      graphicsObjects[id].userData.physicsBody = body;
    }
    return graphicsObjects; // may not be needed?
  }

  updatePhysics(deltaTime: number, graphicsObjects: any) {
    physicsWorld.stepSimulation( deltaTime, 10 );
    let graphicsObjectsKeys = Object.keys(graphicsObjects);
    
    for ( let i = 0; i < graphicsObjectsKeys.length; i++ ) {
      if(graphicsObjects[graphicsObjectsKeys[i]].userData.physicsBody) {
        // let objThree = graphicsObjects[graphicsObjectsKeys[i]];
        // let objAmmo = graphicsObjects[graphicsObjectsKeys[i]].userData.physicsBody;
        let ms = graphicsObjects[graphicsObjectsKeys[i]].userData.physicsBody.getMotionState();
        
        if ( ms ) {
          ms.getWorldTransform( tmpTrans );
          let p = tmpTrans.getOrigin();
          let q = tmpTrans.getRotation();
          graphicsObjects[graphicsObjectsKeys[i]].position.set( p.x(), p.y(), p.z() );
          graphicsObjects[graphicsObjectsKeys[i]].quaternion.set( q.x(), q.y(), q.z(), q.w() );
        }
      }
    }

    return graphicsObjects; // may not be nedded?
  }
}
