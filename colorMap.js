'use strict';

import { visualise } from './visualise.js';
import { Point3D } from './triangulationClasses.mjs';

const canvas = document.querySelector("canvas");
// генерация точек множества при помощи нормального распределения
const size = 100;
let points = [];
for (let i = 0; i < size; i++) {
    let x = Math.random() * canvas.width,
    y = Math.random() * canvas.height,
    z = Math.random() * 20;
    points.push(new Point3D(Math.round(x), Math.round(y), Math.round(z)));
}



// Использование функции
visualise(points);