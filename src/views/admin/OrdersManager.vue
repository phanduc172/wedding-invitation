<template>
    <div class="dashboard-content">
        <h2 class="dashboard-title mb-4">🛍️ Quản lý đơn hàng</h2>

        <b-card class="orders-card p-4">
            <b-table :items="orders" :fields="fields" striped hover bordered responsive>
                <template #cell(status)="data">
                    <b-badge :variant="getStatusVariant(data.item.status)">
                        {{ data.item.status }}
                    </b-badge>
                </template>
                <template #cell(total)="data">
                    {{ formatCurrency(data.item.total) }}
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>
export default {
    name: "OrdersManager",
    data() {
        return {
            fields: ["id", "customer", "total", "status", "date"],
            orders: [
                { id: 1, customer: "Nguyễn Văn A", total: "1200000", status: "Đang xử lý", date: "12/11/2025" },
                { id: 2, customer: "Trần Thị B", total: "3500000", status: "Hoàn tất", date: "11/11/2025" },
                { id: 3, customer: "Lê Văn C", total: "800000", status: "Hủy", date: "10/11/2025" },
            ],
        };
    },
    methods: {
        getStatusVariant(status) {
            if (status === "Hoàn tất") return "success";
            if (status === "Hủy") return "danger";
            return "warning";
        },
        formatCurrency(value) {
            return Number(value).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
        },
    },
};
</script>

<style scoped>
.dashboard-content {
    flex: 1;
    padding: 30px;
    background: linear-gradient(to right, #fff, #fdf6f0);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Tiêu đề */
.dashboard-title {
    color: #d36a6a;
    font-weight: 600;
    margin-bottom: 20px;
}

/* Card bảng đơn hàng */
.orders-card {
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    background-color: #fff8f5;
    padding: 20px;
    transition: transform 0.2s ease;
}

.orders-card:hover {
    transform: translateY(-3px);
}

/* Badge trạng thái */
.badge-success {
    background-color: #44B97C;
    color: #fff;
}

.badge-warning {
    background-color: #F0AD4E;
    color: #fff;
}

.badge-danger {
    background-color: #d36a6a;
    color: #fff;
}

/* Table responsive và hover */
table {
    border-radius: 10px;
    overflow: hidden;
}

table tr:hover {
    background-color: #fdf0eb;
    transition: background-color 0.2s ease;
}
</style>
