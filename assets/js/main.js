// JavaScript for LP interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Antigravity LP Initialized');

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    // 【重要】ここにデプロイした GAS のウェブアプリ URL を設定してください
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbymmnizbLp7p9Q2Z91YuW0lNP7LZiXSAbKM6gjOUCnHNILl9cOfzL8vJgQogmp1hh7I/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 送信ボタンを無効化
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = '送信中...';

            const formData = new FormData(contactForm);
            const data = new URLSearchParams(formData);

            // GAS への送信（URLが設定されていない場合はシミュレーションのみ実行）
            if (GAS_WEB_APP_URL === 'YOUR_GAS_WEB_APP_URL_HERE') {
                console.warn('GAS_WEB_APP_URL is not set. Simulating success.');
                setTimeout(() => {
                    handleSuccess();
                }, 1000);
                return;
            }

            fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'success') {
                        handleSuccess();
                    } else {
                        alert('送信に失敗しました。時間をおいて再度お試しください。');
                        submitBtn.disabled = false;
                        submitBtn.innerText = originalBtnText;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('通信エラーが発生しました。');
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                });
        });

        function handleSuccess() {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // 成功メッセージまでスクロール
            window.scrollTo({
                top: document.getElementById('contact').offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});
