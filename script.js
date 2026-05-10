// Your code here.const container = document.getElementById('container');
const items = document.querySelectorAll('.item');

let activeItem = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    activeItem = item;
    isDragging = true;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    item.classList.add('dragging');

    item.style.left = (itemRect.left - containerRect.left) + 'px';
    item.style.top = (itemRect.top - containerRect.top) + 'px';

    container.appendChild(item);
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  const itemRect = activeItem.getBoundingClientRect();

  const maxX = container.clientWidth - itemRect.width;
  const maxY = container.clientHeight - itemRect.height;

  // boundary clamp
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeItem.style.left = x + 'px';
  activeItem.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.classList.remove('dragging');
  }
  activeItem = null;
  isDragging = false;
});
