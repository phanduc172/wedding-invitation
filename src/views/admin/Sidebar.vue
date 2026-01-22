<template>
    <div class="sidebar">
        <h4 class="text-white text-center py-3">Quản trị</h4>
        <b-nav vertical class="flex-column">
            <b-nav-item to="/admin" exact>📊 Dashboard</b-nav-item>
            <b-nav-item to="/admin/customers">👥 Khách hàng</b-nav-item>
            <b-nav-item to="/admin/orders">🛍️ Đơn hàng</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
};
</script>

<style scoped>
.sidebar {
    width: 220px;
    background-color: #2c3e50;
    min-height: 100vh;
    color: white;
}

.sidebar a {
    color: white !important;
    padding: 10px 15px;
    display: block;
}

.sidebar a.router-link-exact-active {
    background: #44B97C;
}
</style>
