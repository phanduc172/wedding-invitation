<template>
    <footer class="p-4 custom-footer text-center mt-3">
        <div class="footer-content">
            <p class="mb-2">
                💌 <span class="brand">Thiệp cưới Minh Đức</span> – Thiết kế & In ấn chuyên nghiệp
            </p>
            <p class="mb-1">
                📞 <a href="tel:0383181115" class="footer-link">0383.181.115</a> •
                🌐 <a href="https://fb.com/thiepcuoiminhduc17" target="_blank" class="footer-link">Facebook</a> •
                ✉️ <a href="mailto:thiepcuoiminhduc17@gmail.com" class="footer-link">Email</a>
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600&display=swap');

.custom-footer {
    background: linear-gradient(to right, #fff, #fdf6f0);
    font-size: 16px;
    padding: 4px;
    border-top: 2px solid #e5d3c8;
    /* nhẹ nhàng phân cách */
    color: #6b4226;
}

.footer-content {
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.6;
}

.brand {
    font-family: 'Great Vibes', cursive;
    font-size: 20px;
    color: #8B5E3C;
    font-weight: 600;
}

.footer-link {
    color: #6b4226;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-link:hover {
    color: #b76e79;
    text-decoration: underline;
}
</style>
