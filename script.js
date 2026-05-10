// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

// 1. Initial Positioning
// Because they are 'absolute', we must spread them out horizontally first 
// to recreate your original grid/list look.
items.forEach((item, index) => {
  const initialX = 100 + (index * 250); // Start at padding + gap spacing
  const initialY = 100; // Vertical padding
  item.style.left = `${initialX}px`;
  item.style.top = `${initialY}px`;

  item.addEventListener('mousedown', startDragging);
});

let activeItem = null;
let offset = { x: 0, y: 0 };

function startDragging(e) {
  activeItem = e.currentTarget;
  
  // Visual feedback
  container.classList.add('active');
  activeItem.classList.add('dragging');

  // Calculate mouse position relative to the cube's top-left
  const rect = activeItem.getBoundingClientRect();
  offset.x = e.clientX - rect.left;
  offset.y = e.clientY - rect.top;

  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDragging);
}

function drag(e) {
  if (!activeItem) return;

  const containerRect = container.getBoundingClientRect();
  
  // Calculate new coordinates
  let x = e.clientX - containerRect.left - offset.x;
  let y = e.clientY - containerRect.top - offset.y;

  // Boundary Constraints
  const maxX = containerRect.width - activeItem.offsetWidth;
  const maxY = containerRect.height - activeItem.offsetHeight;

  // Clamp values inside the white border
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeItem.style.left = `${x}px`;
  activeItem.style.top = `${y}px`;
}

function stopDragging() {
  if (activeItem) {
    activeItem.classList.remove('dragging');
  }
  container.classList.remove('active');
  activeItem = null;

  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stopDragging);
}