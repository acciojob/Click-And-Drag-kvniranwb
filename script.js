// Your code here.
const container = document.getElementById("container");
    const items = document.querySelectorAll(".item");

    // Position items in grid layout
    items.forEach((item, index) => {
      const row = Math.floor(index / 5);
      const col = index % 5;
      item.style.left = `${col * 210}px`;
      item.style.top = `${row * 210}px`;
    });

    let selected = null;
    let offsetX = 0;
    let offsetY = 0;

    items.forEach(item => {
      item.addEventListener("mousedown", (e) => {
        selected = item;
        const rect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        item.style.cursor = "grabbing";
      });
    });

    document.addEventListener("mousemove", (e) => {
      if (!selected) return;

      const containerRect = container.getBoundingClientRect();
      let x = e.clientX - containerRect.left - offsetX;
      let y = e.clientY - containerRect.top - offsetY;

      // Boundaries
      const maxX = container.clientWidth - selected.clientWidth;
      const maxY = container.clientHeight - selected.clientHeight;

      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      selected.style.left = `${x}px`;
      selected.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", () => {
      if (selected) {
        selected.style.cursor = "grab";
        selected = null;
      }
    });