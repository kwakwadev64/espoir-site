
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const line1 = document.getElementById('burger-line-1');
const line2 = document.getElementById('burger-line-2');
const line3 = document.getElementById('burger-line-3');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('opacity-100');
    
    if (isOpen) {
        mobileMenu.classList.remove('opacity-100', 'scale-y-100', 'pointer-events-auto');
        mobileMenu.classList.add('opacity-0', 'scale-y-0', 'pointer-events-none');
        
        line1.classList.remove('rotate-45', 'translate-x-[2px]', '-translate-y-[1px]');
        line2.classList.remove('opacity-0');
        line3.classList.remove('-rotate-45', 'translate-x-[2px]', 'translate-y-[1px]');
    } else {
        mobileMenu.classList.remove('opacity-0', 'scale-y-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'scale-y-100', 'pointer-events-auto');
        
        line1.classList.add('rotate-45', 'translate-x-[2px]', '-translate-y-[1px]');
        line2.classList.add('opacity-0');
        line3.classList.add('-rotate-45', 'translate-x-[2px]', 'translate-y-[1px]');
    }
}

burgerBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-100', 'scale-y-100', 'pointer-events-auto');
        mobileMenu.classList.add('opacity-0', 'scale-y-0', 'pointer-events-none');
        
        line1.classList.remove('rotate-45', 'translate-x-[2px]', '-translate-y-[1px]');
        line2.classList.remove('opacity-0');
        line3.classList.remove('-rotate-45', 'translate-x-[2px]', 'translate-y-[1px]');
    });
});