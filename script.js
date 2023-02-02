const body = document.querySelector('body');
const btnsNav = document.querySelectorAll('.btn-nav')
const formSection = document.querySelector('.form-frame')
const steps = document.querySelectorAll('.step');
const sidebarSteps = document.querySelectorAll('.nav-item');
const btnPrevStep = document.querySelector('.btn-left');
const btnNextStep = document.querySelector('.btn-right');

// Step - 1 Elements
const userInfo = document.querySelectorAll('.user-info');
const userName = document.querySelector('input[name="username"]');
const userEmail = document.querySelector('input[name="email"]');
const userPhone = document.querySelector('input[name="ph-number"]');

// Step - 2 Elements
const plans = document.querySelectorAll('.plan');
const plansInfo = document.querySelectorAll('.plan-info');
const planType = document.querySelector('.plan-type-slider');

// Step - 3 Elements
const addons = document.querySelectorAll('.addon');

// Global Variables
let currentStep = 1;
let userPlan = 'Monthly';
let errorMsg;

// Class to store the data entered by user
class FormData {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;

  }
  planSelected;
  planCost;
  planMonthlyCost = [9, 12, 15];
  planYearlyCost = [90, 120, 150];

  addonsSelected = [];
  addonsCost = [];
  addonMonthlyCost = [1, 2, 2];
  addonYearlyCost = [10, 20, 20];
};
let user = new FormData('a', 'a', 'a');

// To hide and display steps
const displayStep = stepToOpen => {
  const stepNum = stepToOpen.dataset.step;
  btnPrevStep.style.display = 'inline-block';
  btnNextStep.style.display = 'inline-block';
  btnNextStep.textContent = 'Next Step';
  btnNextStep.style.backgroundColor= 'rgb(2, 41, 90)';
  steps[4].classList.remove('visible-step');
  steps.forEach(step => step.classList.remove('visible-step'));
  sidebarSteps.forEach(el => el.classList.remove('active-step'));
  if(stepNum == 1) {
    steps[0].classList.add('visible-step');
    sidebarSteps[0].classList.add('active-step');
    btnPrevStep.style.display = 'none';
  }
  if(stepNum == 2) {
    steps[1].classList.add('visible-step')
    sidebarSteps[1].classList.add('active-step');
  }
  if(stepNum == 3) {
    steps[2].classList.add('visible-step');
    sidebarSteps[2].classList.add('active-step');
  }
  if(stepNum == 4) {
    steps[3].classList.add('visible-step');
    sidebarSteps[3].classList.add('active-step');
    btnNextStep.textContent = 'Confirm';
    btnNextStep.style.backgroundColor= 'rgb(71, 61, 255)';
  }
}
displayStep(btnsNav[0]);

const openStep = () => {
  btnsNav.forEach(btn => btn.classList.remove('active-btn'));
  btnsNav[currentStep - 1].classList.add('active-btn')
  displayStep(btnsNav[currentStep - 1]);
}

// To set and change subscribtion plan
const updatePlans = (planSelected) => {
  user.planSelected = planSelected.querySelector('.plan-name').textContent;
  user.planTypeSelected = userPlan;
  if(userPlan === 'Monthly') user.planCost = user.planMonthlyCost[planSelected.dataset.plan - 1];
  else user.planCost = user.planYearlyCost[planSelected.dataset.plan - 1];
}

const selectPlan = (e) => {
  const planSelected = e.target.closest('.plan');
  plans.forEach(plan => plan.classList.remove('selected-plan'))
  planSelected.classList.add('selected-plan');
  updatePlans(planSelected);
}

const planPricingType = () => {
  document.querySelectorAll('.free-in-plan').forEach(el => el.style.display = 'none');
  if(userPlan === 'Monthly') {
    user.planMonthlyCost.forEach((price, i) => document.querySelectorAll('.plan-pricing')[i].textContent = `$${price}/mo`);
  }
  else {
    user.planYearlyCost.forEach((price, i) => document.querySelectorAll('.plan-pricing')[i].textContent = `$${price}/yr`);
    document.querySelectorAll('.free-in-plan').forEach(el => el.style.display = 'inline-block');
  }
  updatePlans(document.querySelectorAll('.input-fields')[1].querySelector('.selected-plan'));
}


// To change plan type (monthly or yearly)
const changePlanType = () => {
  document.querySelectorAll('.plan-type').forEach((plan) => (plan.style.color = 'rgb(150, 153, 171)'));
  userPlan = planType.checked ? 'Yearly' : 'Monthly';
  if(userPlan === 'Yearly') document.querySelector('.plan-type-yearly').style.color = 'rgb(2, 41, 90)';
  else document.querySelector('.plan-type-monthly').style.color = 'rgb(2, 41, 90)';
  planPricingType();
  addonPricingType();
}
changePlanType();


// To change addon type (monthly or yearly)
function addonPricingType() {
  if(userPlan == 'Monthly') {
    user.addonMonthlyCost.forEach((price, i) => document.querySelectorAll('.addon-pricing')[i].textContent = `$${price}/mo`);
  }
  else user.addonYearlyCost.forEach((price, i) => document.querySelectorAll('.addon-pricing')[i].textContent = `$${price}/yr`)
}

// To select and deselect an addon
const toggleAddon = (e, addon) => {
  if(addon.querySelector('input').checked) addon.classList.add('selected-plan');
  else addon.classList.remove('selected-plan');
}


// Function to show an error with a given message
const showError = (err) => {
  let errorAudio = new Audio('./assets/audio/system-error-notice.mp3')
  const errorBox = document.querySelector('.error-msg-box');
  document.querySelector('.error-msg').textContent = err;
  errorBox.style.display = 'block';
  errorBox.style.animationName = 'error-ani';
  errorAudio.play();
  setTimeout(() => {
    errorBox.style.display = 'none';
  }, 2900);
}


// funtions to run on moving on to next step
// Validating inputs
const checkStep1 = () => {
  const nameReg = /^[a-zA-Z]+[a-zA-Z ]+$/
  const isName = nameReg.test(userName.value);
  const emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z0-9]+$/;
  const isEmail = emailReg.test(userEmail.value);
  const phoneReg = /^[\+1-9]+[ 0-9]{9,}$/;
  const isPhone = phoneReg.test(userPhone.value);
  if(!isName || !isEmail || !isPhone) {
    if(!isName) errorMsg = 'Invalid Name';
    if(!isEmail) errorMsg = 'Invalid Email Address';
    if(!isPhone) errorMsg = 'Invalid Phone Number';
    showError(errorMsg);
    return false;
  }
  else {
    user = new FormData(userName.value, userEmail.value, userPhone.value);
    return true;
  }
}


const clearAddons = () => {
  user.addonsSelected = [];
  user.addonsCost = [];
}

const checkStep3 = () => {
  clearAddons();
  addons.forEach((addon, i) => {
    user.addonsSelected[i] = 0;
    user.addonsCost[i] = 0;
    if(addon.querySelector('input').checked) {
      user.addonsSelected[i] = addon.querySelector('.addon-name').textContent;
      user.addonsCost[i] = userPlan === 'Monthly' ? user.addonMonthlyCost[i] : user.addonYearlyCost[i];
    }
  })

}

const checkStep4 = () => {
  let totalCost = 0;
  if(userPlan === 'Monthly') {
    document.querySelector('.final-plan-name').textContent = `${user.planSelected} (${userPlan})`;
    document.querySelector('.final-plan-pricing').textContent = `$${user.planCost}/mo`;
    totalCost += +user.planCost;

    if(user.addonsSelected.length > 0) {
      user.addonsSelected.forEach((addon, i) => {
        document.querySelectorAll('.final-addon-info')[i].style.display = 'none';
        if(addon) {
          document.querySelectorAll('.final-addon-info')[i].style.display = 'flex';
          document.querySelectorAll('.final-addon-price')[i].textContent =`+$${user.addonMonthlyCost[i]}/mo`;
          totalCost += +user.addonMonthlyCost[i];
        }
      })
    }
    document.querySelector('.total-as-plan').textContent = 'Total per month';
    document.querySelector('.total-price').textContent = `+$${totalCost}/mo`;
  }
  else {
    document.querySelector('.final-plan-name').textContent = `${user.planSelected} (${userPlan})`;
    document.querySelector('.final-plan-pricing').textContent = `$${user.planCost}/yr`;
    totalCost += +user.planCost;

    if(user.addonsSelected.length > 0) {
      user.addonsSelected.forEach((addon, i) => {
        document.querySelectorAll('.final-addon-info')[i].style.display = 'none';
        if(addon) {
          document.querySelectorAll('.final-addon-info')[i].style.display = 'flex';
          document.querySelectorAll('.final-addon-price')[i].textContent =`+$${user.addonYearlyCost[i]}/yr`;
          totalCost += +user.addonYearlyCost[i];
        }
      })
    }
    document.querySelector('.total-as-plan').textContent = 'Total per year';
    document.querySelector('.total-price').textContent = `+$${totalCost}/yr`
  }
}

const lastStep = () => {
  steps.forEach(step => step.classList.remove('visible-step'));
  steps[4].classList.add('visible-step');
  btnNextStep.style.display = 'none';
  btnPrevStep.style.display = 'none';
}


const nextStep = () => {
  if(currentStep === 1 && checkStep1()) {
    currentStep++;
    openStep();
    return;
  }
  if(currentStep === 2) {
    currentStep++;
    changePlanType();
    openStep();
    return;
  }
  if(currentStep === 3) {
    checkStep3();
    currentStep++;
    openStep();
    checkStep4();
    return;
  }
  if(currentStep === 4) {
    openStep();
    currentStep++;
    lastStep();
    return;
  }
}
const prevStep = () => {
  currentStep--;
  openStep();
}



// Event Listeners
window.addEventListener('keydown', (e) => {
  if(e.key === "Enter") nextStep();
})
btnNextStep.addEventListener('click', nextStep)
btnPrevStep.addEventListener('click', prevStep)
plans.forEach(plan => {
  plan.addEventListener('click', (e) => selectPlan(e));
})
planType.addEventListener('change', changePlanType)
addons.forEach(addon => {
  addon.addEventListener('change', (e) => toggleAddon(e, addon))
})
document.querySelector('.plan-change').addEventListener('click', () => {
  currentStep = 2;
  openStep(undefined)
})