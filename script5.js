// ข้อมูลสมาชิกแต่ละคน
const members = [
    {
        img: "n10.jpg",
        name: "นาย ธันวา พาพินิจ",
        number: "10",
        grade: "ม.6/9",
        role: "สมาชิก",
        responsibility: "รับผิดชอบการพัฒนาโครงสร้างเว็บไซต์และระบบอินเทอร์เฟซ (HTML/CSS) พร้อมจัดทำเนื้อหาบทเรียนออนไลน์ หน่วยการเรียนรู้ที่ 1-3",
    },
    {
        img: "m6.jpg",
        name: "นาย ณัฐวุฒิ ผมงาม",
        number: "15",
        grade: "ม.6/9",
        role: "สมาชิก",
        responsibility: "รับผิดชอบการออกแบบประสบการณ์ผู้ใช้ (UX/UI) และการนำเข้าข้อมูลบทเรียนหน่วยที่ 1-3 สู่ระบบเว็บไซต์ให้มีความน่าสนใจและถูกต้อง",
    },
    {
        img: "m5.jpg",
        name: "นายสราวุธ แคล้วครบุรี",
        number: "16",
        grade: "ม.6/9",
        role: "สมาชิก",
        responsibility: "ทำโครงงานเอกสาร",
    },
    {
        img: "m4.jpg",
        name: "นางสาวกชพร แฉะกระโทก",
        number: "20",
        grade: "ม.6/9",
        role: "สมาชิก",
        responsibility: "ทำโครงงานเอกสาร",
    },
    {
        img: "m3.jpg",
        name: "นางสาวเกศกนก กกกระโทก",
        number: "33",
        grade: "ม.6/9",
        role: "สมาชิก",
        responsibility: "ทำโครงงานเอกสาร",
    },
    {
        img: "m2.jpg",
        name: "นางสาวสุภาพร สุขสุมิตร",
        number: "37",
        grade: "ม.6/9",
        role: "สมาชิก",
        responsibility: "ทำโครงงานเอกสาร",
    }
];

function openModal(index) {
    const member = members[index];
    const modal = document.getElementById('memberModal');

    // ใส่ข้อมูล
    document.getElementById('modalImg').src = member.img;
    document.getElementById('modalName').textContent = member.name;
    document.getElementById('modalClass').textContent = `เลขที่ ${member.number} ชั้น ${member.grade}`;
    document.getElementById('modalFullName').textContent = member.name;
    document.getElementById('modalNumber').textContent = member.number;
    document.getElementById('modalGrade').textContent = member.grade;
    document.getElementById('modalRole').textContent = member.role;
    document.getElementById('modalResponsibility').textContent = member.responsibility;

    // 1. ตั้งค่า display เป็น flex ก่อน เพื่อให้ browser วาดกล่องขึ้นมา
    modal.style.display = 'flex';

    // 2. ใช้ setTimeout เล็กน้อยเพื่อให้ transition ทำงาน (Trick ของ CSS)
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    document.body.style.overflow = 'hidden'; // ล็อกสกอร์บาร์
}

function closeModal() {
    const modal = document.getElementById('memberModal');

    // 1. เพิ่ม class closing เพื่อเล่น Animation ขาออก
    modal.classList.add('closing');
    modal.classList.remove('active');

    // 2. รอ 300ms (เท่ากับเวลา transition ใน CSS) แล้วค่อยซ่อนจริงๆ
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        document.body.style.overflow = 'auto'; // คืนค่าสกอร์บาร์
    }, 300);
}

function closeModalOutside(event) {
    if (event.target.id === 'memberModal') {
        closeModal();
    }
}

// ปิด Modal เมื่อกด ESC
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('memberModal');
        // เช็คว่า modal เปิดอยู่ไหมก่อนสั่งปิด
        if (modal.style.display === 'flex') {
            closeModal();
        }
    }
});