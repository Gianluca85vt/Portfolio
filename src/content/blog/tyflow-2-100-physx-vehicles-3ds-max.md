---
title: "tyFlow 2.100: PhysX vehicles land in 3ds Max"
date: 2026-09-03
category: 3D
excerpt: A proper car sim inside 3ds Max at last. Tyson Ibele's plugin now drives PhysX vehicles from the same flow graph as the particles and rigid bodies.
cover: /img/blog/tyflow-2-100-physx-vehicles-3ds-max/video-thumb.jpg
draft: true
---

Tyson Ibele shipped tyFlow 2.100 on 2 September, and buried in the usual list of tweaks and Inferno improvements is the feature that changes what a 3ds Max artist can plausibly deliver on their own: a PhysX vehicle operator. A car, a truck, a Mars rover if you want one — chassis, wheels, suspension, tyres, all driven by NVIDIA's PhysX inside the same flow graph as the rigid bodies and particles you already have.

That has not existed in 3ds Max before, not really. What we had were three bad options. Hand-key the whole thing, wheels and chassis pitch and everything, and hope the shot is short. Rig a rigid body chassis with per-wheel constraints and coax it into behaving. Or export the scene to Houdini or a game engine, run the sim there, and come back with an FBX. Each of those loses something, and the last one loses days.

## What PhysX Vehicles actually simulates

PhysX Vehicles is not the same solver as PhysX rigid bodies. It sits on top of them, and it exists because a car pretending to be a stack of six colliders behaves like a stack of six colliders. The vehicle model is one rigid body for the chassis, plus a sprung mass at each wheel that represents the suspension line rather than a full collider. Every step, each wheel raycasts to the road beneath it, the suspension length gives you compression, compression gives you a force, and the tyre model converts wheel spin and steer angle into forces at the contact patch — longitudinal for drive and brake, lateral for grip. Load, friction and slip come out of that, and the chassis inherits everything through the suspension link.

The point of that structure is that a car understands what a car does. Cornering rolls the body. Brakes pitch it forward. A bump on one wheel lifts the diagonal corner. You get all of that for free, because the physics is a good enough model of the physics.

## What that means in a DCC

The wheel transforms and the body pitch stop being your problem. You animate the driver's inputs — throttle, brake, steer — and the sim handles the rest, and it handles it against whatever tyFlow already knows about your scene. Drop a hundred procedural bricks onto the road with the standard particle setup, and the vehicle rolls over them and the bricks bounce. Cache the result to a tyCache and light it in V-Ray or Corona alongside a hundred other rigid bodies. This is the workflow a previs artist has been building around for years, held together with keyframes.

The interesting shot, always, was the impact. A previs car chase that ends in a crash used to be either faked with hand-animation up to the moment of contact and a rigid-body sim after, or roughed in and sent to another department. Now the car arrives at the collision as a proper rigid body already — the chassis is a mass, the wheels are masses, the suspension is springs — and the collision is just what happens next. The seam disappears.

## The Gaussian splat piece, briefly

Two other things shipped with 2.100 worth naming. tyFlow can now import objects that expose the Gaussian splat interface into the Birth Flow operator and the tyMesher, and export splat data from tyFlow and tyCache objects. That needs 3ds Max 2027 or later, because 2027 is where Autodesk added the native 3DGS object. What it means in practice: a scanned location as splats becomes a valid emitter surface for particles, and a cached tyFlow simulation can be shipped back out as splats. The two chunks of geometry the industry was pretending were separate now talk to each other, at least in one direction.

## A quieter fix that matters on a farm

One of the release-note lines is easy to miss and worth flagging. Deadline tyCache export can now acquire a floating licence seat even when the job runs as a network render, in setups where the licence server refuses ordinary render-node seat requests. Rendering an existing cache and generating a new cache are different actions with different licensing rules, and studios kept hitting the seam when they tried to fan out cache-generation jobs across their farm. If your pipeline has been tripping over this, the fix is in the update.

## Who this really helps

A studio with a fluid sim department and a Houdini licence per artist did not need this. They had SOP networks and RBD solvers and someone whose whole job is vehicle work. The person 2.100 changes things for is the small-shop 3ds Max artist doing automotive commercials, product films, previs and the odd VFX shot for something bigger — the one who was already inside tyFlow for particles and destruction, and who used to leave the DCC only when a car came into the shot.

<figure>
  <button class="video-embed" data-video="5qGs3ku8sSQ" data-title="tyFlow v2.100 - PhysX vehicles" type="button">
    <img src="/img/blog/tyflow-2-100-physx-vehicles-3ds-max/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Tyson Ibele's tyFlow v2.100 PhysX vehicles demo" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Ibele's own demo of the PhysX vehicle operator, from the tyFlow channel.</figcaption>
</figure>
