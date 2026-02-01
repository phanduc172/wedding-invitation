<template>
    <section id="mau" class="collection-section">
        <b-container fluid="lg">
            <div class="collection-header text-center">
                <span class="section-badge">BỘ SƯU TẬP NỔI BẬT</span>

                <h2 class="collection-title">
                    Danh mục <span>thiệp cưới</span>
                </h2>

                <div class="title-divider">
                    <i class="bi bi-heart-fill"></i>
                </div>

                <p class="collection-desc">
                    Chọn phong cách bạn yêu thích — khám phá những mẫu thiệp cưới tinh tế,
                    được thiết kế dành riêng cho ngày trọng đại.
                </p>
            </div>


            <b-row>
                <!-- Sidebar -->
                <b-col md="3" class="category-sidebar">
                    <ul class="category-list list-unstyled">
                        <li v-for="(category, index) in categories" :key="category.id"
                            :class="{ active: selectedCategory === category.id }" @click="selectCategory(category.id)">
                            {{ index + 1 }}. {{ category.name }}
                        </li>
                    </ul>
                </b-col>

                <!-- Collection -->
                <b-col md="9" ref="productSection">
                    <b-row v-if="filteredProducts.length">
                        <b-col v-for="(product, index) in filteredProducts" :key="product.id || index" cols="6" sm="6"
                            md="6" lg="4" xl="3" class="py-1 py-sm-2">
                            <b-card :img-src="driveToThumbnail(product.thumbnail, 1000)" img-top
                                class="custom-card h-100 text-center">
                                <!-- BADGE CODE -->
                                <span class="card-badge" v-if="product.code">
                                    {{ product.code }}
                                </span>

                                <!-- TITLE -->
                                <h6 class="card-title mt-3">
                                    {{ product.title }}
                                </h6>

                                <div class="price-box center">
                                    <span v-if="product.sale_price && product.sale_price < product.price"
                                        class="price-old">
                                        {{ formatPrice(product.price) }}đ
                                    </span>

                                    <span class="price-sale">
                                        {{ formatPrice(product.sale_price || product.price) }}đ
                                        <small>/ thiệp</small>
                                    </span>
                                </div>

                                <!-- ACTION -->
                                <div class="card-actions mt-3">
                                    <b-button class="card-btn primary"
                                        @click="$router.push({ name: 'CardDetail', params: { id: product.id } })">
                                        Xem chi tiết
                                    </b-button>
                                </div>
                            </b-card>
                        </b-col>
                    </b-row>
                    <!-- Không có sản phẩm -->
                    <div v-else class="empty-state text-center">
                        <i class="bi bi-box-seam empty-icon"></i>
                        <h5>Không có sản phẩm</h5>
                        <p>Danh mục này hiện chưa có mẫu thiệp nào.</p>

                    </div>
                    <div class="text-center mt-4" v-if="limit">
                        <b-button class="card-btn primary" :to="{ name: 'Collection' }">
                            Xem tất cả thiệp cưới →
                        </b-button>
                    </div>

                    <!-- Pagination -->
                    <div class="pagination-wrapper" v-if="!limit && totalPages > 1">
                        <!-- Prev -->
                        <button class="page-btn" :disabled="currentPage === 1" @click="goPage(currentPage - 1)">
                            ‹
                        </button>

                        <!-- First -->
                        <button v-if="pages[0] !== 1" class="page-btn" @click="goPage(1)">
                            1
                        </button>

                        <span v-if="pages[0] > 2" class="page-ellipsis">…</span>

                        <!-- Pages -->
                        <button v-for="page in pages" :key="page"
                            :class="['page-btn', { active: currentPage === page }]" @click="goPage(page)">
                            {{ page }}
                        </button>

                        <span v-if="pages[pages.length - 1] < totalPages - 1" class="page-ellipsis">…</span>

                        <!-- Last -->
                        <button v-if="pages[pages.length - 1] !== totalPages" class="page-btn"
                            @click="goPage(totalPages)">
                            {{ totalPages }}
                        </button>

                        <!-- Next -->
                        <button class="page-btn" :disabled="currentPage === totalPages"
                            @click="goPage(currentPage + 1)">
                            ›
                        </button>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>


<script>
import productsData from "@/services/products.json"
import categoriesData from "@/services/categories.json"
import { formatPrice } from '@/ultis/format'


export default {
    name: "Collection",

    data() {
        return {
            products: [],
            categories: [],
            selectedCategory: null,
            currentPage: 1,
            perPage: 12
        }
    },

    props: {
        limit: {
            type: Number,
            default: null // null = không giới hạn (trang /collection)
        }
    },

    computed: {
        pages() {
            const range = 1 // số trang trước & sau current
            const start = Math.max(1, this.currentPage - range)
            const end = Math.min(this.totalPages, this.currentPage + range)

            const pages = []
            for (let i = start; i <= end; i++) {
                pages.push(i)
            }
            return pages
        },
        filteredProducts() {
            let list = this.products

            if (this.selectedCategory !== null) {
                list = list.filter(
                    p => Number(p.category_id) === Number(this.selectedCategory)
                )
            }

            // 👉 TRANG HOME: chỉ lấy limit sản phẩm
            if (this.limit) {
                return list.slice(0, this.limit)
            }

            // 👉 TRANG /collection: phân trang bình thường
            const start = (this.currentPage - 1) * this.perPage
            return list.slice(start, start + this.perPage)
        },

        totalPages() {
            if (this.limit) return 1

            const total = this.selectedCategory !== null
                ? this.products.filter(
                    p => Number(p.category_id) === Number(this.selectedCategory)
                ).length
                : this.products.length

            return Math.ceil(total / this.perPage)
        },

        productsWithImages() {
            return this.products.map(p => ({
                ...p,
                thumbnail_fixed: this.driveToThumbnail(p.thumbnail, 1000)
            }))
        }
    },

    watch: {
        selectedCategory() {
            this.currentPage = 1
        }
    },

    methods: {
        formatPrice,
        selectCategory(id) {
            this.selectedCategory = id
            this.currentPage = 1
        },
        goPage(page) {
            if (page < 1 || page > this.totalPages) return

            this.currentPage = page

            this.$nextTick(() => {
                const el = this.$refs.productSection
                if (!el) return

                const y =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    20 // offset nhẹ cho đẹp

                window.scrollTo({
                    top: y,
                    behavior: "smooth"
                })
            })
        },

        driveToThumbnail(url, size = 1000) {
            if (!url) return ''

            // bắt cả 2 dạng: /d/ID và id=ID
            const match =
                url.match(/\/d\/([^/]+)/) ||
                url.match(/id=([^&]+)/)

            if (!match) return url

            const fileId = match[1]
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`
        }

    },


    created() {
        this.products = productsData.data
        this.categories = categoriesData.data

        // chọn category đầu tiên
        this.selectedCategory = this.categories[0]?.id ?? null
    }

}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto&display=swap');

/* CARD */
.custom-card {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

.custom-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(139, 94, 60, 0.3);
}

/* IMAGE */
.custom-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

/* BADGE */
.card-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* TITLE */
.card-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    color: #8B5E3C;
    line-height: 1.4;
}

/* PRICE */
.price-box {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    column-gap: 14px;
    margin-top: 6px;
    margin-bottom: 4px;
}

/* Giá cũ */
.price-old {
    font-size: 16px !important;
    color: #b5a197;
    text-decoration: line-through;
    white-space: nowrap;
}

/* Giá sale */
.price-sale {
    font-size: 22px !important;
    font-weight: 700;
    color: #b76e79;
    white-space: nowrap;
}

.price-sale small {
    font-size: 15px !important;
    font-weight: 400;
    color: #8B5E3C;
}

/* ACTION */
.card-actions {
    margin-top: auto;
}

.card-btn.primary {
    width: 30%;
    border-radius: 30px;
    padding: 0.6rem 1rem;
    font-size: 14px;
    font-weight: 600;
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    border: none;
    color: #fff;
}

.card-btn.primary:hover {
    box-shadow: 0 8px 18px rgba(183, 110, 121, 0.45);
    transform: translateY(-2px);
}

.collection-section {
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    border-radius: 32px;
    padding: 4rem 2.5rem;
    margin: 3rem 1rem;
    box-shadow: 0 12px 30px rgba(139, 94, 60, 0.15);
}

.collection-header {
    max-width: 720px;
    margin: 0 auto 3rem;
}

/* Badge */
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

/* Title */
.collection-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem;
    color: #8B5E3C;
    margin-bottom: 0.6rem;
    line-height: 1.2;
}

.collection-title span {
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

.title-divider i {
    font-size: 14px;
}

/* Description */
.collection-desc {
    font-size: 1.05rem;
    color: #6b4226;
    line-height: 1.8;
}


/* Sidebar */
.category-sidebar {
    padding-right: 1.5rem;
}

.category-list li {
    background: #fff;
    margin-bottom: 10px;
    padding: 12px 18px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 14px;
    color: #6b4226;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(139, 94, 60, 0.12);
    transition: all 0.35s ease;
}

.category-list li:hover {
    transform: translateX(6px);
    color: #b76e79;
}

.category-list li.active {
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    color: #fff;
    font-weight: 600;
}

/* Card */
.custom-card {
    border: none;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 10px 26px rgba(139, 94, 60, 0.18);
    transition: all 0.4s ease;

}

.custom-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(139, 94, 60, 0.3);
}

.custom-card img {
    height: 200px;
    object-fit: cover;
}

/* Card text */
.card-desc {
    font-size: 14px;
    color: #6b4226;
}

/* Card actions */
.card-actions {
    display: flex;
    gap: 10px;
    margin-top: 1rem;
}

/* Buttons */
.card-btn {
    flex: 1;
    padding: 0.6rem 1rem;
    border-radius: 30px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
}

/* Primary */
.card-btn.primary {
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    color: #fff;
    border: none;
}

.card-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(183, 110, 121, 0.35);
}

/* Outline */
.card-btn.outline {
    border: 2px solid #b76e79;
    background: transparent;
    color: #8B5E3C;
}

.card-btn.outline:hover {
    background: rgba(183, 110, 121, 0.15);
}

/* Pagination */
.pagination-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 2rem;
}

.page-btn {
    min-width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1.5px solid #e7d6c9;
    background: #fff;
    color: #8B5E3C;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
    background: #b76e79;
    color: #fff;
    border-color: #b76e79;
}

.page-btn.active {
    background: #b76e79;
    color: #fff;
    border-color: #b76e79;
    box-shadow: 0 4px 10px rgba(183, 110, 121, 0.35);
}

.page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.empty-state {
    padding: 3rem 1rem;
    color: #8B5E3C;
}

.empty-icon {
    font-size: 48px;
    color: #b76e79;
    margin-bottom: 12px;
}

.empty-state h5 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
}

.empty-state p {
    font-size: 14px;
    opacity: 0.8;
}

.pagination-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    /* 👈 không tràn mobile */
    margin-top: 2rem;
}

.page-btn {
    min-width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    background: #fff;
    color: #8B5E3C;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.page-btn:hover:not(:disabled) {
    background: #b76e79;
    color: #fff;
}

.page-btn.active {
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    color: #fff;
}

.page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.page-ellipsis {
    padding: 0 6px;
    color: #8B5E3C;
    font-weight: 600;
}

.price-box {
    margin: 6px 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.price-old {
    font-size: 13px;
    color: #999;
    text-decoration: line-through;
}

.price-sale {
    font-size: 16px;
    font-weight: 700;
    color: #b76e79;
    /* hồng nâu sang */
}

.price-sale small {
    font-size: 12px;
    font-weight: 400;
    color: #6b4226;
}

/* Mobile */
@media (max-width: 576px) {
    .card-body {
        padding: 0.5rem;
    }

    .card-title {
        font-size: 18px;
        margin: 0 !important;
    }

    .custom-card {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
    }

    /* Giá hiển thị gọn theo cột */
    .price-box {
        display: grid;
        grid-auto-flow: row;
        row-gap: 4px;
        margin: 0;
        text-align: center;
    }

    /* Button không phá width cột */
    .card-actions {
        display: flex;
        justify-content: center;
    }

    .card-btn.primary {
        width: 100%;
        max-width: 100%;
        padding: 6px 10px;
        font-size: 13px;
        box-sizing: border-box;
    }

    /* Card khóa chiều ngang – CHỐNG TRÀN */
    .custom-card {
        width: 100%;
        max-width: 100%;
        border: none;
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 10px 26px rgba(139, 94, 60, 0.18);
        transition: transform 0.3s ease;
    }

    /* Ảnh KHÔNG BAO GIỜ tràn */
    .custom-card img {
        width: 100%;
        height: 100px;
        object-fit: cover;
        display: block;
    }

    .collection-section {
        padding: 1rem 0rem !important;
    }

    .price-sale {
        font-size: 18px !important;
        font-weight: 700;
        color: #b76e79;
        white-space: nowrap;
    }
}

/* ===============================
   CATEGORY SCROLL NGANG - MOBILE
================================ */
@media (max-width: 768px) {

    .category-sidebar {
        padding-right: 0;
        margin-bottom: 10px;
    }

    .category-list {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        /* BẮT BUỘC */
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;

        gap: 10px;
        padding: 8px 6px;

        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
    }

    /* Ẩn thanh scrollbar */
    .category-list::-webkit-scrollbar {
        display: none;
    }

    .category-list li {
        flex-shrink: 0;
        /* KHÔNG BỊ CO */
        margin-bottom: 0;
        padding: 10px 16px;
        font-size: 13px;
        border-radius: 999px;
        white-space: nowrap;
    }

    .category-list li:hover {
        transform: none;
    }
}

@media (max-width: 992px) {
    .card-btn.primary {
        width: 70%;
    }

}
</style>
