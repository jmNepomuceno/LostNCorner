/**************************CONSTANT DISPLAY IN EVERY PAGE/SCREEN*********************/
// open/close phone
const phoneBtn = document.getElementById('see-phone-btn');
const mobile = document.querySelector('.mobile');
const mobileScreen = document.querySelector('.screen')
const mobilePwrBtn = document.querySelector('.power-btn')
let pwrBtnCont = 0;
let pwrBtnOn = false;
let mobileOpen = false;
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

//reminder to turn off phone before leaving the phone view
const reminderDiv2 = document.querySelector('.reminder-div-2');

//map div
const mapBtn = document.getElementById('see-map-btn');
const map = document.querySelector('.map-div');
let mapOpen = false;

//items div
const itemsBtn = document.getElementById('see-items-btn');
const itemsDiv = document.querySelector('.items-div')
const inventoryDiv = document.querySelector('.inventory-div');
const itemBoxes = document.querySelectorAll('.icon-box')
const itemsBordersHighLight = document.querySelectorAll('.items-div ul li label .icon-box')
const itemsIconsHighLight = document.querySelectorAll('.items-div ul li label .icon-box .fa')
let itemsOpen = false;

//clock div
const clock = document.querySelector('.clock')
let am_pm = document.querySelector('.A-P-span');
let phoneAM = true

//variables for clock
const deg = 6;
const  hr =document.querySelector('#hr');
const  mn =document.querySelector('#mn');
const  sc =document.querySelector('#sc');

// ********************NEWLY CONSTANT VARAIBLES********************

const main = document.querySelector('.main')
const elipsis = document.querySelector('.elipsis')
var ellipsis_Is_visible = false

//all message bar and its child paragraph
const msgBar_P = document.querySelector('.characters-message-bar p')

//room ID
const roomImg = document.querySelector('#room')

//phone date text 
const phoneTime = document.getElementById('phone-time')

const items_found = {
	book : false,
	missingPage : false,
	money : false,
	flask : false,
	specialLiquid : false,
	fire : false,
	thermometer : false,
	hourglass : false,
	bomb : false,
	exactLocation : false
}

const items_num_code = {
	book : 0,
	missingPage : 1,
	money : 2,
	flask : 3,
	specialLiquid : 4,
	fire : 5,
	thermometer : 6,
	hourglass : 7,
	bomb : 8,
	exactLocation : 9
}

let clockVar;

let hh = 7;
let mm = 0;
let ss = 0;

function onload(){
	
}

clockLoad()

if (localStorage.getItem("minutes") !== null) {
    mm = localStorage.getItem("minutes");
    mm = parseInt(mm)
}

if (localStorage.getItem("hours") !== null) {
    hh = localStorage.getItem("hours");
    hh = parseInt(hh)
}

function clockLoad(){
	clockVar = setInterval(function(){
			clearInterval(clockVar)
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

			//6:30pm
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
				phoneAM = false
			}else{
				am_pm.textContent = "A"
				phoneAM = true
			}
	}, 20)
}

phoneBtn.addEventListener('click' , function(){

	//whenever user click another NAV BTNs , it will automaitcally close . so the MAP INVENTROY and PHONE VIEW will not overlap
	if(itemsOpen == true){
		itemsDiv.style.right = "-400px";
		inventoryDiv.style.right = "-400px";

		itemsOpen = false

		itemsDiv.style.visibility = "hidden"
		inventoryDiv.style.visibility = "hidden"
	}

	if(mobileOpen == true){
		/* the USER can't close the PHOVE VIEW if he/she didnt close his phone*/
		if(pwrBtnOn == true){
			reminderDiv2.style.visibility = "visible";
		}else{
			reminderDiv2.style.visibility = "hidden";
			mobile.style.right = "-590px"
			mobileOpen = false;
			mobile.style.visibility = "hidden"
		}
	}else{
		mobile.style.right = "90px"
		mobileOpen = true;
		mobile.style.visibility = "visible"


	}

	/* second convo/message will pop , only if the USER click the PHONE VIEW btn and open his/her phone at 8 AM
	*/
	if(showNotifFriend2 == true){
		msgNotif.style.visibility = "visible"
		showNotifFriend2 = false;
	}

}, false)

mobilePwrBtn.addEventListener('click' , function(){

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
	//whenever user click another NAV BTNs , it will automaitcally close . so the MAP INVENTROY and PHONE VIEW will not overlap
	if(itemsOpen == true){
		itemsDiv.style.right = "-400px";
		inventoryDiv.style.right = "-400px";

		itemsOpen = false

		itemsDiv.style.visibility = "hidden"
		inventoryDiv.style.visibility = "hidden"
	}

	if(mobileOpen == true){
		mobile.style.right = "-590px";
		mobileOpen = false
		mobile.style.visibility = "hidden"
		
	}

	/* to hide and unhide the MAP whenever the user click the MAP VIEW btn*/
	if(mapOpen == false){
		map.style.visibility = "visible"
		map.style.right = "0px";
		mapOpen = true
	}else{
		map.style.right = "-555px";
		mapOpen = false
		map.style.visibility = "visible"
	}
} , false)

// items div functions
itemsBtn.addEventListener('click', function(){

	//whenever user click another NAV BTNs , it will automaitcally close . so the MAP INVENTROY and PHONE VIEW will not overlap
	if(mobileOpen == true){
		mobile.style.right = "-590px";
		mobileOpen = false
		mobile.style.visibility = "hidden"
		
	}

	//to hide and unhide the INVENTORY whenever the user click the INVENTORY VIEW btn
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

		itemsDiv.style.visibility = "visible"
		inventoryDiv.style.visibility = "visible"
	}
} , false)


/**************************END CONSTANT DISPLAY IN EVERY PAGE/SCREEN**************************/

//main variables
const bookDummyClick = document.querySelector('.book-dummy')
let done_find_book = false

bookDummyClick.addEventListener('click', function(){
	elipsis.style.visibility = "visible"
	ellipsis_Is_visible = true
	done_find_book = true
},false)

function spaceBarPressed(event){
	if(ellipsis_Is_visible){
		var spaceBarCode = event.keyCode
		if(spaceBarCode == 32 && done_find_book){
			msgBar_P.textContent = "JULS: Alright I found the Book! Let's go check it out!"
			items_found["book"] = true

			itemsBordersHighLight[items_num_code["book"]].style.background = "#000"
			itemsBordersHighLight[items_num_code["book"]].style.border = "3px solid #fff"
			itemsBordersHighLight[items_num_code["book"]].style.boxShadow = "0 0 10px rgba(33,156,243,.5), 0 0 20px rgba(33,156,243,.5), 0 0 30px rgba(33,156,243,.5), inset 0 0 10px rgba(33, 156, 243,1)"
			
			itemsIconsHighLight[items_num_code["book"]].style.color = "#fff"
			itemsIconsHighLight[items_num_code["book"]].style.textShadown = " 0 0 10px rgba(33,156,243,1), 0 0 10px rgba(33,156,243,1)"

			itemBoxes[items_num_code["book"]].style.pointerEvents = "auto"
			itemBoxes[items_num_code["book"]].style.cursor = "pointer"

			elipsis.style.visibility = "hidden"
			ellipsis_Is_visible = false

			bookDummyClick.style.display = "none"
		}
	}
}

itemBoxes[0].addEventListener('click', function(){
	main.style.visibility = "hidden"
	bookScreen.style.visibility = "visible"

	itemsDiv.style.right = "-400px";
	inventoryDiv.style.right = "-400px";

	itemsOpen = false

	itemsDiv.style.visibility = "visible"
	inventoryDiv.style.visibility = "visible"
})


//Book Screen Variables 
const bookScreen = document.querySelector('.book-screen')
const book3D = document.querySelector('.book-section')	
const bookToOpen = document.querySelector('.book-container')
const bookOpen = document.querySelector('.book-container .book-cover')
const bookOpenBack = document.querySelector('figure.back')
let is_book_open = false

//open book btn
const openBookBtn = document.getElementById('open-book-btn')
const openBookBtnSpan = document.querySelector('#open-book-btn h4')
const exitBookScreenBtn = document.getElementById('exit-book-screen-btn')

openBookBtn.addEventListener('click' , function(){
	if(is_book_open){
		let bookInt = 0
		bookToOpen.style.left = "500px"
		openBookBtn.style.left = "900px"
		exitBookScreenBtn.style.left = "900px"
		openBookBtnSpan.textContent = "OPEN"
		bookToOpen.style.visibility = "visible"
		bookOpen.style.transform = "rotateY(0deg)"

		var bookVar	= setInterval(function(){
			bookToOpen.style.visibility = "hidden"
			if(bookInt == 0.5){

				book3D.style.visibility = "visible"
				bookInt	= 0
				clearInterval(bookVar)
			}
			bookInt += 0.5
		},250)
		
		is_book_open = false
	}else{
		bookToOpen.style.left = "700px"
		openBookBtn.style.left = "1100px"
		exitBookScreenBtn.style.left = "1100px"
		openBookBtnSpan.textContent = "CLOSE"
		book3D.style.visibility = "hidden"
		bookToOpen.style.visibility = "visible"
		bookOpen.style.transform = "rotateY(-180deg)"
		is_book_open = true
	}
	
} , false)

exitBookScreenBtn.addEventListener('click', function(){
	main.style.visibility = "visible"
	bookScreen.style.display = "none"
},false)