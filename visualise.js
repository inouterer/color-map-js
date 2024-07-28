import { Point3D } from "./triangulationClasses.mjs";
'use strict';

export function visualise (points) {
    // подключение canvas
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");

    // отрисовка триангуляции
    ctx.strokeStyle = "black";
    // let triangles = triangulate(points);
    // отрисовка сгенерированных точек
    for (const point of points) {
        ctx.beginPath();
        ctx.arc(point.x,point.y, 2.5, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    // отрисовка треугольников
    for (let i = 0; i < triangles.length;) {
        ctx.beginPath();
        ctx.moveTo(points[triangles[i]][0], points[triangles[i]][1]); i++;
        ctx.lineTo(points[triangles[i]][0], points[triangles[i]][1]); i++;
        ctx.lineTo(points[triangles[i]][0], points[triangles[i]][1]); i++;
        ctx.closePath();
        ctx.stroke();
    }
}