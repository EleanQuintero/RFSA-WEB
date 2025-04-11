export function setupFilters() {
    // Limpiar eventos anteriores si existen
    const buttons = document.querySelectorAll('.filter-btn');
    let allPosts = Array.from(document.querySelectorAll('.card'));
    const container = allPosts.length ? allPosts[0].parentElement : null;

    // Detener si no hay elementos para filtrar
    if (!buttons.length || !allPosts.length || !container) return;
    
    // Guardar una copia de todos los posts originales
    const originalPosts = [...allPosts];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = (button as HTMLElement).dataset.category;

            // Actualizar botones activos
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Eliminar todos los posts actuales del contenedor
            allPosts.forEach(post => post.remove());
            
            // Filtrar y reinsertar solo los posts que coinciden con la categoría
            const filteredPosts = originalPosts.filter(post => {
                const postCategory = post.querySelector('.title')?.textContent ?? '';
                return category === 'all' || postCategory === category;
            });
            
            // Insertar solo los posts filtrados en el contenedor
            filteredPosts.forEach(post => {
                container.appendChild(post.cloneNode(true));
            });
            
            // Actualizar la referencia a los posts que están actualmente en el DOM
            allPosts = Array.from(document.querySelectorAll('.card'));
        });
    });
}

// Asegurarse de que la función se ejecute cuando cambia la navegación
document.addEventListener('astro:page-load', setupFilters);