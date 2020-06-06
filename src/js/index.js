import "../scss/core/style.scss";
import Swiper from "swiper";
import "../../node_modules/swiper/css/swiper.min.css";

var mySwiper = new Swiper(".swiper-container", {
	slidesPerView: "auto",
	spaceBetween: 0,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

let mainContainer = document.querySelector(".main-container");
let header = mainContainer.querySelector(".header");
let page = mainContainer.querySelector(".page");
let sections = document.querySelectorAll(".section");
let burger = document.querySelector(".header__button--burger");
let chat = document.querySelectorAll(".button--chat");
let mobile = document.querySelector(".mobile");
let mobileMenu = mobile.querySelector(".mobile-menu");
let closeMobile = mobile.querySelector(".button--close");
let modal = document.querySelector(".modal");
let modalContainer = modal.querySelector(".modal-container");
let modalForm = modal.querySelector(".modal__form");
let closeModal = modal.querySelector(".button--close");
let call = document.querySelectorAll(".button--call");
let modalInputTel = modal.querySelector(".field-form[type=tel]");
let pageContainer = document.querySelector(".page-container");
let readMore = pageContainer.querySelector(".content__detail");
let minSize = 1300;

function hideInputs() {
	let arrModalInput = modal.querySelectorAll(".field-form");
	for (let i = 0; i < arrModalInput.length; i++) {
		if (
			arrModalInput[i].getAttribute("name") != "tel" &&
			arrModalInput[i].getAttribute("name") != "request-call"
		) {
			arrModalInput[i].classList.add("hidden");
		}
	}
}

function showInputs() {
	let arrModalInput = modal.querySelectorAll(".field-form");
	for (let i = 0; i < arrModalInput.length; i++) {
		arrModalInput[i].classList.remove("hidden");
	}
}

function calculateCoordinate() {
	let windowWidth = document.documentElement.offsetWidth;
	let mainContainerWidth = mainContainer.offsetWidth;
	let modalContainerWidth = modalContainer.offsetWidth;
	let finishWidth =
		(windowWidth - mainContainerWidth) / 2 +
		(mainContainerWidth - modalContainerWidth);

	return finishWidth;
}

function build(text, padding_bottom, form_name) {
	modal.querySelector(".modal__text").textContent = text;
	modalContainer.style.paddingBottom = padding_bottom + "px";
	modalInputTel.setAttribute("name", form_name);
}

function changeModalTransform() {
	modalContainer.style.transform = `translate(${calculateCoordinate()}px, 0px)`;
}

function showModal() {
	mobile.classList.add("mobile--hidden");
	modal.classList.remove("hidden");
	document.body.classList.add("noScroll");
}

function hideModal() {
	modal.classList.add("hidden");
	document.body.classList.remove("noScroll");
}

function cleanForm(form) {
	let fields = form.querySelectorAll(".field-form");
	for (let i = 0; i < fields.length; i++) {
		fields[i].value = "";
	}
}

function addPadding() {
	let mainContainerWidth = mainContainer.offsetWidth;
	if (mainContainerWidth >= minSize) {
		mainContainer.classList.add("globalPadding");
	}
}

function removePadding() {
	mainContainer.classList.remove("globalPadding");
}

function startModalTransform() {
	let windowWidth = document.body.clientWidth;
	modalContainer.style.transform = `translate(${windowWidth + 200}px, 0px)`;
}

function startMobileTransform() {
	mobileMenu.style.transform = "translate(-500px, 0px)";
}

function changeMobileTransform() {
	mobileMenu.style.transform = "translate(0px, 0px)";
}

function showMobile() {
	mobile.classList.remove("mobile--hidden");
	document.body.classList.add("noScroll");
}

function hideMobile() {
	mobile.classList.add("mobile--hidden");
	document.body.classList.remove("noScroll");
}

function blur() {
	header.style.filter = "blur(2px)";
	page.style.filter = "blur(2px)";

	if (document.documentElement.offsetWidth >= 1440) {
		mobile.style.filter = "blur(2px)";
	}
}

function blurNot() {
	header.style.filter = "blur(0px)";
	page.style.filter = "blur(0px)";
	mobile.style.filter = "blur(0px)";
}

function fixTransition() {
	header.classList.add("transition");
	page.classList.add("transition");

	if (document.documentElement.offsetWidth >= 1440) {
		mobile.classList.add("transition");
	}
}

function unfixTransition() {
	header.classList.remove("transition");
	page.classList.remove("transition");
}

function dark() {
	modal.style.background = "rgba(0, 0, 0, 0.2)";
	mobile.style.background = "rgba(0, 0, 0, 0.2)";
}

function darkNot() {
	modal.style.background = "rgba(0, 0, 0, 0)";
	mobile.style.background = "rgba(0, 0, 0, 0)";
}

function workModalWindows() {
	for (let i = 0; i < chat.length; i++) {
		chat[i].addEventListener("click", () => {
			startModalTransform();
			showModal();
			build("Обратная связь", 75, "tel");
			showInputs();
			changeModalTransform();
			fixTransition();
			blur();
			dark();
			addPadding();
		});
	}

	for (let i = 0; i < call.length; i++) {
		call[i].addEventListener("click", () => {
			startModalTransform();
			showModal();
			build("Заказать звонок", 338, "request-call");
			hideInputs();
			changeModalTransform();
			fixTransition();
			blur();
			dark();
			addPadding();
		});
	}

	closeModal.addEventListener("click", () => {
		startModalTransform();
		blurNot();
		darkNot();
		window.setTimeout(() => {
			cleanForm(modalForm);
			hideModal();
			removePadding();
		}, 500);
	});
}

function workMoreDetails() {
	for (let i = 0; i < sections.length; i++) {
		let catalog = sections[i].querySelector(".section__catalog");
		let showMore = sections[i].querySelector(".detail--show");
		let hideMore = sections[i].querySelector(".detail--hide");

		showMore.addEventListener("click", () => {
			catalog.classList.remove("section__hidden");
			showMore.classList.add("hidden");
			hideMore.classList.remove("hidden");
		});
		hideMore.addEventListener("click", () => {
			catalog.classList.add("section__hidden");
			showMore.classList.remove("hidden");
			hideMore.classList.add("hidden");
		});
	}
	readMore.addEventListener("click", (evt) => {
		let arrFragment = pageContainer.querySelectorAll(".fragment");
		for (let i = 0; i < arrFragment.length; i++) {
			if (
				arrFragment[i].classList.contains("fragment") &&
				arrFragment[i].classList.contains("paragraph")
			) {
				arrFragment[i].style.display = "block";
			} else {
				arrFragment[i].style.display = "inline";
			}
		}
		evt.target.style.display = "none";
	});
}

function workMobileMenu() {
	burger.addEventListener("click", () => {
		startMobileTransform();
		showMobile();
		window.setTimeout(() => {
			changeMobileTransform();
		}, 0.0001);
		fixTransition();
		blur();
		dark();
		addPadding();
	});
	closeMobile.addEventListener("click", () => {
		startMobileTransform();
		blurNot();
		darkNot();
		window.setTimeout(() => {
			hideMobile();
			removePadding();
		}, 500);
	});
	mobile.addEventListener("click", (evt) => {
		if (evt.target.closest(".mobile-menu") == null) {
			hideMobile();
			unfixTransition();
			blurNot();
			darkNot();
			removePadding();
		}
	});
}

workModalWindows();
workMoreDetails();
workMobileMenu();