const authSwitchLinks = document.querySelectorAll('.switch')
const authModals = document.querySelectorAll('.auth .modal')
const authWrapper = document.querySelector('.auth')

const registerForm = document.querySelector('.register')
const loginForm = document.querySelector('.login')
const signOut = document.querySelector('.sign-out')


// Toggle auth modals
authSwitchLinks.forEach(link => {
	link.addEventListener('click', () => {
		authModals.forEach(modal => modal.classList.toggle('active'))
	})
})

// For the register form
registerForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const email = registerForm.email.value
	const password = registerForm.password.value

	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((user) => {
			console.log('registered', user)
			registerForm.reset()
		})
		.catch((error) => {
			registerForm.querySelector('.error').textContent = error.message
		})
})

// For the register form
loginForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const email = loginForm.email.value
	const password = loginForm.password.value

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => {
			console.log('login', user)
			loginForm.reset()
		})
		.catch(error => {
			loginForm.querySelector('.error').textContent = error.message
		})
})


// Sign out a user
signOut.addEventListener('click', _ => {
	firebase.auth().signOut()
		.then(_ => console.log('signed out'))
})


// Auth listener
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		authWrapper.classList.remove('open')
		authModals.forEach(modal => modal.classList.remove('active'))
	} else {
		authWrapper.classList.add('open')
		authModals[0].classList.add('active')
	}
})

