import { Point3D } from "./triangulationClasses.mjs";
// Асинхронная функция для импорта точек из CSV без использования библиотеки
export async function importPointsFromCSV(fileName) {
    try {
        // Загружаем CSV-файл
        const response = await fetch(fileName);

        // Проверяем успешность загрузки
        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
        }

        // Получаем текст CSV
        const csvData = await response.text();

        // Разбиваем данные на строки
        const lines = csvData.trim().split('\n');

        // Преобразуем строки CSV в объекты Point3D
        const points = lines.map(line => {
            const values = line.split(';');

            // Игнорируем первое значение (имя точки)
            const x = parseFloat(values[1]);
            const y = parseFloat(values[2]);
            const z = parseFloat(values[3]);

            // Проверка, что все значения корректные числа
            if (isNaN(x) || isNaN(y) || isNaN(z)) {
                console.warn('Invalid row format:', line);
                return null; // Возвращаем null для некорректных строк
            }

            // Создаем объект Point3D с флагом undefined
            return new Point3D(x, y, z, undefined);
        }).filter(point => point !== null); // Фильтруем null значения

        // Возвращаем массив объектов Point3D
        return Promise.resolve(points);
    } catch (error) {
        console.error('Error importing points from CSV:', error);
        return Promise.resolve([]); // Возвращаем пустой массив в случае ошибки
    }
}

  
export function randomPoints (size){
    let canvas = document.querySelector("canvas");
    let points = [];
    for (let i = 0; i < size; i++) {
        let x = Math.random() * canvas.width,
        y = Math.random() * canvas.height,
        z = Math.random() * 20;
        
        points.push(new Point3D(Math.round(x), Math.round(y), Math.round(z)));
    }
    return points
}

export function points3dTo2d(points3d) {
    // console.log(points3d)
    let points2d = [];
    for (const point3d of points3d) { 
        points2d.push([point3d.x,point3d.y])
    }
    // console.log(points2d)
    return points2d;
  }
  