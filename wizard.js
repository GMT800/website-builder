const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next");
const options = document.querySelectorAll(".option");
const progressBar = document.getElementById("progressBar");

let currentStep = 0;

let data = {
    siteType: "",
    sections: [],
    style: "",
    theme: ""
};

// اختيار الأزرار
options.forEach(btn => {
    btn.addEventListener("click", () => {

        const parent = btn.parentElement;

        // multi select
        if (parent.classList.contains("multi")) {
            btn.classList.toggle("active");
        } else {
            parent.querySelectorAll(".option").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        }
    });
});

// Next
nextBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        saveData(index);

        steps[currentStep].classList.remove("active");
        currentStep++;

        steps[currentStep].classList.add("active");

        updateProgress();
    });
});

// حفظ البيانات
function saveData(step) {

    const active = steps[step].querySelectorAll(".option.active");

    if (step === 0) data.siteType = active[0]?.dataset.value;

    if (step === 1) {
        data.sections = Array.from(active).map(el => el.dataset.value);
    }

    if (step === 2) data.style = active[0]?.dataset.value;

    if (step === 3) data.theme = active[0]?.dataset.value;

    localStorage.setItem("userData", JSON.stringify(data));
}

// Progress
function updateProgress() {
    const percent = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = percent + "%";
}

// Finish
document.getElementById("finish").addEventListener("click", () => {
    saveData(3);
    window.location.href = "preview.html";
});
