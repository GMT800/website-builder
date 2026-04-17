// =====================
// عناصر الصفحة
// =====================
const startBtn = document.getElementById("startBtn");
const landing = document.getElementById("landing");
const wizard = document.getElementById("wizard");
const preview = document.getElementById("preview");

const steps = document.querySelectorAll(".step");
const nextButtons = document.querySelectorAll(".next");

const finishBtn = document.getElementById("finish");
const previewContainer = document.getElementById("previewContainer");
const restartBtn = document.getElementById("restart");

// =====================
// بيانات المستخدم
// =====================
let userData = {
    siteType: "",
    sections: [],
    style: "",
    theme: ""
};

// =====================
// بدء الـ Wizard
// =====================
startBtn.addEventListener("click", () => {
    landing.classList.add("hidden");
    wizard.classList.remove("hidden");
});

// =====================
// التنقل بين الخطوات
// =====================
let currentStep = 0;

nextButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        saveStepData(index);

        steps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");
    });
});

// =====================
// حفظ البيانات
// =====================
function saveStepData(stepIndex) {

    if (stepIndex === 0) {
        userData.siteType = document.getElementById("siteType").value;
    }

    if (stepIndex === 1) {
        const checked = document.querySelectorAll("input[type='checkbox']:checked");
        userData.sections = Array.from(checked).map(el => el.value);
    }

    if (stepIndex === 2) {
        userData.style = document.getElementById("style").value;
    }

    if (stepIndex === 3) {
        userData.theme = document.getElementById("theme").value;
    }

    // حفظ في localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
}

// =====================
// زر إنهاء
// =====================
finishBtn.addEventListener("click", () => {

    saveStepData(3);

    wizard.classList.add("hidden");
    preview.classList.remove("hidden");

    generatePreview();
});

// =====================
// إنشاء Preview
// =====================
function generatePreview() {

    // تحميل البيانات
    const data = JSON.parse(localStorage.getItem("userData"));

    let html = "";

    // Header
    html += `<h1>موقع ${data.siteType}</h1>`;

    // Sections
    if (data.sections.includes("about")) {
        html += `<section><h3>من نحن</h3><p>وصف بسيط...</p></section>`;
    }

    if (data.sections.includes("services")) {
        html += `<section><h3>خدماتنا</h3></section>`;
    }

    if (data.sections.includes("products")) {
        html += `<section><h3>منتجاتنا</h3></section>`;
    }

    if (data.sections.includes("contact")) {
        html += `<section><h3>تواصل معنا</h3></section>`;
    }

    previewContainer.innerHTML = html;

    applyTheme(data.theme);
}

// =====================
// تغيير الألوان
// =====================
function applyTheme(theme) {

    if (theme === "dark") {
        previewContainer.style.background = "#222";
        previewContainer.style.color = "#fff";
    }

    if (theme === "light") {
        previewContainer.style.background = "#fff";
        previewContainer.style.color = "#000";
    }

    if (theme === "blue") {
        previewContainer.style.background = "#e7f0ff";
        previewContainer.style.color = "#003366";
    }

    if (theme === "auto") {
        previewContainer.style.background = "#f5f5f5";
        previewContainer.style.color = "#333";
    }
}

// =====================
// إعادة
// =====================
restartBtn.addEventListener("click", () => {
    location.reload();
});
