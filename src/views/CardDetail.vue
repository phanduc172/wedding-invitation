    <template>
        <section class="card-detail-section" v-if="card">
            <b-container>
                <b-row align-v="center">
                    <!-- Image -->
                    <b-col md="6" class="mb-4">
                        <div class="card-image-wrapper">
                            <div class="detail-image-container">

                                <!-- Loading -->
                                <div v-if="imageLoading" class="detail-image-loading">
                                    <span class="image-spinner"></span>
                                    <span>Đang tải ảnh...</span>
                                </div>

                                <!-- Ảnh -->
                                <img v-if="imageSrc" :src="imageSrc" :key="imageSrc" alt="Thiệp cưới"
                                    class="detail-product-image" @load="imageLoaded" @error="imageError" />

                                <!-- Đang thử tải lại -->
                                <div v-if="imageRetrying" class="detail-image-retrying">
                                    <span class="image-spinner"></span>
                                    <span>
                                        Đang kết nối lại ảnh...
                                        <small>
                                            Lần {{ imageRetry }}/{{ maxImageRetry }}
                                        </small>
                                    </span>
                                </div>

                                <!-- Không thể tải -->
                                <div v-if="imageFailed" class="detail-image-error">
                                    <i class="bi bi-image"></i>

                                    <span>Không thể hiển thị ảnh</span>

                                    <button type="button" class="retry-image-btn" @click="manualRetryImage">
                                        <i class="bi bi-arrow-clockwise"></i>
                                        Thử lại
                                    </button>
                                </div>

                            </div>
                        </div>
                    </b-col>
                    <!-- Content -->
                    <b-col md="6">
                        <span class="detail-badge">MẪU THIỆP CƯỚI</span>

                        <h1 class="card-title">
                            {{ card.title }}
                        </h1>
                        <!-- PRICE -->
                        <div class="detail-price">
                            <span class="price-old" v-if="card.price && card.sale_price">
                                {{ formatPrice(card.price) }}đ
                            </span>

                            <span class="price-main">
                                {{ formatPrice(card.sale_price || card.price) }}đ / thiệp
                            </span>
                        </div>
                        <div class="title-divider">
                            <i class="bi bi-heart-fill"></i>
                        </div>

                        <p class="card-desc">
                            {{ card.desc }}
                        </p>

                        <ul class="card-info">
                            <li>🎨 Phong cách: <strong>{{ card.style }}</strong></li>
                            <li>📏 Kích thước: <strong>{{ card.size }}</strong></li>
                            <li>✍️ Chỉnh sửa nội dung: <strong>Miễn phí</strong></li>
                            <li>⏱ Thời gian in: <strong>3 – 7 ngày</strong></li>
                        </ul>

                        <div class="card-actions">
                            <b-button class="detail-btn primary" @click="$bvModal.show('contact-modal')">
                                💌 Chọn mẫu này
                            </b-button>

                            <b-button class="detail-btn outline" @click="$router.back()">
                                ← Quay lại
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
            <ContactModal :zalo="contact.zalo" :facebook="contact.facebook" :fanpage="contact.fanpage"
                :cardTitle="card.title" />
        </section>
    </template>

<script>
import productsData from "@/services/products.json"
import { formatPrice } from '../ultis/format'
import ContactModal from '@/components/ContactModal.vue'


export default {
    name: "CardDetail",
    metaInfo() {
        if (!this.card) return {}

        return {
            title: `${this.card.title} – Thiệp cưới cao cấp | Thiệp Cưới Minh Đức`,
            meta: [
                {
                    name: 'description',
                    content: this.card.desc
                },
                {
                    property: 'og:title',
                    content: this.card.title
                },
                {
                    property: 'og:description',
                    content: this.card.desc
                },
                {
                    property: 'og:image',
                    content: this.card.image
                },
                {
                    property: 'og:url',
                    content: `https://thiepcuoiminhduc.io.vn/thiep-cuoi/${this.$route.params.id}`
                }
            ],
            link: [
                {
                    rel: 'canonical',
                    href: `https://thiepcuoiminhduc.io.vn/thiep-cuoi/${this.$route.params.id}`
                }
            ]
        }
    },

    components: {
        ContactModal,
    },
    data() {
        return {
            card: null,

            contact: {
                zalo: 'https://zalo.me/0383181115',
                facebook: 'https://www.facebook.com/phanduc172',
                fanpage: 'https://www.facebook.com/thiepcuoiminhduc17'
            },

            // ==========================
            // IMAGE LOADING
            // ==========================
            // ==========================
            // IMAGE LOADING
            // ==========================
            imageSrc: '',
            imageLoading: true,
            imageRetrying: false,
            imageFailed: false,

            imageRetry: 0,
            maxImageRetry: 5,

            imageRetryTimer: null,

            // Các URL sẽ lần lượt được thử
            imageUrls: [],
            imageUrlIndex: 0
        }
    },
    methods: {
        formatPrice,

        driveToThumbnail(url, size = 1200) {
            if (!url) return ''

            const match =
                url.match(/\/d\/([^/]+)/) ||
                url.match(/[?&]id=([^&]+)/)

            if (!match) return url

            const fileId = match[1]

            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`
        },

        // ========================================
        // LẤY FILE ID GOOGLE DRIVE
        // ========================================
        getDriveFileId(url) {
            if (!url) return ''

            const match =
                url.match(/\/d\/([^/]+)/) ||
                url.match(/[?&]id=([^&]+)/)

            return match ? match[1] : ''
        },

        // ========================================
        // TẠO DANH SÁCH URL FALLBACK
        // ========================================
        createImageUrls(url) {
            if (!url) return []

            const fileId = this.getDriveFileId(url)

            if (!fileId) {
                return [url]
            }

            return [
                // Ảnh chính
                `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`,

                // Thử kích thước khác
                `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,

                `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`,

                // Fallback Google Drive
                `https://drive.google.com/uc?export=view&id=${fileId}`
            ]
        },

        // ========================================
        // KHỞI TẠO ẢNH
        // ========================================
        initImage(url) {

            clearTimeout(this.imageRetryTimer)

            this.imageRetry = 0
            this.imageUrlIndex = 0

            this.imageLoading = true
            this.imageRetrying = false
            this.imageFailed = false

            this.imageUrls = this.createImageUrls(url)

            if (!this.imageUrls.length) {
                this.imageLoading = false
                this.imageFailed = true
                return
            }

            this.imageSrc = this.imageUrls[0]
        },

        // ========================================
        // LOAD THÀNH CÔNG
        // ========================================
        imageLoaded() {

            clearTimeout(this.imageRetryTimer)

            this.imageLoading = false
            this.imageRetrying = false
            this.imageFailed = false

            this.imageRetry = 0

            console.log('✅ Ảnh tải thành công:', this.imageSrc)
        },

        // ========================================
        // LOAD LỖI
        // ========================================
        imageError() {

            console.warn(
                '❌ Không tải được ảnh:',
                this.imageSrc
            )

            this.imageLoading = false
            this.imageRetrying = true
            this.imageFailed = false

            // Nếu còn URL fallback
            if (this.imageUrlIndex < this.imageUrls.length - 1) {

                this.imageUrlIndex++

                const nextUrl =
                    this.imageUrls[this.imageUrlIndex]

                // Cho browser một khoảng thời gian
                // trước khi đổi URL
                clearTimeout(this.imageRetryTimer)

                this.imageRetryTimer = setTimeout(() => {

                    this.imageRetry++

                    this.imageSrc =
                        `${nextUrl}${nextUrl.includes('?') ? '&' : '?'}retry=${Date.now()}`

                }, 800)

                return
            }

            // ========================================
            // Đã thử hết URL → retry lại từ đầu
            // ========================================
            if (this.imageRetry < this.maxImageRetry) {

                this.imageRetry++

                const delay =
                    Math.min(
                        1000 * Math.pow(2, this.imageRetry - 1),
                        8000
                    )

                console.log(
                    `🔄 Retry ảnh lần ${this.imageRetry} sau ${delay}ms`
                )

                clearTimeout(this.imageRetryTimer)

                this.imageRetryTimer = setTimeout(() => {

                    this.imageUrlIndex = 0

                    const retryUrl =
                        this.imageUrls[0]

                    this.imageSrc =
                        `${retryUrl}&retry=${Date.now()}`

                }, delay)

                return
            }

            // ========================================
            // THỰC SỰ THẤT BẠI
            // ========================================
            this.imageRetrying = false
            this.imageFailed = true
            this.imageLoading = false

            console.error(
                '❌ Không thể tải ảnh sau nhiều lần thử'
            )
        },

        // ========================================
        // NGƯỜI DÙNG BẤM THỬ LẠI
        // ========================================
        manualRetryImage() {

            if (!this.card || !this.card.image) {
                return
            }

            this.initImage(this.card.image)
        }
    },
    watch: {
        card(val) {
            if (val && val.title) {
                document.title = `${val.title} – Thiệp Cưới Minh Đức`
            }
        }
    },
    created() {

        const id = this.$route.params.id

        const product = productsData.data.find(
            p => String(p.id) === String(id)
        )

        if (!product) {
            this.$router.replace("/")
            return
        }

        this.card = {
            title: product.title,
            image: product.thumbnail,
            desc: product.description ||
                "Mẫu thiệp cưới thiết kế tinh tế, sang trọng.",
            style: product.style ||
                "Thanh lịch – Hiện đại",
            size: product.size ||
                "12 x 18 cm",
            price: product.price,
            sale_price: product.sale_price
        }

        this.initImage(product.thumbnail)
    },

    beforeDestroy() {
        clearTimeout(this.imageRetryTimer)
    },


}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500&display=swap');

.card-detail-section {
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    border-radius: 32px;
    padding: 4rem 2rem;
    margin: 3rem 1rem;
    box-shadow: 0 12px 30px rgba(139, 94, 60, 0.15);
    font-family: 'Poppins', sans-serif;
    scroll-margin-top: 100px;
}

/* Image */
.card-image-wrapper {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 14px 36px rgba(139, 94, 60, 0.3);
}

.card-image-wrapper img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.card-image-wrapper:hover img {
    transform: scale(1.05);
}

/* Badge */
.detail-badge {
    display: inline-block;
    background: rgba(183, 110, 121, 0.18);
    color: #8B5E3C;
    padding: 6px 18px;
    border-radius: 30px;
    font-size: 12px;
    letter-spacing: 1.5px;
    font-weight: 600;
    margin-bottom: 12px;
}

/* Title */
.card-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: #8B5E3C;
    margin-bottom: 0.6rem;
}

/* Divider */
.title-divider {
    display: flex;
    align-items: center;
    margin: 14px 0;
    color: #b76e79;
}

.title-divider::after {
    content: "";
    width: 80px;
    height: 1px;
    background: rgba(183, 110, 121, 0.4);
    margin-left: 10px;
}

/* Description */
.card-desc {
    font-size: 1rem;
    color: #6b4226;
    line-height: 1.8;
    margin-bottom: 1.2rem;
}

/* Info list */
.card-info {
    list-style: none;
    padding: 0;
    margin-bottom: 2rem;
}

.card-info li {
    font-size: 15px;
    color: #6b4226;
    margin-bottom: 0.5rem;
}

/* Actions */
.card-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
}

.detail-btn {
    padding: 0.7rem 2rem;
    border-radius: 30px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
}

/* Primary */
.detail-btn.primary {
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    color: #fff;
    border: none;
}

.detail-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(183, 110, 121, 0.35);
}

/* Outline */
.detail-btn.outline {
    border: 2px solid #b76e79;
    background: transparent;
    color: #8B5E3C;
}

.detail-btn.outline:hover {
    background: rgba(183, 110, 121, 0.15);
}

/* PRICE */
.detail-price {
    margin: 0.8rem 0 1.2rem;
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
}

.price-old {
    font-size: 1rem;
    color: #b8a08f;
    text-decoration: line-through;
}

.price-sale {
    font-size: 1.6rem;
    font-weight: 700;
    color: #b76e79;
    font-family: 'Playfair Display', serif;
}

.price-sale small {
    font-size: 0.85rem;
    font-weight: 400;
    color: #8B5E3C;
}

.detail-price {
    margin: 1.2rem 0 1.8rem;
}

.price-old {
    text-decoration: line-through;
    color: #b8a59a;
    font-size: 1.2rem;
    margin-right: 10px;
}

.price-main,
.price-sale {
    font-size: 1.5rem;
    font-weight: 700;
    color: #b76e79;
}

.price-sale small {
    font-size: 0.9rem;
    color: #8B5E3C;
}

/* ========================================
   DETAIL IMAGE LOADING
======================================== */

.detail-image-container {
    position: relative;
    width: 100%;
    min-height: 300px;
    overflow: hidden;
    border-radius: 24px;
    background: #f8f3ef;
}

.detail-product-image {
    width: 100%;
    height: auto;
    display: block;
}

/* Loading */
/* ========================================
   DETAIL IMAGE
======================================== */

.card-image-wrapper {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 14px 36px rgba(139, 94, 60, 0.3);
}

.detail-image-container {
    position: relative;
    width: 100%;
    min-height: 300px;

    overflow: hidden;

    border-radius: 24px;

    background: #f8f3ef;
}

/* ========================================
   IMAGE
======================================== */

.detail-product-image {
    position: relative;
    z-index: 1;

    display: block;

    width: 100%;
    height: auto;

    min-height: 200px;

    object-fit: cover;

    transition: opacity 0.3s ease,
        transform 0.5s ease;
}

.card-image-wrapper:hover .detail-product-image {
    transform: scale(1.03);
}

/* ========================================
   LOADING
======================================== */

/* ========================================
   RETRYING
======================================== */

.detail-image-retrying {
    position: absolute;

    inset: 0;

    z-index: 20;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 10px;

    background: rgba(248, 243, 239, 0.94);

    color: #8B5E3C;

    font-size: 14px;

    text-align: center;
}

.detail-image-retrying small {
    display: block;

    margin-top: 4px;

    font-size: 11px;

    opacity: 0.7;
}

/* ========================================
   SPINNER
======================================== */

.image-spinner {
    width: 36px;
    height: 36px;

    border: 3px solid rgba(183, 110, 121, 0.2);

    border-top-color: #b76e79;

    border-radius: 50%;

    animation: detailImageSpin 0.8s linear infinite;
}

@keyframes detailImageSpin {
    to {
        transform: rotate(360deg);
    }
}

/* ========================================
   ERROR
======================================== */

.detail-image-error {
    position: absolute;

    inset: 0;

    z-index: 30;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 10px;

    background: #f8f3ef;

    color: #8B5E3C;

    font-size: 14px;

    text-align: center;
}

.detail-image-error>i {
    font-size: 40px;

    color: #b76e79;
}

/* ========================================
   RETRY BUTTON
======================================== */

.retry-image-btn {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    gap: 6px;

    border: 0;

    border-radius: 20px;

    padding: 7px 16px;

    background: linear-gradient(135deg,
            #b76e79,
            #8B5E3C);

    color: #fff;

    font-size: 13px;
    font-weight: 500;

    cursor: pointer;

    transition: all 0.25s ease;
}

.retry-image-btn:hover {
    transform: translateY(-2px);

    box-shadow:
        0 6px 15px rgba(183, 110, 121, 0.3);
}

.detail-image-loading {
    position: absolute;
    inset: 0;
    z-index: 5;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 10px;

    background: #f8f3ef;
    color: #8B5E3C;

    font-size: 14px;
}

/* Spinner */

.image-spinner {
    width: 36px;
    height: 36px;

    border: 3px solid rgba(183, 110, 121, 0.2);
    border-top-color: #b76e79;

    border-radius: 50%;

    animation: detailImageSpin 0.8s linear infinite;
}

@keyframes detailImageSpin {
    to {
        transform: rotate(360deg);
    }
}

/* Error */

.detail-image-error {
    position: absolute;
    inset: 0;
    z-index: 6;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 8px;

    background: #f8f3ef;
    color: #8B5E3C;

    font-size: 14px;
}

.detail-image-error i {
    font-size: 34px;
    color: #b76e79;
}

/* Mobile */
@media (max-width: 576px) {
    .card-detail-section {
        padding: 2.5rem 1.2rem;
        border-radius: 20px;
        margin: 2.5rem 0.8rem;
    }

    .card-image-wrapper {
        border-radius: 18px;
        box-shadow: 0 10px 24px rgba(139, 94, 60, 0.25);
    }

    .detail-badge {
        font-size: 11px;
        padding: 5px 14px;
        margin-bottom: 10px;
    }

    .card-title {
        font-size: 1.6rem;
        text-align: center;
    }

    .detail-price {
        justify-content: center;
        margin: 1rem 0;
    }

    .price-old {
        font-size: 1rem;
    }

    .price-main {
        font-size: 1.35rem;
    }

    .card-desc {
        font-size: 0.95rem;
        line-height: 1.7;
        text-align: center;
    }

    .card-info {
        font-size: 14px;
        margin-bottom: 1.6rem;
    }

    .card-info li {
        text-align: center;
    }

    .card-actions {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
    }

    .detail-btn {
        width: 100%;
        text-align: center;
        padding: 0.8rem 1rem;
    }
}

@media (max-width: 992px) {
    .card-detail-section {
        padding: 3.5rem 2rem;
    }

    .card-title {
        font-size: 1.9rem;
    }

    .detail-price {
        gap: 10px;
    }

    .price-main {
        font-size: 1.45rem;
    }

    .card-actions {
        justify-content: flex-start;
    }
}

@media (max-width: 992px) {
    @media (max-width: 992px) {
        .card-detail-section {
            padding: 3.5rem 2rem;
        }

        .card-title {
            font-size: 1.9rem;
        }

        .detail-price {
            gap: 10px;
        }

        .price-main {
            font-size: 1.45rem;
        }

        .card-actions {
            justify-content: flex-start;
        }
    }

}
</style>
