'use client'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useScooterAnimation(){
    const containerRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
    // Master Timeline: Control micro-animations
    const tl=gsap.timeline({ repeat: -1});

    //Push scooter off-screen right, hide tags
    gsap.set('.scooter-drive-wrapper', { x: '100vw' ,rotation:5, transformOrigin: 'center bottom' ,});
    gsap.set('.gsap-tag', { autoAlpha: 0, scale: 0.5 });
    // dust partices hidden
    gsap.set('.dust-particle', { autoAlpha: 0, scale: 0, x: 0, y: 0 });

    //  Drive In
    tl.addLabel('driveIn')
      .to('.scooter-drive-wrapper', {
        x: '0',
        duration: 1.4,
        ease: 'power3.out' 
      }, 'driveIn')

    // Brake Dip
    .to('.scooter-drive-wrapper', {
      rotation: -3,
      scaleY: 0.987,
      scaleX: 1.01,
      duration: 0.35,
      ease: 'power2.out'
    },'driveIn+=1') 

    // Dust particles burst out
    .to('.dust-particle', {
        autoAlpha: 1,
        scale: 'random(0.5, 1.5)', 
        x: 'random(20, 60)',       
        y: 'random(-10, -30)',     
        duration: 0.6,
        stagger: { amount: 0.1, from: "random" },
        ease: 'power2.out'
      }, 'driveIn+=1')
      // Fade dust out slowly into the air
      .to('.dust-particle', {
        autoAlpha: 0,
        scale: 'random(1.5, 2.5)', // Dust expands as it fades
        duration: 0.4,
        ease: 'power1.in'
        }, 'driveIn+=1.4')

    //  Roll back into resting position
    .to('.scooter-drive-wrapper', {
        rotation: 0,
        y:0,
        scaleY: 1,
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.out' 
      }, 'driveIn+=1.35')
      
    // Float tags 
    .to('.gsap-tag', {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    },'+=0.2')

    // Pause in center for a moment
    .to({}, { duration: 3 })
  
    // Shrink and fade out tags
    .to('.gsap-tag', {
      autoAlpha: 0,
      scale: 0.5,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.in'
    })

    tl.addLabel('driveOut')
      //The Wheelie- tilt backward as it runs 
      .to('.scooter-drive-wrapper',{
        rotation: 12, 
        y: -15,
        duration: 0.3,
        ease: 'power2.out'
      },'driveOut')

      // Reset dust particle state
     .set('.dust-particle', { x: 0, y: 0, scale: 0 })
     .to('.dust-particle', {
          autoAlpha: 1,
          scale: 'random(0.5, 1.2)',
          x: 'random(30, 80)',
          y: 'random(-5, -20)',
          duration: 0.4,
          ease: 'power3.out'
        }, 'driveOut')
        .to('.dust-particle', { autoAlpha: 0, duration: 0.2 }, 'driveOut+=0.3')
        
    // Drive scooter off-screen left
    .to('.scooter-drive-wrapper', {
      x: '-100vw',
      duration: 1.1,
      ease: 'expo.in'
    },'driveOut+=0.05') 
    .set('.scooter-drive-wrapper', { y: 0 })
  },{scope: containerRef}
);
 return containerRef;
} 