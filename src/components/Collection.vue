<template>
    <section id="mau" class="collection-section">
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
                    <li v-for="(category, index) in categories" :key="index"
                        :class="{ active: selectedCategory === category.name }"
                        @click="selectedCategory = category.name">
                        {{ category.name }}
                    </li>
                </ul>
            </b-col>

            <!-- Collection -->
            <b-col md="9">
                <b-row>
                    <b-col v-for="(img, index) in filteredImages" :key="index" cols="12" sm="12" md="6" lg="4" class="mb-4">
                        <b-card :img-src="img" img-top class="custom-card h-100">
                            <div class="card-actions">
                                <b-button class="card-btn primary">Chọn mẫu</b-button>
                                <b-button class="card-btn outline">Xem chi tiết</b-button>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>

                <!-- Pagination -->
                <div class="pagination-wrapper" v-if="totalPages > 1">
                    <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
                        ‹
                    </button>

                    <button v-for="page in totalPages" :key="page"
                        :class="['page-btn', { active: currentPage === page }]" @click="currentPage = page">
                        {{ page }}
                    </button>

                    <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
                        ›
                    </button>
                </div>
            </b-col>
        </b-row>
    </section>
</template>


<script>
export default {
    name: "Collection",
    data() {
        return {
            selectedCategory: "KTS",
            currentPage: 1,
            perPage: 6, // 👈 số thiệp mỗi trang

            categories: [
                { name: "KTS" },
                { name: "THIỆP CHỮ NHẬT" },
                { name: "THIỆP ĐỨNG" },
                { name: "THIỆP STYLE HÀN QUỐC" },
                { name: "THIỆP GẤP 3" },
                { name: "THIỆP LUXURY" },
                { name: "THIỆP NHỰA TRONG" },
                { name: "THIỆP POP UP" },
                { name: "PHÔI THIỆP CƯỚI" },
                { name: "THIỆP CHÚC MỪNG" },
                { name: "BÌ LÌ XÌ" }
            ],

            images: {
                KTS: [
                    "https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7289-1757498382.webp",
                    "https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7289-1757498382.webp",
                    "https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7289-1757498382.webp",
                    "https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7289-1757498382.webp",
                    "https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7289-1757498382.webp",
                    "https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7289-1757498382.webp",
                    "https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7289-1757498382.webp",
                    "https://thiepcuoisieutoc.com/uploads/product/xl-astvan-7289-1757498382.webp",
                ]
            }
        }
    },

    computed: {
        filteredImages() {
            const imgs = this.images[this.selectedCategory] || []
            const start = (this.currentPage - 1) * this.perPage
            return imgs.slice(start, start + this.perPage)
        },

        totalPages() {
            const total = this.images[this.selectedCategory]?.length || 0
            return Math.ceil(total / this.perPage)
        }
    },

    watch: {
        selectedCategory() {
            this.currentPage = 1 // reset page khi đổi danh mục
        }
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto&display=swap');

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

/* Mobile */
@media (max-width: 768px) {
    .collection-title {
        font-size: 2rem;
    }
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

/* Mobile */
@media (max-width: 768px) {
    .collection-section {
        padding: 3rem 1.5rem;
    }

    .category-sidebar {
        margin-bottom: 2rem;
    }

    .category-list li:hover {
        transform: none;
    }
}


</style>
