(function(){
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDTgFfL8QZU6kA1q9Jc9I4Lu24CuaQiJEs",
		authDomain: "hibaby-1bebf.firebaseapp.com",
		databaseURL: "https://hibaby-1bebf.firebaseio.com",
		projectId: "hibaby-1bebf",
		storageBucket: "hibaby-1bebf.appspot.com",
		messagingSenderId: "9227781946"
	};
	firebase.initializeApp(config);
	
	// Pegando o elemento do butao sair.
	const btnLogout = document.getElementById('buttonLogout');
	
	// A funçao para deslogar o usuario do firebase. com o evento de click e a funcao signOut.
	btnLogout.addEventListener('click', e => {
		
		localStorage.setObject("email", null);
		firebase.auth().signOut();
		//O usuario e mandado para a pagina inicial.
		window.location.replace("index.html");
	});
	
	
	// Add a realtime listener. Esse metodo onAuthStateChanged e para saber em tempo real si o usuario esta logado ou nao.
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			
			// Get elements
			const img = document.getElementById('img');
			const name = document.getElementById('name');
			const email = document.getElementById('email');
			
			//Create references. referencia do bando de dados do firebase.
			const dbRefObjec = firebase.database().ref();
			const dbRefList = dbRefObjec.child('user');
			
			
			//Sync list changes.metodo de recuperar os dados do usuario.
			dbRefList.on('child_added', snap => {
				
				//para saber qual usuario pegar.
				if(firebaseUser.email == snap.val().email){
					
					document.getElementById("name").innerHTML = snap.val().name;
					document.getElementById("email").innerHTML = snap.val().email;
					document.getElementById("img").src = snap.val().img;
					
					var cor = snap.val().cor;
					
					if(cor == "pink"){
						document.getElementById('inicio').className = 'nav-wrapper pink lighten-3';
					}else{
						document.getElementById('inicio').className = 'nav-wrapper blue lighten-3';
					}
					
				}
				
			});
			
			//verifica mudanças no firebase e atualiza para a pagina.
			dbRefList.on('child_changed', snap => {
				
				
				if(firebaseUser.email == snap.val().email){
					document.getElementById("name").innerHTML = snap.val().name;
					document.getElementById("email").innerHTML = snap.val().email;
					document.getElementById("img").src = snap.val().img;
				}else{
					alert("Dados incorretos!")
				}
			});
			
			//verifica remoçao de dados no firebase e atualiza para a pagina.
			dbRefList.on('child_removed', snap => {
				
				if(firebaseUser.email == snap.val().email){
					document.getElementById("name").innerHTML = snap.val().name;
					document.getElementById("email").innerHTML = snap.val().email;
					document.getElementById("img").src = snap.val().img;
				}
			});
		}else{
		}
	});
	
}());