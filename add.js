function showStatus(message, isSuccess) {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.className = isSuccess ? 'status-message success' : 'status-message error';
    statusElement.style.display = 'block';

    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

function toggleLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
    // ปิดปุ่มกดระหว่างโหลด
    document.querySelector('.order-btn').disabled = show;
    document.querySelector('.btn-ghost').disabled = show;
}

function submitForm(params) {
    // URL จาก Code GAS ที่คุณให้มา
    const scriptURL = "https://script.google.com/macros/s/AKfycbx8LncVh9wSudRjupRzDbsXxVdLomCedEzsokNcAaocrkwb3ZQtWyHB9zZoZvlcEOquyg/exec";

    toggleLoading(true);

    // ใช้ URLSearchParams
    fetch(scriptURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params // ส่ง params (URLSearchParams)
    })
        .then(res => {
            if (!res.ok) {
                // ใช้ Backticks สำหรับ Error Message
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            toggleLoading(false);

            if (data.result === "success") {
                showStatus("✅ ส่งข้อมูลสำเร็จ! ข้อมูลถูกบันทึกแล้ว", true);
                document.getElementById("bookingForm").reset();
                // 💡 Reset การแสดงช่อง "อื่นๆ" หลังจาก Submit
                document.getElementById("otherInputBox").style.display = "none";
            } else {
                showStatus("❌ เกิดข้อผิดพลาด: " + data.message, false);
            }
        })
        .catch(err => {
            toggleLoading(false);
            showStatus("❌ เกิดข้อผิดพลาดในการส่งข้อมูล: " + err.message, false);
            console.error('❌ Error:', err);
        });
}

// ตั้งค่าวันที่ขั้นต่ำเป็นวันปัจจุบัน (ตาม JS เดิมของคุณ)
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        dateInput.min = today;
    }
});

document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // ดึงค่าตาม ID
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const participants = document.getElementById("participants").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const purpose = document.getElementById("purpose").value.trim();
    const room = document.querySelector('input[name="room"]:checked');
    const breakTime = document.getElementById("breakTime").value;

    // 💡 Logic การจัดการค่า additionalInfo
    let additionalInfo = document.getElementById("additionalInfo").value;
    
    // ถ้าเลือก "other" ให้ไปเอาค่าจากกล่องข้อความอื่นมาแทน
    if (additionalInfo === "other") {
        const otherText = document.getElementById("otherText").value.trim();
        if (otherText.length > 0) {
            additionalInfo = "อื่นๆ: " + otherText; // ส่งเป็น "อื่นๆ: [ข้อความที่กรอก]"
        } else {
            showStatus("❌ กรุณาระบุรายละเอียดในช่อง 'อื่นๆ'", false);
            return; // หยุดการ Submit
        }
    } else if (additionalInfo === "") {
        // เพิ่ม Validation ให้เลือกรายการปกติด้วย
        showStatus("❌ กรุณาเลือกอุปกรณ์เพิ่มเติม", false);
        return;
    }
    // จบ Logic additionalInfo

    // Validation ทั่วไป
    if (!room) {
        showStatus("❌ กรุณาเลือกห้องประชุม", false);
        return;
    }

    if (startTime >= endTime) {
        showStatus("❌ เวลาเริ่มต้นต้องมาก่อนเวลาสิ้นสุด", false);
        return;
    }

    if (!breakTime || breakTime === "") {
        showStatus("❌ กรุณาเลือกช่วงเวลาพัก", false);
        return;
    }

    if (purpose.length < 5) {
        showStatus("❌ กรุณาระบุวัตถุประสงค์ให้ชัดเจน (อย่างน้อย 5 ตัวอักษร)", false);
        return;
    }

    // สร้าง URLSearchParams เพื่อส่งให้ GAS
    const params = new URLSearchParams();
    params.append("fullName", fullName);
    params.append("email", email);
    params.append("department", department);
    params.append("participants", participants);
    params.append("bookingDate", bookingDate);
    params.append("startTime", startTime);
    params.append("endTime", endTime);

    // ส่งค่าที่แก้แล้ว
    params.append("purpose", purpose);
    params.append("additionalInfo", additionalInfo); // ส่งค่าที่ถูกจัดการแล้ว

    params.append("room", room.value);
    params.append("breakTime", breakTime);
    params.append("timestamp", new Date().toISOString());

    submitForm(params);
});
