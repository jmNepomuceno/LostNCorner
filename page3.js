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

let clockVar;

let hh = 7;
let mm = 0;
let ss = 0;

function onload(){
	itemsBtn.style.pointerEvents = "none"
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
// itemsBtn.addEventListener('click', function(){

// 	//whenever user click another NAV BTNs , it will automaitcally close . so the MAP INVENTROY and PHONE VIEW will not overlap
// 	if(mobileOpen == true){
// 		mobile.style.right = "-590px";
// 		mobileOpen = false
// 		mobile.style.visibility = "hidden"
		
// 	}

// 	//to hide and unhide the INVENTORY whenever the user click the INVENTORY VIEW btn
// 	if(itemsOpen == false){
// 		itemsDiv.style.visibility = "visible"
// 		itemsDiv.style.right = "80px";

// 		inventoryDiv.style.visibility = "visible"
// 		inventoryDiv.style.right = "120px";

// 		itemsOpen = true
// 	}else{
// 		itemsDiv.style.right = "-400px";
// 		inventoryDiv.style.right = "-400px";

// 		itemsOpen = false

// 		itemsDiv.style.visibility = "visible"
// 		inventoryDiv.style.visibility = "visible"
// 	}
// } , false)


/**************************END CONSTANT DISPLAY IN EVERY PAGE/SCREEN**************************/

const body = document.getElementsByTagName('BODY')
const main = document.querySelector('.main')
const elipsis = document.querySelector('.elipsis')
var ellipsis_Is_visible = false // para mahandle yung , gagana lang yung space bar pressed pag visibile yung ellipsis

//reminder 1 / Conversation Box
const reminderDiv_1 = document.querySelector('.reminder-div-1')
//reminder 3 / Ellipsis
const reminderDiv_3 = document.querySelector('.reminder-div-3')

// all reminder OKAY CLICK and SPAN ORIG
const okClick = document.querySelectorAll('.okay-click')
const spanOrig = document.querySelectorAll('.span-orig')

//all message bar and its child paragraph
const msgBar_P = document.querySelector('.characters-message-bar p')

//taking a bath variables
const bathDiv = document.querySelector('.screen-taking-bath')
const bathDoorDiv = document.getElementById("bath")
const bedDiv = document.getElementById("obj1")
const compuDiv = document.getElementById("obj2")
const dateDiv = document.getElementById("obj3")
const wagDiv = document.getElementById("obj4")
//inadd ko 05/08/2020-12:58 pm

//room ID
const roomImg = document.querySelector('#room')

//phone date text 
const phoneTime = document.getElementById('phone-time')

//9:33am
//kitchen divs and varibles
const refrigirator = document.getElementById('refrigirator')
const breakfastMeal = document.getElementById('breakfast-meal')
const breakfastMealScreen = document.getElementById('breakfast-meal-screen')
//to handle the specific message for every SPACE BAR pressed
let done_bath = false
let done_open_ref = false
let done_eat_screen = false

//screen para sa eating breakfast
const eatBfastDiv = document.querySelector('.screen-eating-breakfast')

//house of JIM div
const houseJIM = document.querySelector('.house-jim')

//reminder 1 / Conversation Box
okClick[0].addEventListener('click' , function(){
	reminderDiv_1.style.visibility = "hidden"
	msgBar_P.style.visibility = "visible"

	//dito magiging clickable na yung door
	document.getElementById("room").style.filter = "blur(0px)";//para mawala yung blur pag nag hahanap na siya 05/08/2020
	bathDoorDiv.style.pointerEvents = "auto"
	bedDiv.style.pointerEvents = "auto"
	compuDiv.style.pointerEvents = "auto"
	dateDiv.style.pointerEvents = "auto"
	wagDiv.style.pointerEvents = "auto"
}, false)

	
//reminder 3 / Ellipsis
okClick[1].addEventListener('click' , function(){
	reminderDiv_3.style.visibility = "hidden"
}, false)


function spaceBarPressed(event){
	if(ellipsis_Is_visible){
		var spaceBarCode = event.keyCode
		if(spaceBarCode == 32 && done_bath){
			reminderDiv_3.style.visibility = "hidden"
			msgBar_P.textContent = "Hmm what do we have for breakfast?"
			elipsis.style.visibility = "hidden"
			ellipsis_Is_visible = false

			roomImg.style.filter = "blur(0px)";//para mawala yung blur pag nag hahanap na siya 05/08/2020
			//tas ikaw bahala kung change ka ng background na kusina o pwede na lang din naman ikaw mag lagay ng
			// pagkain dun sa table tabi ng laptop

			
			//lipat ko yung pag change ng bg image , kapag na press na nya yung space bar 6:01pm
			roomImg.src="imgs/kitchen.jpg";//nag lagay ako ng kitchen bg, palitan ko parin to HAHA

			//make ref clickable
			refrigirator.style.visibility = "visible"
		}

		if(spaceBarCode == 32 && done_open_ref){
			msgBar_P.textContent = "Alright, that looks delicious! Time to eat."
			breakfastMeal.style.visibility = "visible"

			elipsis.style.visibility = "hidden"
			ellipsis_Is_visible = false

			roomImg.style.filter = "blur(0px)";
		}

		//  5:25 pm
		// tong mga done_eat_screen pala nato , para mag i iba yung mga kalalabasan , kapag nag press ng SPACE BAR

		if(spaceBarCode == 32 && done_eat_screen){
			elipsis.style.visibility = "hidden"
			ellipsis_Is_visible = false

			roomImg.src = "./imgs/mainroom.png"
			roomImg.style.filter = "blur(3px)";

			msgBar_P.textContent = "Alright, I think I am good to go! Oh damn, I almost forgot, I need to go to pick up Jim."

			// tas lalagyan ko ng ng transparent div saka title yung bahay ni JIM , para ma cli click nila , tas punta na sa page4.html
			houseJIM.style.visibility = "visible"
		}
	}
}

// 8:43am
// taking a bath function

function bathroom(){
	// location.href="task.html";
	main.style.visibility = "hidden"
	bathDiv.style.visibility = "visible"

	bathBar()
}// para sa bathroom 04/08/2020 8:19pm

function bathBar(){
	let counter = 0;
    let vi;
    vi = setInterval(function(){
    	counter +=1;
        document.getElementById("progress-bar").value = counter;
        //console.log(counter);
        if(counter == 100){ 
			clearInterval(vi); 
			bathDiv.style.visibility = "hidden"
			main.style.visibility = "visible"

			elipsis.style.visibility = "visible"
			ellipsis_Is_visible = true
			done_bath = true

			//tas lalabas na yung reminder , kung ano gagawin nila pag may ellipsis na
			reminderDiv_3.style.visibility = "visible"

			//tapos pag balik dun sa main screen , di na clickable yung pinto
			bathDoorDiv.style.pointerEvents = "none"
			bedDiv.style.pointerEvents = "none"
			compuDiv.style.pointerEvents = "none"
			dateDiv.style.pointerEvents = "none"
			wagDiv.style.pointerEvents = "none" //inadd ko 05/08/2020-12:58 pm

			//9:01am
			//gawing kong mga visibility = hidden yung mga div na to , baka kasi mag patong sila ng mga div na 
			// ilalagay natin sa kitchen background
			bathDoorDiv.style.visibility = "hidden"
			bedDiv.style.visibility = "hidden"
			compuDiv.style.visibility = "hidden"
			dateDiv.style.visibility = "hidden"
			wagDiv.style.visibility = "hidden" 

			
			document.getElementById("room").style.filter = "blur(3px)";// 05/08/2020
        }
	},50);
}
//para sa message pag nagclick ng ibang bagay
var reset;// pang call ng pang reset ng text
function restrictionOnObject(){
	
	//document.getElementById("charactext").innerHTML="Cant do that now, i'll be late for school";
	//yung document.getElementById("charactext") , nakavariable na yun , line 331
	msgBar_P.textContent = "Cant do that now, i'll be late for school"
	reset = setTimeout(restext,1000);
}

function restext(){
	msgBar_P.textContent ="Oh crap, its 7 am already, I need to be quick. I don’t want to be late in my first day! First, I need to take a bath.";
}
function seedate(){
	msgBar_P.textContent = "Today is June 5, 2017 huh";
	reset = setTimeout(restext,1000);
}//05/08/2020 - 12:34pm

//9:36am
function onClickRef(){
	elipsis.style.visibility = "visible"
	ellipsis_Is_visible = true
	done_open_ref = true

	//remove pointer events and visibility to hidden
	refrigirator.style.pointerEvents = "none"
	refrigirator.style.visibility = "hidden"
}

function onClickBfastMeal(){
	eatBfastDiv.style.visibility = "visible"
	main.style.visibility = "hidden"

	eatingBfastScreen()
}

function eatingBfastScreen(){
	let counter = 0;
	let imgCont = 0
    let vi;
    vi = setInterval(function(){
    	counter +=1;
		document.getElementById("progress-bar-bfast").value = counter;
		//console.log(counter);

		//5:19pm para maging tuloy tuloy lang yung progress bar , kagaya nung sa taking a bath.
		if(counter % 20 == 0){
			imgCont += 1
			breakfastMealScreen.src = "./imgs/bfast-" + imgCont +"t"+".png"
			breakfastMealScreen.style.width = "150%"
			breakfastMealScreen.style.left = "-170px"
		}

        //console.log(counter);
        if(counter == 100){ 
			clearInterval(vi);
			eatBfastDiv.style.visibility = "hidden"//pagtapos kumain 2:41pm
			main.style.visibility = "visible"//pagtapos kumain 2:41pm
			document.getElementById("breakfast-meal").style.display="none";//pagtapos kumain 3:00pm
			// ay hayop oo nga no , may DISPLAY NONE pala amputa HAHAHAHAHAH nag tya tyaga ako sa visibility = hidden ganun HAHAHAHA
			msgBar_P.textContent = "Aight, That's delicious. Time to go";//pagtapos kumain 3:00pm


			//5:23pm
			elipsis.style.visibility = "visible"
			ellipsis_Is_visible = true
			done_eat_screen = true

        }
	},50);// binalik ko an sa 50 , tas yung sa html na , max = 100.
}
//road to page4 na HAHHAHHAH
function onClickJimHouse(){
	location.href = "page4.html"
}
