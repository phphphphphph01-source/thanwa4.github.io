// ========================================
// 1. Calculator for Grass Area (Case Study)
// ========================================
const grassCalculator = document.getElementById('grass-calculator');
const resultBox = document.getElementById('result');

if (grassCalculator) {
    grassCalculator.addEventListener('submit', function(e) {
        e.preventDefault();

        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);

        if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
            resultBox.innerHTML = '<p style="color: #d32f2f;">❌ กรุณากรอกข้อมูลที่ถูกต้อง (ตัวเลขมากกว่า 0)</p>';
            resultBox.classList.add('show');
            return;
        }

        const area = length * width;
        const extra = area * 0.10;
        const total = area + extra;

        resultBox.innerHTML = `
            <h3 style="color: #00695c; margin-bottom: 15px;">📊 ผลการคำนวณ</h3>
            <p><strong>พื้นที่สนาม:</strong> ${area.toFixed(2)} ตารางเมตร</p>
            <p><strong>เผื่อวัสดุ 10%:</strong> ${extra.toFixed(2)} ตารางเมตร</p>
            <hr style="margin: 15px 0; border: 1px solid #00acc1;">
            <p style="font-size: 20px;"><strong>🎯 พื้นที่รวมที่ต้องใช้:</strong> ${total.toFixed(2)} ตารางเมตร</p>
        `;
        resultBox.classList.add('show');
    });
}

// ========================================
// 2. Quiz Form Handler
// ========================================
const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');

// คำตอบที่ถูกต้อง (เปลี่ยนตามเฉลยที่แท้จริง)
const correctAnswers = {
    q1: '1',  // อุณหภูมิที่เหมาะสมสำหรับเนื้อผ้า
    q2: '3',  // สีของผ้า
    q3: '1',  // ภาษาธรรมชาติ
    q4: '3',  // ตามลำดับอัลกอริทึม
    q5: '3',  // START, STOP, BEGIN
    q6: '3',  // COMPUTE sum = number 1 + number 2
    q7: '3',  // ผังงาน (Flowchart)
    q8: '4',  // สัญลักษณ์เริ่มต้นและสิ้นสุด
    q9: '2',  // การออกแบบโปรแกรม
    q10: '2'  // เลือกกระทำ/เงื่อนไข (Selection/Condition)
};

if (quizForm) {
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;
        let answeredQuestions = 0;

        // ตรวจสอบคำตอบแต่ละข้อ
        for (let question in correctAnswers) {
            const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
            
            if (userAnswer) {
                answeredQuestions++;
                if (userAnswer.value === correctAnswers[question]) {
                    score++;
                }
            }
        }

        // แสดงผลคะแนน
        if (answeredQuestions === 0) {
            quizResult.innerHTML = `
                <p style="color: #d32f2f;">❌ กรุณาเลือกคำตอบอย่างน้อย 1 ข้อ</p>
            `;
        } else {
            const percentage = ((score / totalQuestions) * 100).toFixed(2);
            let grade = '';
            let emoji = '';

            if (percentage >= 80) {
                grade = 'ดีเยี่ยม!';
                emoji = '🎉';
            } else if (percentage >= 70) {
                grade = 'ดีมาก!';
                emoji = '👏';
            } else if (percentage >= 60) {
                grade = 'ดี';
                emoji = '👍';
            } else if (percentage >= 50) {
                grade = 'พอใช้';
                emoji = '😊';
            } else {
                grade = 'ควรทบทวนเพิ่มเติม';
                emoji = '📚';
            }

            quizResult.innerHTML = `
                <h3>${emoji} ผลการทำแบบทดสอบ ${emoji}</h3>
                <p style="font-size: 24px; margin: 15px 0;">คะแนน: ${score}/${totalQuestions}</p>
                <p style="font-size: 20px;">เปอร์เซ็นต์: ${percentage}%</p>
                <p style="font-size: 18px; margin-top: 10px;">${grade}</p>
            `;
        }

        quizResult.classList.add('show');
        
        // เลื่อนไปยังผลลัพธ์
        quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ========================================
// 3. Smooth Scrolling for Navigation
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // ตรวจสอบว่า href เป็น # เฉยๆหรือไม่
        if (targetId === '#') {
            return;
        }

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 4. Add Active Class to Current Section
// ========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 5. Form Validation Enhancement
// ========================================
const numberInputs = document.querySelectorAll('input[type="number"]');

numberInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
});

// ========================================
// 6. Console Log for Debugging
// ========================================
console.log('✅ Script loaded successfully!');
console.log('📚 เว็บไซต์สอนการเขียนอัลกอริธึม พร้อมใช้งาน');

    // ดึง form ในส่วนกรณีศึกษา
    const caseForm = document.getElementById('grass-calculator');

    caseForm.addEventListener('submit', function (e) {
        e.preventDefault(); // กันหน้ารีเฟรช

        const length = parseFloat(document.getElementById('length').value);
        const width  = parseFloat(document.getElementById('width').value);
        const result = document.getElementById('result');

        if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
            result.innerHTML = '<p style="color:red;">กรุณากรอกข้อมูลให้ถูกต้อง (ตัวเลขที่มากกว่า 0)</p>';
            return;
        }

        const area = length * width;
        const extra = area * 0.10;
        const total = area + extra;

        result.innerHTML = `
            <p>พื้นที่สนาม = ${area.toFixed(2)} ตารางเมตร</p>
            <p>เผื่อวัสดุ 10% = ${extra.toFixed(2)} ตารางเมตร</p>
            <p><strong>พื้นที่รวมที่ต้องใช้ = ${total.toFixed(2)} ตารางเมตร</strong></p>
        `;
    });
