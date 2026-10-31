document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links on mobile
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Dynamic Current Year in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Gallery Lightbox
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            if (lightboxModal && lightboxImg) {
                lightboxModal.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            }
        });
    });

    if (closeBtn && lightboxModal) {
        closeBtn.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
        });

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
            }
        });
    }

    // Admission Form Handling & WhatsApp Integration
    const admissionForm = document.getElementById('admissionForm');
    const formMessage = document.getElementById('formMessage');

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const parentName = document.getElementById('parentName').value.trim();
            const contactNumber = document.getElementById('contactNumber').value.trim();
            const studentStandard = document.getElementById('studentStandard').value.trim();
            const subjectInterest = document.getElementById('subjectInterest').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate phone number (10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(contactNumber)) {
                formMessage.textContent = 'Please enter a valid 10-digit mobile number.';
                formMessage.className = 'form-message error';
                return;
            }

            // Construct WhatsApp message pre-fill
            const whatsappNumber = '919821664078';
            const text = `*New Admission Enquiry - Excellency Learning Systems*%0A%0A*Name:* ${encodeURIComponent(parentName)}%0A*Contact:* ${encodeURIComponent(contactNumber)}%0A*Standard:* ${encodeURIComponent(studentStandard)}%0A*Subject:* ${encodeURIComponent(subjectInterest || 'Not specified')}%0A*Message:* ${encodeURIComponent(message || 'None')}`;

            // Success feedback and WhatsApp redirect
            formMessage.textContent = 'Enquiry prepared! Redirecting to WhatsApp...';
            formMessage.className = 'form-message success';

            setTimeout(() => {
                window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
                admissionForm.reset();
            }, 1000);
        });
    }
});