<template>

    <b-modal id="contact-modal" centered hide-footer hide-header modal-class="contact-modal">
        <div class="modal-inner">

            <button class="modal-close mb-5" @click="$bvModal.hide('contact-modal')">
                ✕
            </button>
            <!-- Intro -->
            <div class="modal-intro">
                💌 Vui lòng liên hệ với <strong>Thiệp Cưới Minh Đức</strong><br />
                để được tư vấn & đặt mẫu nhanh nhất
            </div>

            <!-- Message suggestion -->
            <div class="message-box">
                <label>Nội dung gợi ý gửi cho shop:</label>

                <textarea class="message-text" rows="3" readonly :value="messageText"></textarea>

                <div class="copy-actions">
                    <button class="copy-btn" @click="copyName">
                        📋 Copy tên thiệp
                    </button>
                    <button class="copy-btn primary" @click="copyMessage">
                        📋 Copy nội dung
                    </button>
                </div>
            </div>

            <!-- Contacts -->
            <div class="contact-grid">
                <a :href="zalo" target="_blank" class="contact-item zalo" @click="$bvModal.hide('contact-modal')">
                    <i class="bi bi-chat-dots-fill"></i>
                    <span>Zalo</span>
                    <small>Chat nhanh – tiện lợi</small>
                </a>

                <a :href="facebook" target="_blank" class="contact-item facebook"
                    @click="$bvModal.hide('contact-modal')">
                    <i class="bi bi-facebook"></i>
                    <span>Facebook</span>
                    <small>Nhắn tin cá nhân</small>
                </a>

                <a :href="fanpage" target="_blank" class="contact-item fanpage" @click="$bvModal.hide('contact-modal')">
                    <i class="bi bi-megaphone-fill"></i>
                    <span>Fanpage</span>
                    <small>Xem mẫu & inbox</small>
                </a>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'ContactModal',
    props: {
        zalo: String,
        facebook: String,
        fanpage: String,
        cardTitle: {
            type: String,
            default: ''
        }
    },
    computed: {
        messageText() {
            return `Tôi muốn đặt mẫu thiệp "${this.cardTitle}". Nhờ shop tư vấn giúp tôi ạ.`
        }
    },
    methods: {
        copyName() {
            navigator.clipboard.writeText(this.cardTitle)
            this.toast('Đã copy tên thiệp')
        },
        copyMessage() {
            navigator.clipboard.writeText(this.messageText)
            this.toast('Đã copy nội dung')
        },
        toast(text) {
            this.$bvToast.toast(text, {
                title: '✔ Thành công',
                variant: 'success',
                autoHideDelay: 6000,
                solid: true
            })
        }
    }
}

</script>

<style scoped>
/* Wrapper nội dung */
.modal-inner {
    position: relative;
    padding: 16px;
}

/* Nút đóng */
.modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.06);
    font-size: 18px;
    font-weight: 600;
    color: #8B5E3C;
    cursor: pointer;
    transition: all 0.25s ease;
    z-index: 5;
}

.modal-close:hover {
    background: #b76e79;
    color: #fff;
    transform: rotate(90deg);
}

/* Intro */
.modal-intro {
    text-align: center;
    font-size: 15px;
    color: #6b4226;
    margin-bottom: 14px;
    padding-top: 12px;
    /* tránh sát nút X */
}

.modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    font-size: 18px;
    font-weight: bold;
    color: #8B5E3C;
    cursor: pointer;
    transition: all 0.25s ease;
    z-index: 10;
}

.modal-close:hover {
    background: #b76e79;
    color: #fff;
    transform: rotate(90deg) scale(1.05);
}

.contact-modal .modal-content {
    border-radius: 24px;
    border: none;
    padding: 8px;
    background: linear-gradient(135deg, #fffaf5, #f6e6dc);
}

.modal-intro {
    text-align: center;
    font-size: 16px;
    color: #6b4226;
    margin-bottom: 14px;
}

/* Message box */
.message-box {
    background: #fff;
    border-radius: 16px;
    padding: 14px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
}

.message-box label {
    font-weight: 600;
    font-size: 13px;
    color: #8B5E3C;
}

.message-text {
    width: 100%;
    border: 1px dashed #b76e79;
    border-radius: 12px;
    padding: 10px;
    margin: 8px 0;
    font-size: 14px;
    resize: none;
    background: #fffaf5;
}

.copy-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.copy-btn {
    flex: 1;
    padding: 8px;
    border-radius: 20px;
    border: 1px solid #b76e79;
    background: transparent;
    font-size: 13px;
    font-weight: 600;
    color: #8B5E3C;
    transition: 0.3s;
}

.copy-btn.primary {
    background: linear-gradient(135deg, #b76e79, #8B5E3C);
    color: #fff;
    border: none;
}

.copy-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(183, 110, 121, 0.3);
}

/* Contacts */
.contact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.contact-item {
    text-decoration: none;
    background: #fff;
    border-radius: 18px;
    padding: 16px 10px;
    text-align: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.35s ease;
}

.contact-item i {
    font-size: 32px;
    margin-bottom: 6px;
}

.contact-item span {
    display: block;
    font-weight: 700;
    font-size: 14px;
}

.contact-item small {
    font-size: 12px;
    opacity: 0.7;
}

/* Colors */
.contact-item.zalo i {
    color: #0068ff;
}

.contact-item.facebook i {
    color: #1877f2;
}

.contact-item.fanpage i {
    color: #b76e79;
}

.contact-item:hover {
    transform: translateY(-6px) scale(1.02);
}

/* ================= MOBILE FIRST ================= */
@media (max-width: 576px) {
    .contact-grid {
        grid-template-columns: 1fr;
    }

    /* Modal full hơn trên mobile */
    .contact-modal .modal-dialog {
        margin: 0.75rem;
    }

    .contact-modal .modal-content {
        border-radius: 18px;
        padding: 10px;
    }

    /* Intro */
    .modal-intro {
        font-size: 15px;
        line-height: 1.4;
        margin-bottom: 12px;
    }

    /* Message box */
    .message-box {
        padding: 12px;
        margin-bottom: 16px;
    }

    .message-text {
        font-size: 14px;
        padding: 10px;
    }

    /* Copy buttons stack */
    .copy-actions {
        flex-direction: column;
    }

    .copy-btn {
        width: 100%;
        padding: 12px;
        font-size: 14px;
    }

    /* Contact list -> 1 column */
    .contact-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .contact-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 14px;
        padding: 14px 16px;
        text-align: left;
        border-radius: 16px;
    }

    .contact-item i {
        font-size: 28px;
        margin-bottom: 0;
    }

    .contact-item span {
        font-size: 15px;
    }

    .contact-item small {
        display: block;
        font-size: 12px;
    }

    /* Close button bigger for touch */
    .modal-close {
        width: 40px;
        height: 40px;
        font-size: 20px;
    }

    .modal-inner {
        padding: 18px 14px;
    }

    .modal-close {
        top: 0px;
        right: 0px;
        width: 34px;
        height: 34px;
        font-size: 17px;
    }

    .modal-intro {
        font-size: 14px;
        line-height: 1.5;
        margin-top: 16px;
    }
}

/* ================= VERY SMALL DEVICES ================= */
@media (max-width: 360px) {
    .modal-intro {
        font-size: 14px;
    }

    .contact-item span {
        font-size: 14px;
    }

    .copy-btn {
        font-size: 13px;
    }
}
</style>