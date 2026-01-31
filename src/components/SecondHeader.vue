<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="second-header">

        <!-- MOBILE: Current page toggle -->
        <div class="mobile-current d-lg-none" @click="isOpen = !isOpen">
            <span class="current-text">{{ currentPage }}</span>
            <i class="bi bi-chevron-down" :class="{ open: isOpen }"></i>
        </div>

        <!-- MENU -->
        <b-collapse id="nav-collapse" is-nav v-model="isOpen">
            <b-navbar-nav class="mx-auto wedding-menu">
                <b-nav-item exact to="/" tag="router-link">Trang chủ</b-nav-item>
                <b-nav-item to="/collection" tag="router-link">Thiệp cưới</b-nav-item>
                <b-nav-item to="/about" tag="router-link">Giới thiệu</b-nav-item>
                <b-nav-item to="/contact" tag="router-link">Liên hệ</b-nav-item>
            </b-navbar-nav>
        </b-collapse>

    </b-navbar>
</template>

<script>
export default {
    name: 'SecondHeader',
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        currentPage() {
            const map = {
                '/': 'Trang chủ',
                '/collection': 'Thiệp cưới',
                '/about': 'Giới thiệu',
                '/contact': 'Liên hệ'
            }
            return map[this.$route.path] || 'Menu'
        }
    },
    watch: {
        // đổi trang thì auto đóng menu
        $route() {
            this.isOpen = false
        }
    }
}
</script>


<style scoped>
/* Import Google Font mềm mại */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&display=swap');

/* =========================
   NAVBAR BASE
========================= */
.second-header {
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    border-radius: 0 0 24px 24px;
    padding: 0.6rem 1rem;
    font-family: 'Playfair Display', serif;
    box-shadow: 0 6px 18px rgba(139, 94, 60, 0.15);
}

/* =========================
   MOBILE CURRENT PAGE
========================= */
.mobile-current {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    padding: 12px 36px;
    border-radius: 30px;
    font-weight: 600;
    color: #8B5E3C;
    box-shadow: 0 6px 18px rgba(139, 94, 60, 0.18);
    cursor: pointer;

}

.current-text {
    font-size: 16px;
}

.mobile-current i {
    font-size: 14px;
    transition: transform 0.3s ease;
}

.mobile-current i.open {
    transform: rotate(180deg);
}

/* Ẩn hamburger mặc định */
.navbar-toggler {
    display: none !important;
}

/* =========================
   MENU DESKTOP
========================= */
.wedding-menu {
    display: flex;
    gap: 6px;
}

.nav-link {
    position: relative;
    padding: 0.75rem 1.6rem;
    color: #6b4226 !important;
    font-size: 16px;
    letter-spacing: 0.6px;
    border-radius: 30px;
    transition: all 0.35s ease;
}

.nav-link:hover {
    color: #b76e79 !important;
    background: rgba(183, 110, 121, 0.12);
}

.nav-link::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    border-radius: 10px;
    background: linear-gradient(90deg, #b76e79, #8B5E3C);
    transition: width 0.35s ease;
}

.nav-link:hover::after {
    width: 55%;
}

.router-link-exact-active {
    color: #8B5E3C !important;
    font-weight: 600;
    background: rgba(139, 94, 60, 0.15);
}

.router-link-exact-active::after {
    width: 55%;
}

/* =========================
   MOBILE & TABLET
========================= */
@media (max-width: 991px) {
    .second-header {
        padding: 0.8rem 1rem;
        display: flex;
        justify-content: center;
    }

    .wedding-menu {
        margin-top: 14px;
        background: #fffaf5;
        border-radius: 22px;
        padding: 14px 10px;
        box-shadow: 0 10px 25px rgba(139, 94, 60, 0.18);
        flex-direction: column;
        gap: 6px;
    }

    .nav-link {
        text-align: center;
        padding: 14px 16px;
        font-size: 17px;
        border-radius: 16px;
    }

    .nav-link::after {
        display: none;
    }

    .router-link-exact-active {
        background: linear-gradient(135deg, #f6e6dc, #fffaf5);
    }
}

/* Desktop: ẩn mobile-current */
@media (min-width: 992px) {
    .mobile-current {
        display: none;
    }
}
</style>
