<template>
    <b-container fluid class="orders-container">
        <!-- Card chính -->
        <b-card class="orders-card p-4">
            <h4 class="mb-3">📦 Quản lý đơn hàng</h4>

            <!-- Bộ lọc -->
            <b-row class="mb-3">
                <b-col md="3">
                    <b-form-input v-model="search" placeholder="🔍 Tìm khách hàng..."
                        class="filter-input"></b-form-input>
                </b-col>
                <b-col md="2">
                    <b-form-select v-model="status" :options="statusOptions" class="filter-select"></b-form-select>
                </b-col>
                <b-col md="3">
                    <b-form-datepicker v-model="fromDate" placeholder="Từ ngày"
                        class="filter-datepicker"></b-form-datepicker>
                </b-col>
                <b-col md="3">
                    <b-form-datepicker v-model="toDate" placeholder="Đến ngày"
                        class="filter-datepicker"></b-form-datepicker>
                </b-col>
                <b-col md="1">
                    <b-button variant="success" block @click="fetchOrders">Lọc</b-button>
                </b-col>
            </b-row>

            <!-- Bảng dữ liệu -->
            <b-table :items="filteredOrders" :fields="fields" striped hover responsive class="styled-table">
                <template #cell(status)="data">
                    <b-badge :variant="statusColor(data.item.status)" class="status-badge">
                        {{ data.item.status }}
                    </b-badge>
                </template>
                <template #cell(total_amount)="data">
                    {{ formatCurrency(data.item.total_amount) }}
                </template>
            </b-table>

            <!-- Tổng doanh thu -->
            <div class="text-right mt-3 total-revenue">
                <strong>Tổng doanh thu: {{ formatCurrency(totalRevenue) }}</strong>
            </div>
        </b-card>

        <!-- Biểu đồ -->
        <b-card class="chart-card mt-4 p-4">
            <h5>📊 Doanh thu theo tháng</h5>
            <apexchart type="bar" height="300" :options="chartOptions" :series="chartSeries" />
        </b-card>
    </b-container>
</template>

<script>
import axios from "axios";

export default {
    name: "OrdersManager",
    data() {
        return {
            orders: [],
            search: "",
            status: "",
            fromDate: null,
            toDate: null,
            fields: [
                { key: "id", label: "Mã đơn" },
                { key: "customer_name", label: "Khách hàng" },
                { key: "order_date", label: "Ngày đặt" },
                { key: "delivery_date", label: "Ngày giao" },
                { key: "status", label: "Trạng thái" },
                { key: "total_amount", label: "Tổng tiền" },
            ],
            statusOptions: [
                { value: "", text: "Tất cả" },
                { value: "đang làm", text: "Đang làm" },
                { value: "đang in", text: "Đang in" },
                { value: "hoàn tất", text: "Hoàn tất" },
                { value: "hủy", text: "Hủy" },
            ],
            chartSeries: [{ name: "Doanh thu", data: [] }],
            chartOptions: {
                chart: { toolbar: { show: false }, background: '#fdf6f0' },
                xaxis: { categories: [] },
                yaxis: { labels: { formatter: val => val.toLocaleString() + "₫" } },
                plotOptions: { bar: { borderRadius: 6, columnWidth: '45%' } },
                dataLabels: { enabled: false },
                grid: { borderColor: '#eee' },
                colors: ['#d36a6a'],
            },
        };
    },
    computed: {
        filteredOrders() {
            return this.orders.filter((o) => {
                const matchSearch = this.search
                    ? o.customer_name?.toLowerCase().includes(this.search.toLowerCase())
                    : true;
                const matchStatus = this.status ? o.status === this.status : true;
                const matchDate =
                    (!this.fromDate || o.order_date >= this.fromDate) &&
                    (!this.toDate || o.order_date <= this.toDate);
                return matchSearch && matchStatus && matchDate;
            });
        },
        totalRevenue() {
            return this.filteredOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
        },
    },
    methods: {
        async fetchOrders() {
            try {
                const res = await axios.get("http://localhost:3000/api/orders");
                this.orders = res.data;
            } catch (err) {
                console.error(err);
            }
        },
        async fetchRevenueChart() {
            try {
                const res = await axios.get("http://localhost:3000/api/stats/monthly-revenue");
                const months = res.data.map((r) => r.month);
                const revenues = res.data.map((r) => r.total_revenue);
                this.chartOptions.xaxis.categories = months;
                this.chartSeries = [{ name: "Doanh thu", data: revenues }];
            } catch (err) {
                console.error(err);
            }
        },
        statusColor(status) {
            switch (status) {
                case "đang làm": return "warning";
                case "đang in": return "info";
                case "hoàn tất": return "success";
                case "hủy": return "danger";
                default: return "secondary";
            }
        },
        formatCurrency(value) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value || 0);
        },
    },
    mounted() {
        this.fetchOrders();
        this.fetchRevenueChart();
    },
};
</script>

<style scoped>
.orders-container {
    background: linear-gradient(to right, #fff, #fdf6f0);
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Card tổng thể */
.orders-card,
.chart-card {
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    background-color: #fff8f5;
    transition: transform 0.2s ease;
}

.orders-card:hover,
.chart-card:hover {
    transform: translateY(-3px);
}

/* Tiêu đề */
h4,
h5 {
    color: #d36a6a;
    font-weight: 600;
}

/* Filter input/select */
.filter-input,
.filter-select,
.filter-datepicker {
    border-radius: 8px;
    border: 1px solid #ddd;
    transition: all 0.2s ease;
}

.filter-input:focus,
.filter-select:focus,
.filter-datepicker:focus {
    border-color: #d36a6a;
    box-shadow: 0 0 5px rgba(211, 106, 106, 0.3);
}

/* Badge trạng thái */
.status-badge {
    padding: 0.5em 0.8em;
    font-weight: 500;
    border-radius: 8px;
}

/* Table hover */
.styled-table tbody tr:hover {
    background-color: #fdf0eb;
    transition: background-color 0.2s ease;
}

/* Tổng doanh thu */
.total-revenue {
    font-size: 1.1em;
    color: #2c3e50;
    font-weight: 600;
}
</style>
