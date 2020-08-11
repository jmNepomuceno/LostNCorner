// open/close phone
const phoneBtn = document.getElementById('see-phone-btn');
const mobile = document.querySelector('.mobile');
const mobileScreen = document.querySelector('.screen')
const mobilePwrBtn = document.querySelector('.power-btn')
let pwrBtnCont = 0;
let pwrBtnOn = false;
let mobileOpen = true;
const phoneReturnBtn = document.querySelector('.phone-return-div');

//variables for message div
const msgIcon = document.getElementById('message-icon');
const msgNotif = document.querySelector('.notif-div');

const msgDiv = document.querySelector('.message-div');

//convo 1
const convo_one = document.querySelector('.convo-1');
const frnd_one = document.querySelector('.friend-1')
const msgNotifConvo1 = document.querySelector('.notif-div-convo-1');

//convo 2
/*
	note: every hour or every 2 hours , someone will message the users
	convo 2 will appear when it is 8 AM
	convo 3 - N is still to be determine
*/
let showConvo_two = false;
const convo_two = document.querySelector('.convo-2');
const frnd_two = document.querySelector('.friend-2')
const msgNotifConvo2 = document.querySelector('.notif-div-convo-2');
let showNotifFriend2 = false;

//map div
const mapBtn = document.getElementById('see-map-btn');
const map = document.querySelector('.map-div');
let mapOpen = false;

//items div
const itemsBtn = document.getElementById('see-items-btn');
const itemsDiv = document.querySelector('.items-div')
const inventoryDiv = document.querySelector('.inventory-div');
let itemsOpen = false;

const checkBox = document.querySelectorAll('.checkboxes')
// checkBox[0].checked = true;
// checkBox[4].checked = true;


//reminder divs
const okClick = document.querySelectorAll('.okay-click');
const reminderDiv1 = document.querySelector('.reminder-div-1');
const reminderDiv2 = document.querySelector('.reminder-div-2');
const reminderDiv3 = document.querySelector('.reminder-div-3');
const reminderDiv4 = document.querySelector('.reminder-div-4');
const reminderDiv5 = document.querySelector('.reminder-div-5');
const reminderDiv6 = document.querySelector('.reminder-div-6');
const reminderDiv7 = document.querySelector('.reminder-div-7');

// nav btns div
const navBtns = document.querySelector('.nav-btns');

//clock div
const clock = document.querySelector('.clock')
let am_pm = document.querySelector('.A-P-span');

//variables for clock
const deg = 6;
const  hr =document.querySelector('#hr');
const  mn =document.querySelector('#mn');
const  sc =document.querySelector('#sc');

//phone date text 
const phoneTime = document.getElementById('phone-time')
let phoneAM = true

let clockVar;

let hh = 7;
let mm = 0;
let ss = 0;

function pageLoad(){
	//mapBtn.style.pointerEvents = "none"
	itemsBtn.style.pointerEvents = "none"
	phoneBtn.style.pointerEvents = "none"
}


if (localStorage.getItem("minutes") !== null) {
    mm = localStorage.getItem("minutes");
    mm = parseInt(mm)
}

if (localStorage.getItem("hours") !== null) {
    hh = localStorage.getItem("hours");
    hh = parseInt(hh)
}

// nakalimutan ko para saan to HAHAAHA para pag ni refresh mo yung page 2, babalik ulit sa 7:00am ,
//pero tuloy tuloy pa din run ng timer sa next page
mm = 0;
hh = 7;
ss = 0;

function clockLoad(){
	clockVar = setInterval(function(){
			//clearInterval(clockVar)
			ss++;

			if(ss == 360){
				ss = 0;
				mm += 15;
			}

			if(mm == 360){
				mm = 0;
				hh += 1;
			}

			if(hh == 24){
				// end of the day
				clearInterval(clockVar)
			}

			hr.style.transform = "rotate(" + (hh * 30) + "deg)";
			mn.style.transform = "rotate(" + (mm) + "deg)";

			localStorage.setItem("minutes",mm);
			localStorage.setItem("hours",hh);

			//also update the time in the phone
			let mm_str = parseInt(mm/6)

			if(mm_str <= 9){
				phoneTime.textContent = (phoneAM) ?  hh + ":0" + mm_str +  "am" :  hh + ":0" + mm_str + "pm"
			}else{
				phoneTime.textContent = (phoneAM) ?  hh + ":" + mm_str +  "am" :  hh + ":" + mm_str + "pm"
			}

			// second message/convo shows up
			if(hh == 8){
				showConvo_two = true;
				showNotifFriend2 = true
			}

			//am or pm
			if(hh >= 12){
				am_pm.textContent = "P"
			}else{
				am_pm.textContent = "A"
			}
	}, 20)//adjust mo na lang yung timer dito.
}


/*phone open/close btn*/

phoneBtn.addEventListener('click' , function(){

	/* second convo/message will pop , only if the USER click the PHONE VIEW btn and open his/her phone at 8 AM
	*/
	if(showNotifFriend2 == true){
		msgNotif.style.visibility = "visible"
		showNotifFriend2 = false;
	}

	/* only for the page 2 , the USER can't proceed to page3 if he didnt close his phone*/
	if(pwrBtnOn == true){
		reminderDiv6.style.visibility = "hidden";
		reminderDiv7.style.visibility = "visible";
	}else{
		phoneBtn.href = "page3.html"
	}
}, false)

mobilePwrBtn.addEventListener('click' , function(){
	/* only for page 2, the first time the player click the turn on/off btn of the phone , the reminder 6 will not shows up*/
	if(pwrBtnCont == 1){
		reminderDiv6.style.visibility = "visible"
		phoneBtn.style.pointerEvents = "auto"
	}
	pwrBtnCont++;

	//update whether the power btn has clicked or not/ the phone is open or not
	if(pwrBtnOn == true){
		pwrBtnOn = false;
	}else{
		pwrBtnOn = true;
	}

} , false)

/*end ofphone open/close btn*/

/*PHONE MESSAGES FUNCTIONS*/
$(document).ready(function(){
	$('.power-btn').click(function(){
		$('.screen').toggleClass('active')

		/*when the USER turns off the phone . all DIV (convo 1, convo 2) will automatically close also*/

		msgDiv.style.visibility = "hidden"

		//convo -1
		convo_one.style.visibility = "hidden"
		frnd_one.style.visibility = "hidden"

		//convo -2
		convo_two.style.visibility = "hidden"
		frnd_two.style.visibility = "hidden"
	})
})

msgIcon.addEventListener('click' , function(){
	/* when the USER clicks the message icon on the phone , and reads the convo 1 or the other unopened convo , the notification
	message will be hidden.
	*/
	msgDiv.style.visibility = "visible"
	convo_one.style.visibility = "visible"
	msgNotif.style.visibility = "hidden"

	if(showConvo_two == true){
		convo_two.style.visibility = "visible";
	}
},false)

phoneReturnBtn.addEventListener('click' , function(){

	/* when the user press the back button of the phone , the screen of the phone will return to home screen and close all the convos*/
	frnd_one.style.visibility = "hidden";
	msgDiv.style.visibility = "hidden"	


	//convo -1
	convo_one.style.visibility = "hidden"
	frnd_one.style.visibility = "hidden"

	//convo -2
	convo_two.style.visibility = "hidden"
	frnd_two.style.visibility = "hidden"

	reminderDiv6.style.visibility = "visible"
	phoneBtn.style.pointerEvents = "auto"
},false)


convo_one.addEventListener('click' , function(){
	convo_one.style.visibility = "hidden";
	msgNotifConvo1.style.visibility = "hidden"
	frnd_one.style.visibility = "visible";

	//hide others convo
	convo_two.style.visibility = "hidden";
	
} , false)

convo_two.addEventListener('click' , function(){
	convo_two.style.visibility = "hidden";
	msgNotifConvo2.style.visibility = "hidden"
	frnd_two.style.visibility = "visible";

	//hide others convo
	convo_one.style.visibility = "hidden";
	
} , false)
/*end of PHONE MESSAGES FUNCTIONS*/


// map div functions
mapBtn.addEventListener('click', function(){

	if(itemsOpen == true){
		itemsDiv.style.right = "-400px";
		inventoryDiv.style.right = "-400px";

		itemsOpen = false

		itemsDiv.style.visibility = "visible"
		inventoryDiv.style.visibility = "visible"
	}

	/* to hide and unhide the MAP whenever the user click the MAP VIEW btn*/
	if(mapOpen == false){
		map.style.visibility = "visible"
		map.style.right = "0";
		mapOpen = true
	}else{
		map.style.right = "-100%";
		mapOpen = false
		map.style.visibility = "visible"
	}
} , false)

// items div functions
/*itemsBtn.addEventListener('click', function(){
	// to hide and unhide the INVENTORY whenever the user click the INVENTORY VIEW btn
	if(itemsOpen == false){
		itemsDiv.style.visibility = "visible"
		itemsDiv.style.right = "80px";

		inventoryDiv.style.visibility = "visible"
		inventoryDiv.style.right = "120px";

		itemsOpen = true
	}else{
		itemsDiv.style.right = "-400px";
		inventoryDiv.style.right = "-400px";

		itemsOpen = false

		itemsDiv.style.visibility = "hidden"
		inventoryDiv.style.visibility = "hidden"
	}
} , false)*/

// reminder divs functions

//reminder for map btn
okClick[0].addEventListener('click' , function(){
	reminderDiv1.style.visibility = "hidden"

	//items btns enabled
	//itemsBtn.style.pointerEvents = "auto"

	reminderDiv3.style.visibility = "visible"
} , false)

//reminder for items btn
/*okClick[1].addEventListener('click' , function(){
	reminderDiv2.style.visibility = "hidden"

	reminderDiv3.style.visibility = "visible"

} , false)*/

//reminder for phone btn
okClick[2].addEventListener('click' , function(){
	reminderDiv3.style.visibility = "hidden"
	
	// un blur the clock
	clock.setAttribute("style","filter: blur(0px)");
	reminderDiv4.style.visibility = "visible"

	//run the clock
	clockLoad();
} , false)


//reminder for clock btn
okClick[3].addEventListener('click' , function(){
	reminderDiv4.style.visibility = "hidden"
	reminderDiv5.style.visibility = "visible"

	//un blur the mobile
	mobile.setAttribute("style","filter: blur(0px)");
	mobile.style.pointerEvents = "auto"
} , false)

//reminder for how to turn on phone btn
okClick[4].addEventListener('click' , function(){
	reminderDiv5.style.visibility = "hidden"
	/*reminderDiv3.style.visibility = "visible"*/
} , false)

//reminder if the user is ready to leave the PHONE VIEW and go to page 3
okClick[5].addEventListener('click' , function(){
	reminderDiv6.style.visibility = "hidden"
} , false)

//reminder if the user didnt turn off his phone before leaving the PHONE VIEW
okClick[6].addEventListener('click' , function(){
	reminderDiv7.style.visibility = "hidden"
} , false)


// the coordinates of the position of the users current location in the map view
/*
main character house = top : 240px ; left: 395px;
friend 1 house = top : 240px ; left : 355px;
birthday house = top : 205px; left:120px;

*/