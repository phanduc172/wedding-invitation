<template>
    <section class="catalogue-page">

        <!-- =========================
             HEADER
        ========================== -->
        <div class="catalogue-header">

            <div class="header-badge">
                BỘ SƯU TẬP THIỆP CƯỚI
            </div>

            <h1>
                Catalogue <span>Thiệp Cưới</span>
            </h1>

            <p>
                Khám phá các mẫu thiệp cưới mới nhất của
                Thiệp Cưới Minh Đức.
                Chọn mẫu bạn yêu thích để xem chi tiết.
            </p>

        </div>


        <!-- =========================
             CATEGORY
        ========================== -->
        <div class="category-wrapper">

            <div class="category-scroll">

                <button class="category-item" :class="{ active: selectedCategory === null }"
                    @click="selectCategory(null)">
                    Tất cả
                </button>

                <button v-for="category in categories" :key="category.id" class="category-item" :class="{
                    active: selectedCategory === category.id
                }" @click="selectCategory(category)">
                    {{ category.name }}
                </button>

            </div>

        </div>


        <!-- =========================
             TOOLBAR
        ========================== -->
        <div class="catalogue-toolbar">

            <div class="result-count">

                <strong>{{ filteredTotal }}</strong>

                <span>
                    mẫu thiệp
                </span>

            </div>


            <div class="toolbar-right">

                <!-- SEARCH -->
                <div class="search-box">

                    <i class="bi bi-search"></i>

                    <input v-model="search" type="text" placeholder="Tìm mẫu thiệp...">

                    <button v-if="search" @click="search = ''">
                        ×
                    </button>

                </div>


                <!-- SORT -->
                <select v-model="sortBy" class="sort-select">
                    <option value="newest">
                        Mới nhất
                    </option>

                    <option value="priceAsc">
                        Giá thấp → cao
                    </option>

                    <option value="priceDesc">
                        Giá cao → thấp
                    </option>

                    <option value="name">
                        Tên A → Z
                    </option>
                </select>

            </div>

        </div>


        <!-- =========================
             PRODUCTS
        ========================== -->
        <div v-if="paginatedProducts.length" class="product-grid">

            <article v-for="product in paginatedProducts" :key="product.id" class="product-card">

                <!-- IMAGE -->
                <div class="product-image-wrapper">

                    <!-- Loading -->
                    <div v-if="isImageLoading(product)" class="image-loading">
                        <span></span>
                    </div>


                    <img :src="getImageSrc(product)" :alt="product.title" class="product-image" loading="lazy"
                        @load="imageLoaded(product)" @error="imageError(product)">


                    <!-- CODE -->
                    <span v-if="product.code" class="product-code">
                        {{ product.code }}
                    </span>


                    <!-- SALE -->
                    <span v-if="isSale(product)" class="sale-badge">
                        SALE
                    </span>

                </div>


                <!-- CONTENT -->
                <div class="product-content">

                    <h2>
                        {{ product.title }}
                    </h2>


                    <!-- PRICE -->
                    <div class="price-area">

                        <span v-if="isSale(product)" class="old-price">
                            {{ formatPrice(product.price) }}đ
                        </span>

                        <span class="current-price">

                            {{ formatPrice(
                                product.sale_price || product.price
                            ) }}đ

                            <small>
                                / thiệp
                            </small>

                        </span>

                    </div>


                    <!-- DESCRIPTION -->
                    <p v-if="product.description" class="product-description">
                        {{ product.description }}
                    </p>

                    <p v-else class="product-description">
                        Mẫu thiệp cưới thiết kế tinh tế,
                        phù hợp nhiều phong cách.
                    </p>


                    <!-- NOTE -->
                    <div class="product-note">

                        <i class="bi bi-info-circle"></i>

                        Giá có thể thay đổi theo số lượng
                        và chất liệu. Liên hệ để được tư vấn.

                    </div>


                    <!-- BUTTON -->
                    <button class="detail-button" @click="viewProduct(product)">
                        <span>
                            Xem mẫu
                        </span>

                        <i class="bi bi-arrow-right"></i>
                    </button>

                </div>

            </article>

        </div>


        <!-- =========================
             EMPTY
        ========================== -->
        <div v-else class="empty-state">

            <div class="empty-icon">
                <i class="bi bi-search"></i>
            </div>

            <h3>
                Không tìm thấy mẫu thiệp
            </h3>

            <p>
                Hãy thử tìm kiếm bằng tên khác
                hoặc chọn danh mục khác.
            </p>

            <button @click="resetFilter" class="reset-button">
                Xem tất cả mẫu
            </button>

        </div>


        <!-- =========================
             PAGINATION
        ========================== -->
        <div v-if="totalPages > 1" class="catalogue-pagination">

            <button class="page-button" :disabled="currentPage === 1" @click="goPage(currentPage - 1)">
                ‹
            </button>


            <button v-if="pages[0] > 1" class="page-button" @click="goPage(1)">
                1
            </button>


            <span v-if="pages[0] > 2" class="page-dots">
                …
            </span>


            <button v-for="page in pages" :key="page" class="page-button" :class="{
                active: currentPage === page
            }" @click="goPage(page)">
                {{ page }}
            </button>


            <span v-if="
                pages[pages.length - 1]
                < totalPages - 1
            " class="page-dots">
                …
            </span>


            <button v-if="
                pages[pages.length - 1]
                !== totalPages
            " class="page-button" @click="goPage(totalPages)">
                {{ totalPages }}
            </button>


            <button class="page-button" :disabled="currentPage === totalPages" @click="goPage(currentPage + 1)">
                ›
            </button>

        </div>


        <!-- =========================
             FOOTER CTA
        ========================== -->
        <div class="catalogue-contact">

            <div>

                <span class="contact-label">
                    CHƯA CHỌN ĐƯỢC MẪU?
                </span>

                <h3>
                    Liên hệ Minh Đức để được tư vấn
                </h3>

                <p>
                    Gửi yêu cầu, số lượng và phong cách
                    bạn mong muốn. Chúng tôi sẽ tư vấn
                    mẫu phù hợp.
                </p>

            </div>


            <div class="contact-actions">

                <a href="tel:0383181115" class="contact-button primary">
                    <i class="bi bi-telephone-fill"></i>
                    Gọi ngay
                </a>

                <a href="https://zalo.me/0383181115" target="_blank" class="contact-button">
                    Zalo
                </a>

            </div>

        </div>

    </section>
</template>


<script>

import productsData from "@/services/products.json"
import categoriesData from "@/services/categories.json"
import { formatPrice } from "@/ultis/format"


export default {

    name: "Catalogue",


    data() {

        return {

            products: [],

            categories: [],

            selectedCategory: null,

            search: "",

            sortBy: "newest",

            currentPage: 1,

            perPage: 12,


            // =====================
            // IMAGE SYSTEM
            // =====================

            imageStates: {},

            maxImageRetry: 4

        }

    },


    computed: {

        /*
        |--------------------------------------------------------------------------
        | CATEGORY PRODUCTS
        |--------------------------------------------------------------------------
        */

        filteredProducts() {

            let list = [...this.products]


            // CATEGORY
            if (this.selectedCategory !== null) {

                list = list.filter(product =>
                    Number(product.category_id)
                    === Number(this.selectedCategory)
                )

            }


            // SEARCH
            if (this.search.trim()) {

                const keyword =
                    this.search
                        .trim()
                        .toLowerCase()

                list = list.filter(product => {

                    const title =
                        String(product.title || "")
                            .toLowerCase()

                    const code =
                        String(product.code || "")
                            .toLowerCase()

                    return (
                        title.includes(keyword)
                        || code.includes(keyword)
                    )

                })

            }


            // SORT
            if (this.sortBy === "priceAsc") {

                list.sort((a, b) => {

                    return (
                        Number(
                            a.sale_price || a.price || 0
                        )
                        -
                        Number(
                            b.sale_price || b.price || 0
                        )
                    )

                })

            }


            if (this.sortBy === "priceDesc") {

                list.sort((a, b) => {

                    return (
                        Number(
                            b.sale_price || b.price || 0
                        )
                        -
                        Number(
                            a.sale_price || a.price || 0
                        )
                    )

                })

            }


            if (this.sortBy === "name") {

                list.sort((a, b) =>
                    String(a.title || "")
                        .localeCompare(
                            String(b.title || ""),
                            "vi"
                        )
                )

            }


            return list

        },


        /*
        |--------------------------------------------------------------------------
        | TOTAL
        |--------------------------------------------------------------------------
        */

        filteredTotal() {

            return this.filteredProducts.length

        },


        /*
        |--------------------------------------------------------------------------
        | TOTAL PAGES
        |--------------------------------------------------------------------------
        */

        totalPages() {

            return Math.ceil(
                this.filteredProducts.length
                / this.perPage
            )

        },


        /*
        |--------------------------------------------------------------------------
        | CURRENT PAGE
        |--------------------------------------------------------------------------
        */

        paginatedProducts() {

            const start =
                (this.currentPage - 1)
                * this.perPage

            return this.filteredProducts.slice(
                start,
                start + this.perPage
            )

        },


        /*
        |--------------------------------------------------------------------------
        | PAGINATION
        |--------------------------------------------------------------------------
        */

        pages() {

            const range = 2

            const start =
                Math.max(
                    1,
                    this.currentPage - range
                )

            const end =
                Math.min(
                    this.totalPages,
                    this.currentPage + range
                )

            const pages = []

            for (
                let i = start;
                i <= end;
                i++
            ) {

                pages.push(i)

            }

            return pages

        }

    },


    watch: {

        search() {

            this.currentPage = 1

        },


        sortBy() {

            this.currentPage = 1

        },


        "$route.params.slug": {

            immediate: true,

            handler(slug) {

                if (!this.categories.length) {
                    return
                }

                this.setCategoryFromSlug(slug)

            }

        }

    },


    methods: {

        formatPrice,


        /*
        |--------------------------------------------------------------------------
        | CATEGORY
        |--------------------------------------------------------------------------
        */

        selectCategory(category) {

            this.currentPage = 1

            if (!category) {

                this.selectedCategory = null

                this.$router.push({
                    name: "Catalogue"
                })

                return

            }


            this.selectedCategory =
                category.id


            this.$router.push({
                name: "Catalogue",
                params: {
                    slug: category.slug
                }
            })

        },


        setCategoryFromSlug(slug) {

            if (!slug) {

                this.selectedCategory = null

                return

            }


            const category =
                this.categories.find(
                    item =>
                        item.slug === slug
                )


            if (category) {

                this.selectedCategory =
                    category.id

            } else {

                this.selectedCategory = null

            }


            this.currentPage = 1

        },


        /*
        |--------------------------------------------------------------------------
        | RESET
        |--------------------------------------------------------------------------
        */

        resetFilter() {

            this.search = ""

            this.selectedCategory = null

            this.currentPage = 1

            this.$router.push({
                name: "Catalogue"
            })

        },


        /*
        |--------------------------------------------------------------------------
        | VIEW PRODUCT
        |--------------------------------------------------------------------------
        */

        viewProduct(product) {

            this.$router.push({
                name: "CardDetail",
                params: {
                    id: product.id
                }
            })

        },


        /*
        |--------------------------------------------------------------------------
        | SALE
        |--------------------------------------------------------------------------
        */

        isSale(product) {

            return (
                product.sale_price
                &&
                product.price
                &&
                Number(product.sale_price)
                < Number(product.price)
            )

        },


        /*
        |--------------------------------------------------------------------------
        | PAGINATION
        |--------------------------------------------------------------------------
        */

        goPage(page) {

            if (
                page < 1
                ||
                page > this.totalPages
            ) {
                return
            }


            this.currentPage = page


            this.$nextTick(() => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })

            })

        },


        /*
        |--------------------------------------------------------------------------
        | DRIVE IMAGE
        |--------------------------------------------------------------------------
        */

        driveToThumbnail(
            url,
            size = 1000
        ) {

            if (!url) {
                return ""
            }


            const match =
                url.match(/\/d\/([^/]+)/)
                ||
                url.match(/id=([^&]+)/)


            if (!match) {
                return url
            }


            const fileId =
                match[1]


            return `
                https://drive.google.com/thumbnail
                ?id=${fileId}
                &sz=w${size}
            `.replace(/\s/g, "")

        },


        /*
        |--------------------------------------------------------------------------
        | IMAGE SRC
        |--------------------------------------------------------------------------
        */

        getImageSrc(product) {

            if (!product || !product.thumbnail) {
                return ""
            }


            const id = product.id


            if (
                this.imageStates[id]
                &&
                this.imageStates[id].src
            ) {

                return this.imageStates[id].src

            }


            return this.driveToThumbnail(
                product.thumbnail,
                1000
            )

        },


        /*
        |--------------------------------------------------------------------------
        | IMAGE LOADING
        |--------------------------------------------------------------------------
        */

        isImageLoading(product) {

            if (!product) {
                return false
            }


            const state =
                this.imageStates[product.id]


            return state
                ? state.loading
                : true

        },


        /*
        |--------------------------------------------------------------------------
        | IMAGE LOADED
        |--------------------------------------------------------------------------
        */

        imageLoaded(product) {

            if (!product) {
                return
            }


            const id = product.id


            if (!this.imageStates[id]) {

                this.$set(
                    this.imageStates,
                    id,
                    {}
                )

            }


            this.$set(
                this.imageStates[id],
                "loading",
                false
            )


            this.$set(
                this.imageStates[id],
                "failed",
                false
            )


            this.$set(
                this.imageStates[id],
                "loaded",
                true
            )

        },


        /*
        |--------------------------------------------------------------------------
        | IMAGE ERROR + RETRY
        |--------------------------------------------------------------------------
        */

        imageError(product) {

            if (
                !product
                ||
                !product.thumbnail
            ) {
                return
            }


            const id = product.id


            if (!this.imageStates[id]) {

                this.$set(
                    this.imageStates,
                    id,
                    {
                        retry: 0,
                        loading: true,
                        failed: false,
                        loaded: false,
                        src: this.driveToThumbnail(
                            product.thumbnail,
                            1000
                        )
                    }
                )

            }


            const state =
                this.imageStates[id]


            if (
                state.retry
                >=
                this.maxImageRetry
            ) {

                this.$set(
                    state,
                    "loading",
                    false
                )

                this.$set(
                    state,
                    "failed",
                    true
                )

                return

            }


            const retry =
                state.retry + 1


            this.$set(
                state,
                "retry",
                retry
            )


            this.$set(
                state,
                "loading",
                true
            )


            const delay =
                Math.pow(
                    2,
                    retry - 1
                ) * 1000


            setTimeout(() => {

                const baseUrl =
                    this.driveToThumbnail(
                        product.thumbnail,
                        1000
                    )


                const separator =
                    baseUrl.includes("?")
                        ? "&"
                        : "?"


                this.$set(
                    state,
                    "src",
                    `${baseUrl}${separator}retry=${Date.now()}`
                )

            }, delay)

        }

    },


    created() {

        this.products =
            productsData.data || []


        this.categories =
            categoriesData.data || []


        this.setCategoryFromSlug(
            this.$route.params.slug
        )

    }

}

</script>


<style scoped>
/* ==================================================
   PAGE
================================================== */

.catalogue-page {

    min-height: 100vh;

    padding:
        60px 5% 80px;

    background:
        linear-gradient(135deg,
            #fffaf5 0%,
            #f8eee8 50%,
            #fffaf5 100%);

    color: #6b4226;

}


/* ==================================================
   HEADER
================================================== */

.catalogue-header {

    max-width: 800px;

    margin:
        0 auto 45px;

    text-align: center;

}


.header-badge {

    display: inline-block;

    padding:
        7px 18px;

    margin-bottom: 14px;

    border-radius: 30px;

    background:
        rgba(183, 110, 121, 0.15);

    color: #8B5E3C;

    font-size: 12px;

    font-weight: 700;

    letter-spacing: 1.8px;

}


.catalogue-header h1 {

    margin: 0;

    font-family:
        'Playfair Display',
        serif;

    font-size: 42px;

    line-height: 1.2;

    color: #8B5E3C;

}


.catalogue-header h1 span {

    color: #b76e79;

}


.catalogue-header p {

    max-width: 650px;

    margin:
        18px auto 0;

    color: #765947;

    line-height: 1.8;

}


/* ==================================================
   CATEGORY
================================================== */

.category-wrapper {

    margin-bottom: 30px;

}


.category-scroll {

    display: flex;

    gap: 10px;

    overflow-x: auto;

    padding:
        5px 3px 12px;

    scrollbar-width: none;

}


.category-scroll::-webkit-scrollbar {

    display: none;

}


.category-item {

    flex-shrink: 0;

    border: 1px solid #ead8cd;

    background: #fff;

    color: #765947;

    border-radius: 30px;

    padding:
        10px 18px;

    font-size: 13px;

    font-weight: 600;

    cursor: pointer;

    transition: all .25s ease;

}


.category-item:hover {

    color: #b76e79;

    border-color: #b76e79;

}


.category-item.active {

    color: #fff;

    border-color: transparent;

    background:
        linear-gradient(135deg,
            #b76e79,
            #8B5E3C);

    box-shadow:
        0 6px 15px rgba(139, 94, 60, .2);

}


/* ==================================================
   TOOLBAR
================================================== */

.catalogue-toolbar {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;

    margin-bottom: 25px;

}


.result-count {

    display: flex;

    align-items: baseline;

    gap: 6px;

    color: #8B5E3C;

}


.result-count strong {

    font-size: 22px;

    color: #b76e79;

}


.result-count span {

    font-size: 14px;

}


.toolbar-right {

    display: flex;

    align-items: center;

    gap: 10px;

}


/* SEARCH */

.search-box {

    display: flex;

    align-items: center;

    width: 250px;

    height: 42px;

    padding: 0 12px;

    background: #fff;

    border: 1px solid #ead8cd;

    border-radius: 25px;

}


.search-box i {

    color: #b76e79;

}


.search-box input {

    flex: 1;

    border: none;

    outline: none;

    padding:
        0 8px;

    background: transparent;

    color: #6b4226;

}


.search-box button {

    border: none;

    background: none;

    font-size: 20px;

    color: #999;

    cursor: pointer;

}


/* SORT */

.sort-select {

    height: 42px;

    border:
        1px solid #ead8cd;

    border-radius: 25px;

    background: #fff;

    padding:
        0 14px;

    color: #6b4226;

    outline: none;

}


/* ==================================================
   PRODUCT GRID
================================================== */

.product-grid {

    display: grid;

    grid-template-columns:
        repeat(4, minmax(0, 1fr));

    gap: 22px;

}


/* ==================================================
   PRODUCT CARD
================================================== */

.product-card {

    position: relative;

    overflow: hidden;

    background: #fff;

    border-radius: 20px;

    border: 1px solid rgba(139, 94, 60, .08);

    box-shadow:
        0 8px 25px rgba(139, 94, 60, .10);

    transition:
        transform .3s ease,
        box-shadow .3s ease;

}


.product-card:hover {

    transform:
        translateY(-6px);

    box-shadow:
        0 18px 40px rgba(139, 94, 60, .18);

}


/* ==================================================
   IMAGE
================================================== */

.product-image-wrapper {

    position: relative;

    width: 100%;

    aspect-ratio: 1 / 1.05;

    overflow: hidden;

    background:
        #f7eee8;

}


.product-image {

    width: 100%;

    height: 100%;

    display: block;

    object-fit: cover;

    transition:
        transform .5s ease;

}


.product-card:hover .product-image {

    transform:
        scale(1.035);

}


/* IMAGE LOADING */

.image-loading {

    position: absolute;

    inset: 0;

    z-index: 2;

    display: flex;

    align-items: center;

    justify-content: center;

    background:
        #f8eee8;

}


.image-loading span {

    width: 30px;

    height: 30px;

    border:
        3px solid rgba(183, 110, 121, .2);

    border-top-color:
        #b76e79;

    border-radius: 50%;

    animation:
        spin .8s linear infinite;

}


@keyframes spin {

    to {
        transform:
            rotate(360deg);
    }

}


/* CODE */

.product-code {

    position: absolute;

    top: 12px;

    left: 12px;

    padding:
        5px 10px;

    border-radius: 20px;

    background:
        rgba(255, 255, 255, .92);

    color: #8B5E3C;

    font-size: 11px;

    font-weight: 700;

    box-shadow:
        0 3px 10px rgba(0, 0, 0, .08);

}


/* SALE */

.sale-badge {

    position: absolute;

    top: 12px;

    right: 12px;

    padding:
        5px 9px;

    border-radius: 20px;

    background:
        #b76e79;

    color: #fff;

    font-size: 10px;

    font-weight: 700;

}


/* ==================================================
   CONTENT
================================================== */

.product-content {

    padding:
        18px 17px 18px;

}


.product-content h2 {

    min-height: 44px;

    margin:
        0 0 10px;

    font-family:
        'Playfair Display',
        serif;

    font-size: 17px;

    line-height: 1.35;

    color: #8B5E3C;

}


/* ==================================================
   PRICE
================================================== */

.price-area {

    display: flex;

    align-items: baseline;

    flex-wrap: wrap;

    gap: 8px;

    margin-bottom: 10px;

}


.current-price {

    color: #b76e79;

    font-size: 20px;

    font-weight: 700;

}


.current-price small {

    font-size: 11px;

    font-weight: 400;

    color: #8B5E3C;

}


.old-price {

    color: #aaa;

    font-size: 13px;

    text-decoration:
        line-through;

}


/* ==================================================
   DESCRIPTION
================================================== */

.product-description {

    min-height: 42px;

    margin:
        0 0 10px;

    color: #806b5d;

    font-size: 12px;

    line-height: 1.6;

}


/* ==================================================
   NOTE
================================================== */

.product-note {

    padding:
        8px 10px;

    margin-bottom: 14px;

    border-radius: 10px;

    background:
        #faf5f1;

    color: #8B5E3C;

    font-size: 11px;

    line-height: 1.5;

}


.product-note i {

    margin-right: 4px;

    color: #b76e79;

}


/* ==================================================
   BUTTON
================================================== */

.detail-button {

    width: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    border: none;

    border-radius: 30px;

    padding:
        10px 15px;

    background:
        linear-gradient(135deg,
            #b76e79,
            #8B5E3C);

    color: #fff;

    font-size: 13px;

    font-weight: 600;

    cursor: pointer;

    transition: all .25s ease;

}


.detail-button:hover {

    transform:
        translateY(-2px);

    box-shadow:
        0 7px 18px rgba(183, 110, 121, .3);

}


.detail-button i {

    transition:
        transform .25s ease;

}


.detail-button:hover i {

    transform:
        translateX(4px);

}


/* ==================================================
   EMPTY
================================================== */

.empty-state {

    text-align: center;

    padding:
        80px 20px;

}


.empty-icon {

    font-size: 50px;

    color: #b76e79;

}


.empty-state h3 {

    margin:
        15px 0 8px;

    font-family:
        'Playfair Display',
        serif;

    color: #8B5E3C;

}


.empty-state p {

    color: #806b5d;

}


.reset-button {

    margin-top: 15px;

    padding:
        10px 20px;

    border: none;

    border-radius: 25px;

    background:
        #b76e79;

    color: #fff;

}


/* ==================================================
   PAGINATION
================================================== */

.catalogue-pagination {

    display: flex;

    justify-content: center;

    align-items: center;

    gap: 7px;

    margin-top: 45px;

}


.page-button {

    width: 38px;

    height: 38px;

    border: none;

    border-radius: 50%;

    background: #fff;

    color: #8B5E3C;

    box-shadow:
        0 3px 10px rgba(139, 94, 60, .1);

    cursor: pointer;

}


.page-button.active {

    background:
        linear-gradient(135deg,
            #b76e79,
            #8B5E3C);

    color: #fff;

}


.page-button:disabled {

    opacity: .35;

    cursor: not-allowed;

}


.page-dots {

    color: #8B5E3C;

}


/* ==================================================
   CONTACT
================================================== */

.catalogue-contact {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 30px;

    margin-top: 65px;

    padding:
        30px 35px;

    border-radius: 25px;

    background:
        linear-gradient(135deg,
            #fff,
            #f9eee8);

    box-shadow:
        0 10px 30px rgba(139, 94, 60, .1);

}


.contact-label {

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 1.5px;

    color: #b76e79;

}


.catalogue-contact h3 {

    margin:
        5px 0;

    font-family:
        'Playfair Display',
        serif;

    color: #8B5E3C;

}


.catalogue-contact p {

    margin: 0;

    color: #806b5d;

    font-size: 13px;

}


.contact-actions {

    display: flex;

    gap: 10px;

    flex-shrink: 0;

}


.contact-button {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 7px;

    min-width: 100px;

    padding:
        11px 18px;

    border:
        1px solid #b76e79;

    border-radius: 25px;

    color: #b76e79;

    text-decoration: none;

    font-size: 13px;

    font-weight: 600;

}


.contact-button.primary {

    background:
        linear-gradient(135deg,
            #b76e79,
            #8B5E3C);

    color: #fff;

    border: none;

}


/* ==================================================
   TABLET
================================================== */

@media (max-width: 1100px) {

    .product-grid {

        grid-template-columns:
            repeat(3, minmax(0, 1fr));

    }

}


/* ==================================================
   MOBILE
================================================== */

@media (max-width: 768px) {

    .catalogue-page {

        padding:
            35px 12px 50px;

    }


    .catalogue-header {

        margin-bottom: 30px;

    }


    .catalogue-header h1 {

        font-size: 30px;

    }


    .catalogue-header p {

        font-size: 14px;

    }


    .catalogue-toolbar {

        flex-direction: column;

        align-items: stretch;

    }


    .toolbar-right {

        width: 100%;

    }


    .search-box {

        flex: 1;

        width: auto;

    }


    .sort-select {

        max-width: 150px;

    }


    .product-grid {

        grid-template-columns:
            repeat(2, minmax(0, 1fr));

        gap: 10px;

    }


    .product-content {

        padding:
            12px 10px;

    }


    .product-content h2 {

        min-height: 40px;

        font-size: 15px;

    }


    .current-price {

        font-size: 17px;

    }


    .old-price {

        font-size: 11px;

    }


    .product-description {

        font-size: 11px;

    }


    .product-note {

        font-size: 10px;

    }


    .detail-button {

        padding:
            9px;

        font-size: 12px;

    }


    .catalogue-contact {

        flex-direction: column;

        align-items: flex-start;

        padding:
            22px;

    }


    .contact-actions {

        width: 100%;

    }


    .contact-button {

        flex: 1;

    }

}


/* ==================================================
   SMALL MOBILE
================================================== */

@media (max-width: 430px) {

    .product-grid {

        gap: 8px;

    }


    .product-image-wrapper {

        aspect-ratio:
            1 / 1.08;

    }


    .product-code {

        top: 7px;

        left: 7px;

        padding:
            4px 7px;

        font-size: 9px;

    }


    .sale-badge {

        top: 7px;

        right: 7px;

        padding:
            4px 7px;

        font-size: 8px;

    }


    .product-content h2 {

        font-size: 14px;

    }

}
</style>