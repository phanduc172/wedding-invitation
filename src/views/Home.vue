<template>
    <div>
        <Section />
        <Collection :limit="8" />
        <Services />
        <About />
        <Contact />
    </div>
</template>

<script>
import About from '../components/About.vue';
import Collection from '../components/Collection.vue';
import Contact from '../components/Contact.vue';
import Section from '../components/Section.vue';
import Services from '../components/Services.vue';


export default {
    name: 'Home',
    components: {
        Section,
        Collection,
        Services,
        About,
        Contact
    }
}
</script>
