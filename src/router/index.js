import Vue from 'vue'
import Router from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Trang người dùng
import Home from '@/views/Home.vue'
import About from '@/components/About.vue'
import Services from '@/components/Services.vue'
import Collection from '@/components/Collection.vue'
import Contact from '@/components/Contact.vue'

// Trang quản trị
import Dashboard from '@/views/admin/Dashboard.vue'
import CustomerManager from '@/views/admin/CustomerManager.vue'
import OrdersManager from '@/views/admin/OrdersManager.vue'
import ProductsManager from '@/views/admin/ProductsManager.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: PublicLayout,
            children: [
                { path: '', name: 'Home', component: Home },
                { path: 'about', name: 'About', component: About },
                { path: 'services', name: 'Services', component: Services },
                { path: 'collection', name: 'Collection', component: Collection },
                { path: 'contact', name: 'Contact', component: Contact },
            ]
        },
        {
            path: '/admin',
            component: AdminLayout,
            redirect: '/admin/dashboard',
            children: [
                { path: '', name: 'Dashboard', component: Dashboard },
                { path: 'orders', name: 'OrdersManager', component: OrdersManager },
                { path: 'customers', name: 'CustomerManager', component: CustomerManager },
                { path: 'products', name: 'ProductsManager', component: ProductsManager },
            ]
        }
    ]
})
