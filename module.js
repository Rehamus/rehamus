// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { addDoc, collection, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVd8C2rs2Wbh2j3dGnPEYl8_Ap99WZfAA",
    authDomain: "rehamus-4349e.firebaseapp.com",
    projectId: "rehamus-4349e",
    storageBucket: "rehamus-4349e.appspot.com",
    messagingSenderId: "199277879635",
    appId: "1:199277879635:web:901dc64f8d3e8f28a901a6",
    measurementId: "G-M1VXRZKM0V"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



let docs = await getDocs(collection(db, "coll"));

/*회원가입 시작*/
$('#login_new').click( function () {
    let id = $('#login_id').val();
    let pw = $('#login_pw').val();
    let count = 0;

    docs.forEach((doc) => {
        let idd = doc.data();
        let t_id = idd['login_id'];
        if(t_id == id){
            count++;
        }
    })
    if(count != 0){
        return alert("이미 존재하는 아이디 입니다.");
    }
    let doc = {
        'login_id': id,
        'login_pw': pw
    };

     addDoc(collection(db, "coll"), doc);

    alert("회원가입 완료");

    window.location.reload()
    
});
/*회원가입 끝*/



/*로그인 시작*/
$('#login').click(function (){
    let t_id = $('#login_id_t').val();
    let t_pw = $('#login_pw_t').val();
    if(t_id == "" || t_pw == ""){
        alert("제대로 입력해 주세요");
    }else{
        let count = 0;
        let count2 = 0;
        docs.forEach((doc) => {
            count++;
            let idd = doc.data();
            let id = idd['login_id'];
            let pw = idd['login_pw'];
            if(t_id == id && t_pw == pw){
                console.log("로그인 완료")
                $('.id_Design').addClass('login');
                $('.id_menu').addClass('login');
                $('.ID_log *').removeClass('show');
                sessionStorage.setItem("login_o", 1);
            }else{
                count2++;
            }
        })
        if(count == count2 ){
            alert("정보가 틀립니다.");
        }
    }
});
/*로그인 끝*/



/*비밀번호 찼기 시작*/
    $('#login_f_pw').click(function () {
        let t_id = $('#login_id').val();
        docs.forEach((doc) => {
            let idd = doc.data();
            let id = idd['login_id'];
            let pw = idd['login_pw'];

            if(t_id == id){
                alert("비밀번호" + pw);
            }
        
        })
    });
/*비밀번호 찼기 끝*/
    









