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
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz3XJq1g7he6Gj4RSDNnEI_XPuVWWkHCZyjSQO19kspSDO2JGQHXkKwCFbfCL0sn4o2/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 送信ボタンを無効化
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = '送信中...';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // GAS への送信（URLが未設定の場合のみシミュレーションを実行）
            if (GAS_WEB_APP_URL.includes('YOUR_GAS_WEB_APP_URL_HERE') || GAS_WEB_APP_URL === '') {
                console.warn('GAS_WEB_APP_URL is not set. Simulating success.');
                setTimeout(() => {
                    handleSuccess();
                }, 1000);
                return;
            }

            fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            })
                .then(() => {
                    // mode: 'no-cors' ではレスポンスの詳細を読み取れませんが、
                    // リクエストが送信されれば Promise が解決するため、成功として扱います。
                    handleSuccess();
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
