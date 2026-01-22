<template>
    <div class="dashboard-content">
        <h2 class="dashboard-title mb-4">📄 Quản lý sản phẩm</h2>

        <b-card class="products-card p-4">
            <b-table :items="products" :fields="fields" striped hover responsive class="styled-table">
                <template #cell(cost_price)="data">
                    {{ formatCurrency(data.item.cost_price) }}
                </template>
                <template #cell(sell_price)="data">
                    {{ formatCurrency(data.item.sell_price) }}
                </template>
                <template #cell(stock_quantity)="data">
                    <b-badge :variant="data.item.stock_quantity > 0 ? 'success' : 'danger'" class="status-badge">
                        {{ data.item.stock_quantity }}
                    </b-badge>
                </template>
                <template #cell(updated_at)="data">
                    {{ formatDate(data.item.updated_at) }}
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>
export default {
    name: "ProductsManager",
    data() {
        return {
            fields: [
                { key: "id", label: "Mã SP" },
                { key: "name", label: "Tên sản phẩm" },
                { key: "category", label: "Danh mục" },
                { key: "unit", label: "Đơn vị" },
                { key: "cost_price", label: "Giá nhập" },
                { key: "sell_price", label: "Giá bán" },
                { key: "stock_quantity", label: "Số lượng" },
                { key: "updated_at", label: "Cập nhật" },
            ],
            products: [
                {
                    id: 1,
                    name: "Giấy A4",
                    category: "Vật tư in",
                    unit: "ram",
                    cost_price: "50000.00",
                    sell_price: "70000.00",
                    stock_quantity: 10,
                    updated_at: "2025-11-13T00:43:21.000Z",
                },
                {
                    id: 2,
                    name: "Mực in Ricoh",
                    category: "Vật tư in",
                    unit: "hộp",
                    cost_price: "150000.00",
                    sell_price: "200000.00",
                    stock_quantity: 5,
                    updated_at: "2025-11-12T10:20:00.000Z",
                },
            ],
        };
    },
    methods: {
        formatCurrency(value) {
            return Number(value).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
        },
        formatDate(date) {
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
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
}

/* Card sản phẩm */
.products-card {
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    background-color: #fff8f5;
    transition: transform 0.2s ease;
}

.products-card:hover {
    transform: translateY(-3px);
}

/* Badge trạng thái */
.status-badge {
    padding: 0.4em 0.7em;
    border-radius: 8px;
    font-weight: 500;
}

/* Table hover */
.styled-table tbody tr:hover {
    background-color: #fdf0eb;
    transition: background-color 0.2s ease;
}
</style>
