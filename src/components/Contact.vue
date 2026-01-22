<template>
    <section id="lien-he" class="contact-section my-5 py-5">
        <!-- Tiêu đề -->
        <div class="text-center mb-5">
            <h2 class="contact-title">📩 Liên hệ Minh Đức</h2>
            <p class="contact-desc">
                Hãy để tôi giúp bạn tạo nên tấm thiệp cưới thật ý nghĩa 💌
            </p>
        </div>

        <b-row>
            <!-- Form -->
            <b-col md="6" class="mb-4">
                <b-card class="contact-card h-100">
                    <b-form @submit.prevent="submit">
                        <b-form-group label="👤 Họ & tên">
                            <b-form-input v-model="name" required placeholder="Thiệp cưới Minh Đức" />
                        </b-form-group>

                        <b-form-group label="📱 Số điện thoại / Zalo">
                            <b-form-input v-model="phone" required placeholder="0383 181 115" />
                        </b-form-group>

                        <b-form-group label="✍️ Yêu cầu của bạn">
                            <b-form-textarea v-model="message" rows="3"
                                placeholder="Mẫu thiệp, số lượng, ngày cần..." />
                        </b-form-group>

                        <div class="text-center mt-4">
                            <b-button type="submit" class="contact-btn">
                                💌 Gửi yêu cầu
                            </b-button>
                        </div>
                    </b-form>
                </b-card>
            </b-col>

            <!-- Thông tin -->
            <b-col md="6">
                <div class="contact-info-box mb-4">
                    <p>
                        <i class="bi bi-telephone"></i>
                        <strong>Hotline / Zalo:</strong>
                        <a href="tel:0383181115">0383 181 115</a>
                    </p>

                    <p>
                        <i class="bi bi-envelope-paper-heart"></i>
                        <strong>Email:</strong>
                        <a href="mailto:thiepcuoiminhduc17@gmail.com">
                            thiepcuoiminhduc17@gmail.com
                        </a>
                    </p>

                    <p>
                        <i class="bi bi-geo-alt"></i>
                        <strong class="me-1">Địa chỉ: </strong>36 Konh Hư, A Lưới 2, TP. Huế
                    </p>
                </div>

                <div class="map-box">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.074911975367!2d107.22681097666036!3d16.267930693994362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31404bcc676f8787%3A0x885f5f197a19ce0e!2zVGhp4buHcCBjxrDhu5tpIE1pbmggxJDhu6lj!5e0!3m2!1svi!2sus!4v1769060320022!5m2!1svi!2sus"
                        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </b-col>
        </b-row>
    </section>
</template>


<script>
export default {
    name: 'Contact',
    data() {
        return { name: '', phone: '', message: '' }
    },
    methods: {
        submit() {
            alert(`Cảm ơn ${this.name}! Chúng tôi sẽ liên hệ qua ${this.phone}`)
            this.name = ''
            this.phone = ''
            this.message = ''
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@400;500&display=swap');

.contact-section {
    background: linear-gradient(to right, #fff, #fdf6f0);
    border-radius: 16px;
    padding: 3rem 2rem;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
    font-family: 'Poppins', sans-serif;
}

.contact-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: #8B5E3C;
    font-weight: 600;
    position: relative;
    display: inline-block;
}

.contact-title::after {
    content: "";
    display: block;
    width: 55%;
    height: 3px;
    background: #b76e79;
    margin: 0.5rem auto 0;
    border-radius: 2px;
}

.contact-desc {
    margin-top: 0.5rem;
    color: #555;
    font-size: 16px;
}

/* Form */
.contact-card {
    border: none;
    border-radius: 16px;
    padding: 2rem;
}

.contact-btn {
    background: #b76e79;
    color: #fff;
    border: none;
    padding: 0.6rem 2rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.contact-btn:hover {
    background: #a85f6a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Info */
.contact-info-box {
    background: #fff;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.contact-info-box p {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #6b4226;
    margin-bottom: 0.9rem;
}

.contact-info-box i {
    font-size: 20px;
    color: #b76e79;
    margin-right: 0.6rem;
}

.contact-info-box a {
    color: #8B5E3C;
    font-weight: 500;
    margin-left: 0.3rem;
}

/* Map */
.map-container iframe {
    border-radius: 16px;
}

/* Map */
.map-box {
    margin-top: 1.5rem;
    width: 100%;
    height: 220px;
    /* 👈 chiều cao chuẩn, không tràn */
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    border: 2px solid #f1e4da;
}

.map-box iframe {
    width: 100%;
    height: 100%;
    border: 0;
}
</style>
