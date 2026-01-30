<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="second-header">
        <!-- Toggle cho mobile -->
        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
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
    name: 'SecondHeader'
}
</script>

<style scoped>
/* Import Google Font mềm mại */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&display=swap');

.second-header {
    background: linear-gradient(to right, #fff, #fdf6f0);
    /* pastel nhẹ nhàng */
    border-radius: 0 0 20px 20px;
    /* bo góc mềm mại phía dưới */
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    padding: 0.5rem 1rem;
}

.menu-center {
    margin: 0 auto;
}

.nav-link {
    color: #555 !important;
    padding: 0.7rem 1.4rem;
    transition: all 0.3s ease;
    position: relative;
    letter-spacing: 0.5px;
}

.nav-link:hover {
    color: #b76e79 !important;
    /* hồng đất */
}

.nav-link::after {
    content: "";
    display: block;
    height: 2px;
    width: 0;
    background: #b76e79;
    transition: width 0.3s ease;
    margin: 0 auto;
}

.nav-link:hover::after {
    width: 60%;
    /* gạch chân mềm mại */
}

.router-link-exact-active {
    color: #8B5E3C !important;
    font-weight: 600;
}

.router-link-exact-active::after {
    width: 60%;
}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&display=swap');

.second-header {
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
    border-radius: 0 0 24px 24px;
    padding: 0.6rem 1rem;
    font-family: 'Playfair Display', serif;
    box-shadow: 0 6px 18px rgba(139, 94, 60, 0.15);
}

/* Menu giữa */
.wedding-menu {
    display: flex;
    gap: 6px;
}

/* Link */
.nav-link {
    position: relative;
    padding: 0.75rem 1.6rem;
    color: #6b4226 !important;
    font-size: 16px;
    letter-spacing: 0.6px;
    border-radius: 30px;
    transition: all 0.35s ease;
}

/* Hover */
.nav-link:hover {
    color: #b76e79 !important;
    background: rgba(183, 110, 121, 0.12);
}

/* Underline mềm */
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

/* Active */
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

    /* Navbar tổng */
    .second-header {
        padding: 0.6rem 0.8rem;
        border-radius: 0 0 22px 22px;
    }

    /* Nút hamburger */
    .navbar-toggler {
        border: none;
        outline: none;
        box-shadow: none;
    }

    /* Box menu xổ xuống */
    .wedding-menu {
        margin-top: 14px;
        /* FIX lỗi sát trên */
        background: #fffaf5;
        border-radius: 22px;
        padding: 14px 10px;
        box-shadow: 0 10px 25px rgba(139, 94, 60, 0.18);
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    /* Item menu */
    .nav-link {
        text-align: center;
        padding: 14px 16px;
        font-size: 17px;
        border-radius: 16px;
        background: transparent;
    }

    /* Hover / tap */
    .nav-link:hover {
        background: rgba(183, 110, 121, 0.12);
    }

    /* Active */
    .router-link-exact-active {
        background: linear-gradient(135deg, #f6e6dc, #fffaf5);
        font-weight: 600;
    }

    /* Tắt underline */
    .nav-link::after {
        display: none !important;
    }
}
</style>
