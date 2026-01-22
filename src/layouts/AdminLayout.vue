<template>
    <div class="admin-layout d-flex">
        <!-- Sidebar -->
        <div class="sidebar p-4">
            <h4 class="sidebar-title mb-4">🛠 Quản trị</h4>
            <ul class="list-unstyled">
                <li><router-link to="/admin" class="sidebar-link">🏠 Tổng quan</router-link></li>
                <li><router-link to="/admin/customers" class="sidebar-link">👥 Khách hàng</router-link></li>
                <li><router-link to="/admin/orders" class="sidebar-link">🛒 Đơn hàng</router-link></li>
                <li><router-link to="/admin/products" class="sidebar-link">🎨 Sản phẩm</router-link></li>
            </ul>
        </div>

        <!-- Nội dung chính -->
        <div class="content flex-fill p-4">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminLayout",
};
</script>

<style scoped>
.admin-layout {
    min-height: 100vh;
    background: linear-gradient(to right, #fff, #fdf6f0);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Sidebar */
.sidebar {
    width: 220px;
    min-height: 100vh;
    background-color: #f9e9e4;
    /* màu nhẹ nhàng pastel cho thiệp cưới */
    border-radius: 0 15px 15px 0;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.sidebar-title {
    font-weight: 600;
    color: #d36a6a;
    letter-spacing: 0.5px;
}

/* Links */
.sidebar-link {
    display: block;
    padding: 10px 12px;
    margin-bottom: 5px;
    border-radius: 8px;
    text-decoration: none;
    color: #7a4d4d;
    font-weight: 500;
    transition: all 0.2s ease;
}

.sidebar-link:hover {
    background-color: #f5c8c8;
    color: #fff;
}

.sidebar a.router-link-active {
    background-color: #d36a6a;
    color: #fff;
}

/* Content */
.content {
    flex: 1;
    padding: 30px;
    background: linear-gradient(to right, #fff, #fdf6f0);
    border-radius: 0 0 0 15px;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.02);
}
</style>
