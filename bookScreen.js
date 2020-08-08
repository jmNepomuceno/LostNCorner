const book3D = document.querySelector('.book-section')	
const bookToOpen = document.querySelector('.container')
const bookOpen = document.querySelector('.container .cover')
const bookOpenBack = document.querySelector('figure.back')
let is_book_open = false

//open book btn
const openBookBtn = document.getElementById('open-book-btn')

openBookBtn.addEventListener('click' , function(){
	if(is_book_open){
		let bookInt = 0
		bookToOpen.style.visibility = "hidden"
		bookToOpen.style.visibility = "visible"
		bookOpen.style.transform = "rotateY(0deg)"

		var bookVar	= setInterval(function(){
			bookToOpen.style.visibility = "hidden"
			console.log(bookInt)
			if(bookInt == 0.5){

				book3D.style.visibility = "visible"
				bookInt	= 0
				clearInterval(bookVar)
			}
			bookInt += 0.5
		},250)
		
		is_book_open = false
	}else{
		book3D.style.visibility = "hidden"
		bookToOpen.style.visibility = "visible"
		bookOpen.style.transform = "rotateY(-180deg)"
		is_book_open = true
	}
	
} , false)