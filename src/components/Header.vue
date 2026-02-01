<template>
    <header class="custom-header py-2 border-bottom">
        <div class="header-inner d-flex justify-content-between align-items-center">

            <!-- Bên trái: Hotline -->
            <div class="contact-info ml-4">
                <a href="tel:0383181115" class="hotline-card d-flex align-items-center">
                    <span class="hotline-icon-wrap">
                        <i class="bi bi-telephone-fill"></i>
                    </span>
                    <div class="hotline-text">
                        <small>Hotline tư vấn</small>
                        <strong>0383 181 115</strong>
                    </div>
                </a>
            </div>



            <!-- Ở giữa: Tên thương hiệu -->
            <div class="brand-name text-center">
                Thiệp Cưới Minh Đức
            </div>

            <!-- Bên phải: Liên hệ mạng xã hội -->
            <div class="social-icons mr-4 d-flex align-items-center">
                <a href="https://fb.com/thiepcuoiminhduc17" target="_blank" class="social-btn facebook ">
                    <i class="bi bi-facebook"></i>
                </a>
                <!-- Zalo -->
                <a href="https://zalo.me/0383181115" target="_blank" class="social-btn zalo" aria-label="Zalo">
                    <img src="/images/zalo.png" alt="Zalo" />
                </a>
                <!-- <a href="#" target="_blank" class="social-btn instagram">
                    <i class="bi bi-instagram"></i>
                </a>

                <a href="#" target="_blank" class="social-btn youtube">
                    <i class="bi bi-youtube"></i>
                </a>

                <a href="#" target="_blank" class="social-btn pinterest">
                    <i class="bi bi-pinterest"></i>
                </a> -->
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600&display=swap');

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.custom-header {
    background: linear-gradient(to right, #fff, #fdf6f0);
    font-size: 16px;
}

.contact-info {
    font-size: 18px;
    font-weight: 500;
    color: #6b4226;
}


.hotline-number:hover {
    color: #b76e79;
}

.brand-name {
    font-family: 'Great Vibes', cursive;
    font-size: 36px;
    color: #8B5E3C;
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(139, 94, 60, 0.2);
}

.social-icons a {
    font-size: 28px;
    margin: 0 8px;
    color: #6b4226;
    transition: transform 0.3s ease, color 0.3s ease;
}

.social-icons a:hover {
    color: #b76e79;
    transform: scale(1.2);
}

.social-btn.zalo img {
    width: 22px;
    height: 22px;
}

/* Hover chung */
.social-btn:hover {
    transform: translateY(-3px) scale(1.08);
    box-shadow: 0 10px 24px rgba(183, 110, 121, 0.35);
    transform: translateY(-3px) scale(1.05);
    color: #fff;
}

/* Hover Zalo */
.social-btn.zalo:hover {
    box-shadow: 0 0 0 6px rgba(0, 104, 255, 0.15);
}

/* 🔹 Khi màn hình nhỏ (dưới 768px) chỉ hiển thị brand-name */
@media (max-width: 768px) {

    .contact-info,
    .social-icons {
        display: none !important;
    }

    .brand-name {
        margin: 0 auto;
        font-size: 28px;
        /* nhỏ hơn chút để gọn */
    }
}

.contact-info {
    display: flex;
    align-items: center;
}

/* Card hotline */
.hotline-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px 8px 10px;
    border-radius: 40px;
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    box-shadow: 0 4px 12px rgba(139, 94, 60, 0.15);
    text-decoration: none;
    transition: all 0.35s ease;
}

/* Hover */
.hotline-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(183, 110, 121, 0.25);
}

/* Icon */
.hotline-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
}

.hotline-icon-wrap i {
    font-size: 18px;
}

/* Text */
.hotline-text small {
    display: block;
    font-size: 12px;
    color: #8B5E3C;
    letter-spacing: 0.5px;
}

.hotline-text strong {
    font-size: 18px;
    color: #6b4226;
    font-weight: 600;
}

/* Pulse animation */
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(183, 110, 121, 0.6);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(183, 110, 121, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(183, 110, 121, 0);
    }
}

.social-icons {
    gap: 12px;
}

/* Nút icon chung */
.social-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b4226;
    font-size: 20px;
    box-shadow: 0 4px 12px rgba(139, 94, 60, 0.15);
    transition: all 0.35s ease;
    text-decoration: none;
}


/* Màu riêng từng mạng (hover) */
.social-btn.facebook:hover {
    background: linear-gradient(135deg, #1877f2, #145dbf);
}

.social-btn.instagram:hover {
    background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af);
}

.social-btn.youtube:hover {
    background: linear-gradient(135deg, #ff0000, #cc0000);
}

.social-btn.pinterest:hover {
    background: linear-gradient(135deg, #bd081c, #8c0615);
}

@media (max-width: 768px) {
    .header-inner {
        flex-direction: column;
        gap: 10px;
    }

    .brand-name {
        font-size: 26px;
        margin: 4px 0;
        text-align: center;
    }

    .contact-info {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .hotline-card {
        width: 90%;
        max-width: 360px;
        justify-content: center;
        padding: 10px 14px;
    }

    .social-icons {
        display: none !important;
    }

    .custom-header {
        position: sticky;
        top: 0;
        z-index: 1000;
    }
}


@media (max-width: 991px) {
    .social-icons {
        display: none;
    }

    .brand-name {
        font-size: 30px;
    }
}
</style>
