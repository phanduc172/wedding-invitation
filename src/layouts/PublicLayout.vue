<template>
    <div>
        <Header />
        <SecondHeader />
        <b-container class="mt-4">
            <router-view />
        </b-container>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SecondHeader from '@/components/SecondHeader.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'PublicLayout',
    components: { Header, SecondHeader, Footer }
}
</script>
