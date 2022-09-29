document.querySelectorAll(".form-name").forEach((el) => {
    el.addEventListener("click", (e) => {
        const formClass = e.target.dataset.formClass;
        document.querySelector("."+formClass).classList.add("active");
        e.target.parentNode.parentNode.classList.remove("active");
    });
});