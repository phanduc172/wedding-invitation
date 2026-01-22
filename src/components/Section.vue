<template>
    <section class="hero-section">
        <b-row class="align-items-center">
            <!-- Text -->
            <b-col md="6" class="hero-text text-center text-md-left">
                <span class="hero-badge">Thiệp cưới cao cấp</span>

                <h1 class="hero-title">
                    Thiệp cưới tinh tế<br />
                    <span>Giao nhanh – In sắc nét</span>
                </h1>

                <p class="hero-subtitle">
                    Mẫu thiệp hiện đại, chỉnh nội dung miễn phí,<br />
                    giao nhanh tận nơi toàn quốc.
                    <strong>Biến lời mời thành kỷ niệm đáng nhớ.</strong>
                </p>

                <div class="hero-actions">
                    <b-button href="#mau" class="hero-btn primary">Xem mẫu</b-button>
                    <b-button href="#lien-he" class="hero-btn outline">Yêu cầu báo giá</b-button>
                </div>
            </b-col>

            <!-- Image -->
            <b-col md="6" class="text-center">
                <b-img src="https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7290-1757497631.webp" fluid
                    alt="Thiệp cưới Minh Đức" class="hero-image" />
            </b-col>
        </b-row>
    </section>
</template>


<script>
export default {
    name: 'Section'
}
</script>

<style scoped>
/* Font sang trọng */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto&display=swap');

.hero-section {
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    border-radius: 28px;
    padding: 2rem 1.5rem;
    box-shadow: 0 10px 28px rgba(139, 94, 60, 0.15);
    margin: 1rem 1rem;
}

/* Text */
.hero-text {
    padding-right: 2rem;
}

.hero-badge {
    display: inline-block;
    background: rgba(183, 110, 121, 0.15);
    color: #8B5E3C;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    letter-spacing: 1px;
    margin-bottom: 14px;
    font-weight: 600;
}

.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 700;
    color: #8B5E3C;
    line-height: 1.25;
    margin-bottom: 1rem;
}

.hero-title span {
    color: #b76e79;
}

.hero-subtitle {
    font-size: 1.05rem;
    color: #6b4226;
    line-height: 1.8;
    margin-bottom: 2rem;
}

/* Buttons */
.hero-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
}

.hero-btn {
    padding: 0.75rem 1.8rem;
    font-weight: 600;
    border-radius: 40px;
    transition: all 0.35s ease;
}

/* Primary */
.hero-btn.primary {
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    border: none;
    color: #fff;
}

.hero-btn.primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(183, 110, 121, 0.35);
}

/* Outline */
.hero-btn.outline {
    background: transparent;
    border: 2px solid #b76e79;
    color: #8B5E3C;
}

.hero-btn.outline:hover {
    background: rgba(183, 110, 121, 0.12);
    transform: translateY(-3px);
}

/* Image */
.hero-image {
    max-width: 92%;
    border-radius: 22px;
    box-shadow: 0 12px 26px rgba(139, 94, 60, 0.25);
    transition: transform 0.5s ease;
}

.hero-image:hover {
    transform: scale(1.05);
}

/* Mobile */
@media (max-width: 768px) {
    .hero-section {
        padding: 3rem 1.5rem;
        border-radius: 22px;
    }

    .hero-text {
        padding-right: 0;
    }

    .hero-title {
        font-size: 2.1rem;
    }

    .hero-image {
        margin-top: 2rem;
    }

    .hero-actions {
        justify-content: center;
    }
}
</style>
