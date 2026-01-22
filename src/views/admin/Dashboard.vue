<template>
    <div class="dashboard-container">
        <div class="dashboard-content">
            <h2 class="dashboard-title mb-4">📊 Bảng điều khiển</h2>

            <!-- Thống kê nhanh -->
            <b-row>
                <b-col md="4">
                    <b-card class="stat-card bg-pastel-green text-white mb-3">
                        <h5>Tổng khách hàng</h5>
                        <h2>{{ stats.customers }}</h2>
                    </b-card>
                </b-col>
                <b-col md="4">
                    <b-card class="stat-card bg-pastel-blue text-white mb-3">
                        <h5>Tổng đơn hàng</h5>
                        <h2>{{ stats.orders }}</h2>
                    </b-card>
                </b-col>
                <b-col md="4">
                    <b-card class="stat-card bg-pastel-pink text-white mb-3">
                        <h5>Doanh thu tháng</h5>
                        <h2>{{ stats.revenue }} ₫</h2>
                    </b-card>
                </b-col>
            </b-row>

            <!-- Biểu đồ doanh thu -->
            <b-card class="chart-card mt-4">
                <h4 class="mb-3">📈 Biểu đồ doanh thu</h4>
                <apexchart type="bar" height="300" :options="chartOptions" :series="series" />
            </b-card>
        </div>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
    name: "Dashboard",
    components: { apexchart: VueApexCharts },
    data() {
        return {
            stats: {
                customers: 245,
                orders: 320,
                revenue: "120.000.000",
            },
            series: [
                {
                    name: "Doanh thu",
                    data: [20, 35, 40, 55, 75, 90, 110, 95, 85, 60, 45, 30],
                },
            ],
            chartOptions: {
                chart: { toolbar: { show: false }, background: '#fdf6f0' },
                xaxis: {
                    categories: [
                        "Th1", "Th2", "Th3", "Th4", "Th5", "Th6",
                        "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"
                    ],
                },
                colors: ["#d36a6a"], // màu thiệp cưới pastel
                plotOptions: { bar: { borderRadius: 6, columnWidth: '45%' } },
                dataLabels: { enabled: false },
                grid: { borderColor: '#eee' },
            },
        };
    },
};
</script>

<style scoped>
.dashboard-container {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(to right, #fff, #fdf6f0);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-content {
    flex: 1;
    padding: 30px;
}

/* Tiêu đề */
.dashboard-title {
    color: #d36a6a;
    font-weight: 600;
}

/* Card thống kê */
.stat-card {
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding: 20px;
    transition: transform 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

/* Màu pastel cho card */
.bg-pastel-green {
    background-color: #44B97C;
}

.bg-pastel-blue {
    background-color: #5DADE2;
}

.bg-pastel-pink {
    background-color: #d36a6a;
}

/* Card biểu đồ */
.chart-card {
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    background-color: #fff8f5;
    padding: 20px;
}
</style>
