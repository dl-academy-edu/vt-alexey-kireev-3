const SERVER_URL = 'https://academy.directlinedev.com';
const VERSION_API = '1.0.0';

const SingInpopup = document.querySelector('.SignIn-popup_js');
const mobileSingInpopup = document.querySelector('.mobile-SignIn-popup_js');
const SignInpopup = document.querySelector('.SignInOpen-popup_js');
const mobileSignInpopup = document.querySelector('.mobile-SignInOpen-popup_js');
const registerpopup = document.querySelector('.Register-popup_js');
const mobileregisterpopup = document.querySelector('.mobile-Register-popup_js');
const RegisterOpenpopup = document.querySelector('.RegisterOpen-popup_js');
const mobileRegisterOpenpopup = document.querySelector('.mobile-RegisterOpen-popup_js');
const profile = document.querySelector('.profile_js');
const mobileprofile = document.querySelector('.mobile-profile_js');
const OutProfile = document.querySelector(".singout_js");
const OutProfileMobile = document.querySelector(".mobile-singout_js");

const registerForm = document.forms.register;
const signIn = document.forms.signIn;
const MessageOpenpopup = document.querySelector('.MessageOpen-popup_js');
const Messagegoodpopup = document.querySelector('.Messagegood-popup_js');
const Messagebadpopup = document.querySelector('.Messagebad-popup_js');
const MessageButton = document.querySelector('.MessageButton_js');
const Emailsend = document.querySelector('.Emailsend_js');
const MassageForm = document.querySelector('.MassageForm_js');
const Massagegood = document.querySelector('.goodmessage_js');
const Massagebad = document.querySelector('.badMessage_js');
const registerCheck = document.querySelector('.registerCheck_js');
const registerButton = document.querySelector('.registerButton_js');
const Buttonsend = document.querySelector('.Buttonsend_js');
const Checkboxsend = document.querySelector('.Checkboxsend_js');

 


//active page

let pageId = document.querySelector("[data-id-page]").getAttribute("data-id-page"),
  navItem = document.querySelector(`[data-id-nav=${pageId}]`);

if (pageId == navItem.getAttribute("data-id-nav")) {
  navItem.classList.add("header__link_active");
}


//active page mobile

let pageIdMobile = document.querySelector("[data-id-page]").getAttribute("data-id-page"),
  navItemMobile = document.querySelector(`[data-id-nav-mobile=${pageIdMobile}]`);

if (pageIdMobile == navItemMobile.getAttribute("data-id-nav-mobile")) {
  navItemMobile.classList.add("mobile-header__link_active");
}


//buttons

let buttonSingin = document.querySelector(".button-sing-in_js");
let buttonreg = document.querySelector(".button-reg_js");
let buttonmessage = document.querySelector(".button-message_js");
let buttonpassword = document.querySelector(".button-password_js");

function InvalidButtonSingIn() {
  buttonSingin.classList.remove("button_good");
  buttonSingin.classList.add("button_bad");
}

function ValidButtonSingIn() {
  buttonSingin.classList.remove("button_bad");
  buttonSingin.classList.add("button_good");
}

function InvalidButtonreg() {
  buttonreg.classList.remove("button_good");
  buttonreg.classList.add("button_bad");
}

function ValidButtonreg() {
  buttonreg.classList.remove("button_bad");
  buttonreg.classList.add("button_good");
}

function InvalidButtonmessage() {
  buttonmessage.classList.remove("button_good");
  buttonmessage.classList.add("button_bad");
}

function ValidButtonmessage() {
  buttonmessage.classList.remove("button_bad");
  buttonmessage.classList.add("button_good");
}

function InvalidButtonpassword() {
  buttonpassword.classList.remove("button_good");
  buttonpassword.classList.add("button_bad");
}

function ValidButtonpassword() {
  buttonpassword.classList.remove("button_bad");
  buttonpassword.classList.add("button_good");
}


//token

function updateToken(response) {
  localStorage.setItem('token', response.token);
  localStorage.setItem('userId', response.userId);
}

function headerUpdate() {
  if (localStorage.getItem('token')) {
    SingInpopup.classList.add('hidden');
    mobileSingInpopup.classList.add('hidden');
    registerpopup.classList.add('hidden');
    mobileregisterpopup.classList.add('hidden');
    profile.classList.remove('hidden');
    mobileprofile.classList.remove('hidden');
    OutProfile.classList.remove("hidden");
    OutProfileMobile.classList.remove("hidden");
  } else {
    SingInpopup.classList.remove('hidden');
    mobileSingInpopup.classList.remove('hidden');
    registerpopup.classList.remove('hidden');
    mobileregisterpopup.classList.remove('hidden');
    profile.classList.add('hidden');
    mobileprofile.classList.add('hidden');
    OutProfile.classList.add("hidden");
    OutProfileMobile.classList.add("hidden");
  }
}

// loader

const loaderinner = document.querySelector(".loaderinner_js");

function preloaderCreater() {
  return `
  <div class="loader-inner">
  <div class="loader-inner__loader"></div>
  </div>
  `;
}

function preloaderCreaterblog() {
  return `
  <div class="loader-inner__loader"></div>
  `;
}

//open popup login
(function () {

  let lastFocus;

  SingInpopup.addEventListener('click', function () {

    lastFocus = document.activeElement;
    SignInpopup.classList.add('popup_open');
    SignInpopup.querySelector('.popup__input').focus();


    let close = SignInpopup.querySelector('.popup__close');
    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);

    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      SignInpopup.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();

//mobile open popup login

(function () {

  let lastFocus;

  mobileSingInpopup.addEventListener('click', function () {

    lastFocus = document.activeElement;
    mobileSignInpopup.classList.add('popup_open');
    mobileSignInpopup.querySelector('.popup__input').focus();


    let close = mobileSignInpopup.querySelector('.popup__close');
    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);

    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      mobileSignInpopup.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();


//Register 
(function () {

  let removeArr = [];
  let isLoadingRegister = false;

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isLoadingRegister) {
      return
    }
    isLoadingRegister = true;
    const data = getFormData(event.target);
    let errors = validateData(data);
    removeArr.forEach(fn => fn());
    if (Object.keys(errors).length) {
      InvalidButtonreg()
      setFormError(registerForm, errors);
      isLoadingRegister = false;
      return
    }

    loaderinner.innerHTML = preloaderCreater();

    fetchData({
      method: 'POST',
      url: '/api/users',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setFormvalid(registerForm, data);

        if (res.success) {
          ValidButtonreg();
          setTimeout(function () {
            loaderinner.innerHTML = "";
            alert('Успешная регистрация')
            RegisterOpenpopup.classList.remove('popup_open');
          }, 1000);

        } else {
          throw res;
        }
        isLoadingRegister = false;
      })

  })
})();

// Open close popup Register
(function () {


  let lastFocus;

  mobileregisterpopup.addEventListener('click', function () {

    lastFocus = document.activeElement;
    mobileRegisterOpenpopup.classList.add('popup_open');
    mobileRegisterOpenpopup.querySelector('.popup__input').focus();


    let close = mobileRegisterOpenpopup.querySelector('.popup__close');

    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);


    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      mobileRegisterOpenpopup.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();

// Mobile Open close popup Register
(function () {

  let lastFocus;

  registerpopup.addEventListener('click', function () {

    lastFocus = document.activeElement;
    RegisterOpenpopup.classList.add('popup_open');
    RegisterOpenpopup.querySelector('.popup__input').focus();


    let close = RegisterOpenpopup.querySelector('.popup__close');

    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);


    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      RegisterOpenpopup.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();


//mobile-menu

var mobileHeader = document.querySelector(".mobile-header_js");
var headerMobileButton = document.querySelector(".header__mobile-button_js");
var mobileCloseButton = document.querySelector(".mobile-header__close-button_js");

headerMobileButton.addEventListener("click", function () {
  mobileHeader.classList.add("mobile-header_open");
});

mobileCloseButton.addEventListener("click", function () {
  mobileHeader.classList.remove("mobile-header_open");
});




/* Sing out profile */

let singOutProfile = document.querySelector(".singout_js");
let singOutProfileMobile = document.querySelector(".mobile-singout_js");

singOutProfile.addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.pathname = "/index.html";
});

singOutProfileMobile.addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.pathname = "/index.html";
});


//Validation

function validateData(data, errors = {}) {

  if (!checkEmail(data.email)) {
    errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
  }
  if (data.password != data.repeatPassword) {
    errors.password = 'The password and confirm password fields do not match.';
  }
  if (!data.password) {
    errors.password = 'This field is required';

  } else if (data.password.length < 8) {
    errors.password = 'The password is too short';
  }

  if (!data.name) {
    errors.name = 'This field is required';
  }

  
  if (!data.surname) {
    errors.surname = 'This field is required';
  }
  else if (data.surname === data.name) {
    errors.surname = 'Surname identical to name';
  }

  if (!data.location) {
    errors.location = 'This field is required';
  }
  if (+(data.age) <= 0) {
    errors.age = 'Age is incorrect';
  }
  return errors;
}

function validateDataLogin(data, errors = {}) {

  if (!checkEmail(data.email)) {
    errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
  }

  if (!data.password) {
    errors.password = 'This field is required';

  } else if (data.password.length < 8) {
    errors.password = 'The password is too short';
  }

  return errors;
}

function checkEmail(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function checkphone(phone) {
  return phone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

function validateSendMessage(data, errors = {}) {

  if (!checkEmail(data.email)) {
    errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
  }

  if (!checkphone(data.phone)) {
    errors.phone = 'This field is required';

  }
  if (!data.name) {
    errors.name = 'This field is required';
  }
  if (!data.messageSubject) {
    errors.messageSubject = 'This field is required';
  }
  return errors;
}

function getFormData(form, data = {}, type = 'json') {
  if (type === 'json') {
    let inputs = form.querySelectorAll('input');
    for (let input of inputs) {
      switch (input.type) {
        case 'radio':
          if (input.checked) {
            data[input.name] = input.value;
          }
          break;
        case 'checkbox':
          if (!data[input.name]) {
            data[input.name] = [];
          }
          if (input.checked) {
            data[input.name].push(input.value);
          }
          break;
        case 'file':
          data[input.name] = input.files;
          break;

        default:
          data[input.name] = input.value;
          break;
      }
    }

    return data;
  } else {
    return new FormData(form);
  }

}

//invalid form

function setInvalid(input) {
  function handl() {
    input.removeEventListener('input', handl);
    input.classList.remove("invalidInput");
  }
  input.classList.add("invalidInput");
  input.addEventListener('input', handl);
  return handl;
}
function giveInputFeedback(input, error) {
  function handl() {
    message.remove();
    input.removeEventListener('input', handl);
  }

  input.classList.add("invalidInput");
  let message = document.createElement('div');
  message.classList.add("invalidMessage");
  message.innerText = error;

  let nextMessage = input.nextElementSibling;
  if(nextMessage != null) {
    return
  }

  input.insertAdjacentElement("afterend", message);
  input.addEventListener("input", function handl(event){
    message.remove();
    input.removeEventListener("input", handl);
  })
  
  input.addEventListener('input', handl);
  return handl;
}

function setFormError(form, errors) {
  let removeArr = [];
  let inputs = form.querySelectorAll('input');

  for (let input of inputs) {
    if (errors[input.name]) {
      const remove1 = setInvalid(input);
      const remove2 = giveInputFeedback(input, errors[input.name]);
      removeArr.push(remove1, remove2);
    }
  }


  return removeArr;
}


// valid form

function setvalid(input) {
  function handll() {
    input.removeEventListener('input', handll);
    input.classList.remove("validInput");
  }
  input.classList.add("validInput");
  input.addEventListener('input', handll);
  return handll;
}

function giveInputFeedbackk(input) {
  function handll() {
    message.remove();
    input.removeEventListener('input', handll);
  }

  input.classList.add("validInput");
  let message = document.createElement('div');
  message.classList.add("valid-feedback");
  verifiedMessageInputCreate(input);
  input.insertAdjacentElement("afterend", message);

  input.addEventListener('input', handll);
  return handll;
}

function setFormvalid(form, errors) {
  let removeArr = [];
  let inputs = form.querySelectorAll('input');

  for (let input of inputs) {
    if (errors[input.name]) {
      const remove1 = setvalid(input);
      const remove2 = giveInputFeedbackk(input, errors[input.name]);
      removeArr.push(remove1, remove2);
    }
  }

  return removeArr;
}


function verifiedMessageInputCreate(input) {
  let message = document.createElement("div");
  message.classList.add("valid-feedback");
  message.innerText = 'All right';

  let nextMessage = input.nextElementSibling;
  if (nextMessage != null) {
    return
  }

  input.insertAdjacentElement("afterend", message);
  input.addEventListener("input", function handll(event) {
    message.remove();
    input.removeEventListener("input", handll);
  })
}


//login 

(function () {

  let isLoadingLogin = false;
  let removeArr = [];

  signIn.addEventListener('submit', function logIn(e) {
    e.preventDefault();
    if (isLoadingLogin) {
      return
    }
    isLoadingLogin = true;

    const data = getFormData(signIn);
    let errors = validateDataLogin(data);
    removeArr.forEach(fn => fn());
    if (Object.keys(errors).length) {
      InvalidButtonSingIn();
      errors.email = 'This combination, mail and password were not found!';
      setFormError(signIn, errors);
      isLoadingRegister = false;
      isLoadingLogin = false;
      return
    }

    loaderinner.innerHTML = preloaderCreater();

    fetchData({
      method: 'POST',
      url: '/api/users/login',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        ValidButtonSingIn();

        if (res.success) {
          setFormvalid(signIn, data);
          loaderinner.innerHTML = '';
          setTimeout(function () {
            alert('Пользователь успешно вошел, ID:\n' + res.data.userId)
            updateToken(res.data);
            headerUpdate();
            SignInpopup.classList.remove('popup_open');
            isLoadingLogin = false;
            isLoadingRegister = false;

          }, 1000);

        } else {
          throw errors;
        }
      })

      .catch(function (errors) {
        loaderinner.innerHTML = '';
        InvalidButtonSingIn();
        errors.email = 'This combination, mail and password were not found!';
        removeArr = setFormError(signIn, errors);
        isLoadingRegister = false;
        isLoadingLogin = false;
      });

  })

})();

headerUpdate();


 
//send message
(function () {
  MassageForm.addEventListener('submit', function (e) {
    sendMessage(e);
  })

})();

function sendMessage(event) {
  event.preventDefault();
  let isSending = false;
  let removeArr = [];

  if (isSending) {
    return
  }
  isSending = false;
  let data = getFormData(event.target);
  let errors = validateSendMessage(data);
  removeArr.forEach(fn => fn());
  if (Object.keys(errors).length) {
    InvalidButtonmessage();
    setFormError(event.target, errors);
    isSending = false;
    return
  }
  let items = {};
  items.body = JSON.stringify(data);
  items.to = '111@asdas.com'

  loaderinner.innerHTML = preloaderCreater();

  fetch(SERVER_URL + '/api/emails', {
    method: 'POST',
    body: JSON.stringify(items),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }

  })

    .then(res => res.json())
    .then(res => {
      setFormvalid(event.target, data);
        ValidButtonmessage();
      if (res.success)
        loaderinner.innerHTML = "";
      setTimeout(function () {
        loaderinner.innerHTML = "";
        MessageOpenpopup.classList.remove('popup_open');
        Massagegood.classList.add('popup_open');
      }, 1000);
    }
    )
    .catch(err => {
      loaderinner.innerHTML = "";
      MessageOpenpopup.classList.remove('popup_open');
      Massagebad.classList.add('popup_open');
    })
}

 
// Open popup Message good
(function () {

  let lastFocus;

  MessageButton.addEventListener('click', function () {

    lastFocus = document.activeElement;

    let close = Massagegood.querySelector('.popup__close');

    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);


    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      Massagegood.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();


// Open popup Message bad
(function () {

  let lastFocus;

  MessageButton.addEventListener('click', function () {

    lastFocus = document.activeElement;

    let close = Massagebad.querySelector('.popup__close');

    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);


    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      Massagebad.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();

 



//fetch

function fetchData({ method = 'GET', url = '', body = null, headers = {} }) {
  return fetch(SERVER_URL + url, {
    method: method,
    body: body,
    headers: headers,
  })
}

//checkbox

function setValueToForm(form, data) {
  let inputs = form.querySelectorAll('input');
  for (let input of inputs) {
    switch (input.type) {
      case 'radio':
        if (data[input.name] === input.value) {
          input.checked = true;
        }
        break;
      case 'checkbox':
        if (data[input.name] && data[input.name].includes(input.value)) {
          input.checked = true;
        }

        break;
      default:
        if (data[input.name])
          input.value = data[input.name];
        break;
    }
  }

  return data;
}

function isDisabled(elem, button) {
  if (elem.checked) {
    button.removeAttribute('disabled');
    button.classList.remove('button_disabled');
  }
  else {
    button.classList.add('button_disabled');
    button.setAttribute('disabled', 'disabled');
  }
}

(function () {

  registerCheck.addEventListener('click', function () {
    isDisabled(registerCheck, registerButton);
  })

})();

(function () {

  Checkboxsend.addEventListener('click', function () {
    isDisabled(Checkboxsend, Buttonsend);
  })

})();

// Open popup send Message 
(function () {

  let lastFocus;

  MessageButton.addEventListener('click', function () {

    lastFocus = document.activeElement;
    MessageOpenpopup.classList.add('popup_open');
    MessageOpenpopup.querySelector('.popup__input').focus();


    let close = MessageOpenpopup.querySelector('.popup__close');

    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);


    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      MessageOpenpopup.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();

//slider

function slider(selectorStr) {
  const selector = document.querySelector(selectorStr);
  const wrapper = selector.querySelector(".slider__wrapper");
  const innerWrapper = selector.querySelector(".slider__inner-wrapper");
  const pagination = selector.querySelector(".slider__pagination");
  const buttonBack = selector.querySelector(".slider__button_back");
  const buttonNext = selector.querySelector(".slider__button_next");
  const slides = selector.querySelectorAll(".slider_slide");

  let slideWidth = 0;

  let maxSlideIndex = innerWrapper.childElementCount - 1;
  let timerId = null;

  let activeSlide = +localStorage.getItem('activeSlide') || 0;
  let dots = [];
  initDots();
  setButtonState(buttonBack);

  function initSlideWidth() {
      slideWidth = wrapper.offsetWidth;
      for (let slide of slides) {
          slide.style.width = `${slideWidth}px`;
      }
  }
  initSlideWidth();

  function setButtonState(button, state = false) {
      if (state) {
          button.removeAttribute('disabled');
      } else {
          button.setAttribute('disabled', '');
      }
  }

  function setActiveSlide(index, withAnimation = true) {
      if (index < 0 || index > maxSlideIndex) {
          return;
      }
      clearTimeout(timerId);
      if (withAnimation) {
          innerWrapper.style.transition = 'transform 500ms';
          timerId = setTimeout(() => {
              innerWrapper.style.transition = '';
          }, 500);
      }
      setButtonState(buttonNext, true);
      setButtonState(buttonBack, true);
      index === 0 && setButtonState(buttonBack);
      index === maxSlideIndex && setButtonState(buttonNext);
      innerWrapper.style.transform = `translateX(${index * slideWidth * (-1)}px)`;
      dots[activeSlide].classList.remove('slider__dot_active');
      activeSlide = index;
      dots[activeSlide].classList.add('slider__dot_active');
      localStorage.setItem('activeSlide', activeSlide);
  }

  buttonNext.addEventListener('click', function () {
      setActiveSlide(activeSlide + 1);
  });

  buttonBack.addEventListener('click', function () {
      setActiveSlide(activeSlide - 1);
  });

  window.addEventListener('resize', function () {
      initSlideWidth();
      setActiveSlide(activeSlide, false);
  });

  let isTouch = false;
  let startX = 0;
  let endX = 0;
  wrapper.addEventListener('touchstart', function (e) {
      if (isTouch) return;
      isTouch = true;
      startX = e.touches[0].pageX;
  });

  wrapper.addEventListener('touchmove', function (e) {
      if (!isTouch) return;
      endX = e.touches[0].pageX;
  });

  wrapper.addEventListener('touchend', function (e) {
      if (!isTouch) return;
      isTouch = false;
      if (Math.abs(startX - endX) < 50) {
          return;
      }
      if (startX - endX < 0) {
          setActiveSlide(activeSlide - 1);
      }

      if (startX - endX > 0) {
          setActiveSlide(activeSlide + 1);
      }
  });

  function initDots() {
      for (let i = 0; i < maxSlideIndex + 1; i++) {
          let dot = document.createElement('button');
          dot.classList.add('slider__dot');
          if (i === activeSlide) {
              dot.classList.add('slider__dot_active');
          }
          dots.push(dot);
          dot.addEventListener('click', function () {
              setActiveSlide(i);
          })
          pagination.insertAdjacentElement('beforeend', dot);
      }
  }

  setActiveSlide(activeSlide, false);

  return {
      setActiveSlide,
      next: () => setActiveSlide(activeSlide + 1),
      prev: () => setActiveSlide(activeSlide - 1),
  }
}

const mySlider = slider('.slider');


// swiper

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    color: '#000',
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


// rating

const ratings = {
  html: 85,
  css: 55,
  js: 5,
  git: 15,
  figma: 80,
}

const starsTotal = 100;
document.addEventListener('DOMContentLoaded', getRatings);

function getRatings() {
  for (let rating in ratings) {

    const starPercentage = (ratings[rating] / starsTotal) * 100;

    const starPercentageRounded = `${Math.round(starPercentage / 1) * 1}%`;

    document.querySelector(`.${rating} .skills__level-inner`).style.width = starPercentageRounded;

    document.querySelector(`.${rating} .skills__value`).innerHTML = ratings[rating];
  }
};



 