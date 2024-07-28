'use strict';
export function visualise2d(points, triangles) {
    // Подключение canvas
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    // Настройка размеров канваса
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Определяем минимальные и максимальные значения координат
    const xMin = Math.min(...points.map(point => point[0]));
    const xMax = Math.max(...points.map(point => point[0]));
    const yMin = Math.min(...points.map(point => point[1]));
    const yMax = Math.max(...points.map(point => point[1]));

    // Инициализация масштаба и смещения
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;
    let dragStart = { x: 0, y: 0 };

    // Вычисляем начальные коэффициенты масштабирования
    let initialScaleX = canvasWidth / (xMax - xMin);
    let initialScaleY = canvasHeight / (yMax - yMin);

    // Текущие коэффициенты масштабирования
    let scaleX = initialScaleX * scale;
    let scaleY = initialScaleY * scale;

    // Начальные значения смещения для центрирования на холсте
    offsetX = canvasWidth / 2 - ((xMax + xMin) / 2) * scaleX;
    offsetY = canvasHeight / 2 - ((yMax + yMin) / 2) * scaleY;

    // Функция для преобразования координат точек на холсте
    const transformPoint = (x, y) => ({
        x: (x * scaleX) + offsetX,
        y: (y * scaleY) + offsetY,
    });

    // Функция для обратного преобразования координат из холста
    const inverseTransformPoint = (x, y) => ({
        x: (x - offsetX) / scaleX,
        y: (y - offsetY) / scaleY,
    });

    // Обработчик для отрисовки
    const draw = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Отрисовка сгенерированных точек
        ctx.fillStyle = "blue";
        points.forEach(point => {
            const { x, y } = transformPoint(point[0], point[1]);
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            // Добавляем координаты в виде метки
            const label = `(${point[0].toFixed(2)}, ${point[1].toFixed(2)})`;
            ctx.fillText(label, x + 5, y - 5); // Сдвиг метки на 5 пикселей вправо и вверх
        });
        // Отрисовка треугольников
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < triangles.length; i += 3) {
            const p1 = points[triangles[i]];
            const p2 = points[triangles[i + 1]];
            const p3 = points[triangles[i + 2]];

            ctx.beginPath();
            const { x: x1, y: y1 } = transformPoint(p1[0], p1[1]);
            const { x: x2, y: y2 } = transformPoint(p2[0], p2[1]);
            const { x: x3, y: y3 } = transformPoint(p3[0], p3[1]);

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.stroke();
        }
    };

    // Обработчик масштабирования (scroll)
    canvas.addEventListener("wheel", (event) => {
        const delta = Math.sign(event.deltaY);
        const zoomFactor = 1.1; // Фактор масштабирования

        // Позиция курсора мыши на холсте
        const mousePos = {
            x: event.offsetX,
            y: event.offsetY
        };

        // Преобразуем позицию курсора мыши в мировые координаты
        const worldPosBeforeZoom = inverseTransformPoint(mousePos.x, mousePos.y);

        // Обновляем масштаб
        if (delta < 0) {
            // Увеличиваем масштаб
            scale *= zoomFactor;
        } else {
            // Уменьшаем масштаб
            scale /= zoomFactor;
        }

        // Обновляем коэффициенты масштабирования
        scaleX = initialScaleX * scale;
        scaleY = initialScaleY * scale;

        // Преобразуем мировые координаты обратно в экранные координаты
        const worldPosAfterZoom = inverseTransformPoint(mousePos.x, mousePos.y);

        // Корректируем смещение, чтобы позиция курсора мыши оставалась на месте
        offsetX += (worldPosAfterZoom.x - worldPosBeforeZoom.x) * scaleX;
        offsetY += (worldPosAfterZoom.y - worldPosBeforeZoom.y) * scaleY;

        draw();
    });

    // Обработчик начала перетаскивания
    canvas.addEventListener("mousedown", (event) => {
        dragging = true;
        dragStart.x = event.offsetX;
        dragStart.y = event.offsetY;
    });

    // Обработчик окончания перетаскивания
    canvas.addEventListener("mouseup", () => {
        dragging = false;
    });

    // Обработчик перемещения мыши
    canvas.addEventListener("mousemove", (event) => {
        if (dragging) {
            const deltaX = event.offsetX - dragStart.x;
            const deltaY = event.offsetY - dragStart.y;

            offsetX += deltaX;
            offsetY += deltaY;

            dragStart.x = event.offsetX;
            dragStart.y = event.offsetY;

            draw();
        }
    });

    // Первоначальный вызов отрисовки
    draw();
}