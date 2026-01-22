<template>
    <section id="ve-chung-toi" class="about-section my-5 py-5">
        <div class="container text-center">
            <h2 class="about-title mb-4">Về chúng tôi</h2>
            <p class="about-desc">
                💌 <span class="brand">Thiệp Cưới Minh Đức</span> — đội ngũ thiết kế & in ấn chuyên nghiệp,
                tỉ mỉ từng chi tiết để bạn tự hào khi gửi thiệp.
            </p>
            <ul class="about-list list-unstyled">
                <li>✨ Hơn 5 năm kinh nghiệm</li>
                <li>🎨 Hỗ trợ chỉnh sửa miễn phí</li>
                <li>🚚 Giao hàng an toàn, đóng gói cẩn thận</li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600&display=swap');

.about-section {
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    border-radius: 16px;
    padding: 3rem 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.about-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: #8B5E3C;
    font-weight: 600;
    position: relative;
    display: inline-block;
}

.about-title::after {
    content: "";
    display: block;
    height: 3px;
    width: 50%;
    background: #b76e79;
    margin: 0.5rem auto 0;
    border-radius: 2px;
}

.about-desc {
    font-size: 16px;
    color: #555;
    max-width: 850px;
    margin: 0 auto;
    line-height: 1.7;
}

.brand {
    font-family: 'Great Vibes', cursive;
    font-size: 22px;
    color: #8B5E3C;
    font-weight: 600;
}

.about-list li {
    font-size: 16px;
    color: #6b4226;
    margin-bottom: 0.8rem;
    transition: transform 0.3s ease, color 0.3s ease;
}

.about-list li:hover {
    transform: translateX(5px);
    color: #b76e79;
}
</style>
