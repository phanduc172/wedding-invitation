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
    metaInfo() {
        return {
            title: 'Thiệp cưới cao cấp – In thiệp cưới Huế | Đức Phan',
            meta: [
                {
                    name: 'description',
                    content:
                        'In thiệp cưới, thiệp mời, thiệp tân gia, namecard cao cấp tại Huế. Thiết kế đẹp – in nhanh – giá tốt.'
                },
                {
                    name: 'keywords',
                    content:
                        'thiệp cưới Huế, in thiệp cưới, thiệp mời, namecard Huế'
                },

                // SEO Facebook
                {
                    property: 'og:title',
                    content: 'Thiệp cưới cao cấp – In thiệp cưới Huế'
                },
                {
                    property: 'og:description',
                    content:
                        'Xưởng in thiệp cưới cao cấp tại Huế – thiết kế theo yêu cầu.'
                },
                {
                    property: 'og:image',
                    content: 'https://ten-domain-cua-ban/seo/home.jpg'
                },
                {
                    property: 'og:url',
                    content: 'https://ten-domain-cua-ban/'
                },

                // SEO Google
                {
                    name: 'robots',
                    content: 'index, follow'
                }
            ],
            link: [
                {
                    rel: 'canonical',
                    href: 'https://ten-domain-cua-ban/'
                }
            ]
        }
    },
    components: {
        Section,
        Collection,
        Services,
        About,
        Contact
    },

}
</script>
