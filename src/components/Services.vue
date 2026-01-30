<template>
    <section id="dich-vu" class="services-section">
        <div class="services-header text-center">
            <span class="section-badge">CAM KẾT DỊCH VỤ</span>

            <h2 class="services-title">
                Dịch vụ <span>nổi bật</span>
            </h2>

            <div class="title-divider">
                <i class="bi bi-heart-fill"></i>
            </div>

            <p class="services-desc">
                Đồng hành cùng bạn từ khâu thiết kế đến khi nhận thiệp hoàn chỉnh —
                tận tâm, chỉn chu và đúng hẹn.
            </p>
        </div>

        <b-row>
            <b-col md="4" v-for="(service, i) in services" :key="i" class="mb-4">
                <b-card class="service-card h-100 text-center">
                    <div class="service-icon">
                        <i :class="service.icon"></i>
                    </div>

                    <h5 class="service-title">{{ service.title }}</h5>
                    <p class="service-text">{{ service.desc }}</p>
                </b-card>
            </b-col>
        </b-row>
    </section>
</template>


<script>
export default {
    name: 'Services',
    data() {
        return {
            services: [
                {
                    title: "Chỉnh nội dung miễn phí",
                    desc: "Hỗ trợ thay tên, ngày, lời mời trước khi in.",
                    icon: "bi bi-pencil-square"
                },
                {
                    title: "Giao hàng toàn quốc",
                    desc: "Miễn phí vận chuyển nội thành. Hỗ trợ COD.",
                    icon: "bi bi-truck"
                },
                {
                    title: "In gấp & hoàn thiện",
                    desc: "Thời gian cơ bản 3-7 ngày tùy mẫu.",
                    icon: "bi bi-lightning-charge"
                }
            ]
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto&display=swap');

.services-section {
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    border-radius: 32px;
    padding: 4rem 2.5rem;
    margin: 3rem 1rem;
    box-shadow: 0 12px 30px rgba(139, 94, 60, 0.15);
}

/* Header */
.services-header {
    max-width: 765px;
    margin: 0 auto 3.5rem;
}

.section-badge {
    display: inline-block;
    background: rgba(183, 110, 121, 0.18);
    color: #8B5E3C;
    padding: 6px 18px;
    border-radius: 30px;
    font-size: 12px;
    letter-spacing: 1.5px;
    font-weight: 600;
    margin-bottom: 14px;
}

.services-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.3rem;
    color: #8B5E3C;
    line-height: 1.2;
}

.services-title span {
    color: #b76e79;
}

/* Divider */
.title-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 14px 0;
    color: #b76e79;
}

.title-divider::before,
.title-divider::after {
    content: "";
    width: 60px;
    height: 1px;
    background: rgba(183, 110, 121, 0.4);
    margin: 0 10px;
}

.services-desc {
    font-size: 1.05rem;
    color: #6b4226;
    line-height: 1.8;
}

/* Card */
.service-card {
    border: none;
    border-radius: 26px;
    padding: 2.5rem 2rem;
    background: #fff;
    box-shadow: 0 10px 26px rgba(139, 94, 60, 0.18);
    transition: all 0.4s ease;
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 18px 40px rgba(139, 94, 60, 0.3);
}

/* Icon */
.service-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 1.2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
}

/* Title & text */
.service-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    color: #8B5E3C;
    margin-bottom: 0.6rem;
}

.service-text {
    font-size: 0.95rem;
    color: #6b4226;
    line-height: 1.6;
}

/* =====================
   Mobile nhỏ (<=576px)
   ===================== */
@media (max-width: 576px) {
    .services-section {
        padding: 2.5rem 1.2rem;
        margin: 2rem 0.8rem;
        border-radius: 22px;
    }

    .services-header {
        margin-bottom: 2.2rem;
    }

    .services-title {
        font-size: 1.7rem;
    }

    .services-desc {
        font-size: 0.95rem;
        line-height: 1.7;
    }

    .title-divider::before,
    .title-divider::after {
        width: 40px;
    }

    .service-card {
        padding: 2rem 1.5rem;
        border-radius: 22px;
    }

    .service-icon {
        width: 60px;
        height: 60px;
        font-size: 24px;
        margin-bottom: 1rem;
    }

    .service-title {
        font-size: 1.05rem;
    }

    .service-text {
        font-size: 0.9rem;
    }
}

/* =====================
   Tablet (577px – 991px)
   ===================== */
@media (min-width: 577px) and (max-width: 991px) {
    .services-section {
        padding: 3rem 2rem;
    }

    .services-title {
        font-size: 2rem;
    }

    .service-card {
        padding: 2.2rem 1.8rem;
    }

    .service-icon {
        width: 66px;
        height: 66px;
        font-size: 28px;
    }
}

/* =====================
   Desktop lớn (>=1200px)
   ===================== */
@media (min-width: 1200px) {
    .services-section {
        padding: 4.5rem 3rem;
    }

    .services-title {
        font-size: 2.4rem;
    }
}
</style>
