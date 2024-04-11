// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


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
$('#login_new').click(async function () {
    let id = $('#login_id').val();
    let pw = $('#login_pw').val();
    let count = 0;

    docs.forEach((doc) => {
        let idd = doc.data();
        let t_id = idd['login_id'];
        if (t_id == id) {
            count++;
        }
    })
    if (count != 0) {
        return alert("이미 존재하는 아이디 입니다.");
    }
    let doc = {
        'login_id': id,
        'login_pw': pw
    };

    await addDoc(collection(db, "coll"), doc);

    alert("회원가입 완료");

    window.location.reload()

});
/*회원가입 끝*/



/*로그인 시작*/
$('#login').click(function () {// 로그인 선택시
    let t_id = $('#login_id_t').val();
    let t_pw = $('#login_pw_t').val();
    if (t_id == "" || t_pw == "") {
        alert("제대로 입력해 주세요");
    } else {
        let count = 0;
        let count2 = 0;
        docs.forEach((doc) => {
            count++;
            let idd = doc.data();
            let id = idd['login_id'];
            let pw = idd['login_pw'];
            if (t_id == id && t_pw == pw) {
                console.log("로그인 완료")
                $('.id_Design').addClass('login');// 로그인 화면 치우기
                $('.id_menu').addClass('login');
                $('.ID_log *').removeClass('show');
                sessionStorage.setItem("login_o", t_id);
                setTimeout(function () {// 로그인후 1.5초후 세로고침
                    window.location.reload()
                }, 1500);
            } else {
                count2++;
            }
        })
        if (count == count2) {
            alert("정보가 틀립니다.");
        }
    }
});
/*로그인 끝*/



/*비밀번호 찼기 시작*/
$('#login_f_pw').click(function () {// 비밀번호 찼기 선택시
    let t_id = $('#login_id').val();
    docs.forEach((doc) => {
        let idd = doc.data();
        let id = idd['login_id'];
        let pw = idd['login_pw'];

        if (t_id == id) {
            alert("비밀번호" + pw);
        }

    })
});
/*비밀번호 찼기 끝*/




// 새 취미 저장버튼 클릭 시
$("#saveHobby").click(async function () {
    // 입력된 취미명을 가져옵니다.
    let inputHobby = $('#inputHobby').val();
    let session = sessionStorage.getItem("login_o");

    // await addDoc(collection(db, "hobbies"), { hobbyName: inputHobby });
    const docRef = doc(db, "hobbies", inputHobby); // "hobbies" 컬렉션에 대한 참조 생성
    await setDoc(docRef, { hobbyName: inputHobby, session: session }); // 새로운 문서 추가
    alert('저장 완료!');
    window.location.reload();
});



// 링크 저장 버튼 클릭 시
$("#saveLink").click(async function () {
    // 선택된 취미명을 가져옵니다.
    let selectHobby = $('#selectHobby').val();
    let contentType = $('#contentType').val();
    let address = $('#address').val();
    let C_name = $('#C_name').val();

    try {
        // 선택한 취미가 이미 존재하는 경우 해당 문서를 업데이트합니다.
        const docRef = doc(db, "hobbies", selectHobby); // 문서를 직접 참조
        // await setDoc(docRef, { contentType: contentType, address: address }, { merge: true });
        // await setDoc(docRef, {
        //     contents: firestore.FieldValue.arrayUnion({
        //         contentType: contentType,
        //         address: address
        //     })
        // }, { merge: true });
        await setDoc(docRef, {
            contents: arrayUnion({
                contentType: contentType,
                address: address,
                C_name : C_name
            })
        }, { merge: true });
        alert('저장 완료!');
        window.location.reload();
    } catch (error) {
        console.error("Error updating document: ", error);
        alert('저장에 실패했습니다.');
    }
});




let docs2 = await getDocs(collection(db, "hobbies"));
let count = 0;
docs2.forEach((doc) => {
    let row = doc.data();

    let inputHobby = row['hobbyName'];
    let session = row['session'];
    let test1 = row['test1'];
    let test2 = test1 + "";

    if (session == sessionStorage.getItem("login_o")) {// 세션(로그인된 ID 와 동일 취미명이 나오게함)

        //취미명 버튼 추가
        let temp_html1 = `
            <button id="${inputHobby}" type="button" class="btn btn-secondary">${inputHobby}</button>`;
        $('#category').append(temp_html1);


        //링크 저장 버튼 내에 취미 선택지 추가
        let temp_html2 = `
            <option value="${inputHobby}">${inputHobby}</option>`;
        $('#selectHobby').append(temp_html2);
        $('#deleteHobby').append(temp_html2);

    }

    count++;
});
        // carousel 취미명 생성 
        let docs3 = await getDocs(collection(db, "hobbies"));
        // 새 취미 목록 배열 생성
        let inputHobbyArray = [];

        // 새 취미이름 테이터 순회 배열 및 값 추가
        docs3.forEach((doc) => {
            let row = doc.data();
            let inputHobby = row['hobbyName'];
            inputHobbyArray.push(inputHobby);
        });


        let htmlTemplates = [];
        // 취미가 0 일 경우 안내문자 
        let requireHobby = "취미를 추가해주세요 :)";

        if (inputHobbyArray.length === 0) {
            // 새 취미명이 하나도 없을 경우 안내 문자 생성
            let html = `
        <div id="carousel1" class="carousel-caption text-start">
            <h1>${requireHobby}</h1>
            <p><a class="btn btn-lg btn-primary" href="#">See more</a></p>
        </div>`;
            htmlTemplates.push(html);
        } else { // 새 취미명이 하나라도 있을 경우 취미명 생성
            for (let i = 0; i < inputHobbyArray.length; i++) {
                let inputValueAtIndex = inputHobbyArray[i];
                // console.log("취미명 index번호 " + i + ":", inputValueAtIndex); // 취미명 인덱스번호 검색

                let html = `
        <div id="carousel" class="carousel-caption text-start">
            <h1>${inputValueAtIndex}</h1>
            <p><a class="btn btn-lg btn-primary" href="#">See more</a></p>
        </div>`;
                htmlTemplates.push(html);
            }
        }
        // 취미명 추가 등록 시 추가 생성 
        for (let i = 0; i < htmlTemplates.length; i++) {
            $(`#carousel${i + 1}`).html(htmlTemplates[i]);
        }




        // carousel > see more 
        $(document).on("click", ".carousel-caption .btn-primary", async function () { // see more 클릭시
            let hobbyName = $(this).closest(".carousel-caption").find("h1").text().trim(); // 취미명과 일치하는 요소 찾기

            const docRef = doc(db, "hobbies", hobbyName);
            const docSnap = await getDoc(docRef); // 취미명 불러오기

            if (docSnap.exists()) {
                const data = docSnap.data();



                $('.hobbyTitle').empty(); // 기존에 취미명 지우기
                $('.hobbyTitle').append(data.hobbyName); // 취미명 다시 업뎃

                $('#youtubeView').empty(); // 기존에 유투브 내용지우기
                $('#namuwikiView').empty(); // 기존에 나무위키 내용지우기
                $('#photoView').empty(); // 기존의 사진 내용 지우기

                // hobbise에서 내용 찾아 불러오기
                data.contents.forEach(content => {
                    if (content.contentType === 'youtube') {
                        $('#youtubeView').append(`<div><a href="${content.address}">${content.address}</a></div>`);
                        var youtubeAddress = content.address;
                        var canView = youtubeAddress.split('=');
                        let Youtub_new = `
                         <iframe width="560" height="315" src="https://youtube.com/embed/${canView[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>;`
                        $('#youtubeView').append(Youtub_new);
                    } else if (content.contentType === 'namu') {
                        $('#namuwikiView').append(`<div><a href="${content.address}">${content.address}</a></div>`);
                    } else if (content.contentType === 'photo') {
                        $('#photoView').append(`<div><img src="${content.address}"></div>`);
                    }
                });
            }
        });




        // 취미명 검색
        $(".input-group button").on("click", function () {// 검색창에 취미명 입력 후 검색버튼 클릭
            let searchValue = $(".input-group input").val().trim(); // 입력된 취미명 값 (앞뒤 공백제거)
            let hobbyButton = $(`#${searchValue}`); // id값 불러오기

            if (hobbyButton.length > 0) {
                hobbyButton.trigger("click"); // 저장된 내용 불러오기
            } else { // 잘못된 취미명 입력 시 경고창
                alert("잘못 입력하셨습니다. 저장하신 취미명을 입력해주세요. ");
            }
        });




//!!!준빈님이 완성하실 부분!!! 취미버튼 클릭 시 - 클릭 이벤트 핸들러 정의 (버튼이 생성된 이후에 정의되어야 함)
$(document).on("click", ".btn-secondary", async function () {
    // 클릭된 버튼에 대한 동작 구현
    $('.hobbyTitle').text($(this).attr("id"));
    // 예를 들어, 클릭된 취미에 대한 추가 정보를 가져오는 등의 작업을 수행할 수 있습니다.
    let hobbyName = $(this).attr("id");

    let docs2 = await getDocs(collection(db, "hobbies"));

    // console.log("Clicked hobby: ", hobbyName);

    $('#hobbyTitle').empty(); // 기존 제목 초기화
    $('#hobbyTitle').append(hobbyName); // 제목 삽입

    //기록타입과 링크주소 각각의 배열 (n번째 요소끼리 세트)
    let contentTypes = [];
    let addresses = [];

    const docRef = doc(db, "hobbies", hobbyName);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();

    data.contents.forEach((content) => {
        contentTypes.push(content.contentType);
        addresses.push(content.address);
    });

    // 배열에 저장된 contentType과 address를 출력하거나 사용할 수 있습니다.
    console.log("Content Types:", contentTypes);
    console.log("Addresses:", addresses);
    console.log("hobbyName:", hobbyName);

    // 여기에 추가 작업을 수행하세요.
    // 배열의 문자열을 통해 index 번호 뽑기
    const youtubeIndex = contentTypes.indexOf('youtube');
    const namuwikiIndex = contentTypes.indexOf('namu');
    const photoIndex = contentTypes.indexOf('photo');

    const indexesOfValue = (contentTypes, value) => {
        return contentTypes.reduce((acc, elem, index)=> {
            if(elem === value){
                acc.push(index);
            }
            return acc;
        }, []);
    };
    const photoIndexOfValue = indexesOfValue(contentTypes, 'photo');
    const youtubeIndexOfValue = indexesOfValue(contentTypes, 'youtube');
    const namuwikiIndexOfValue = indexesOfValue(contentTypes, 'namu');

    // 데이터 충돌 방지
    $('#youtubeView').empty();
    $('#namuwikiView').empty();
    $('#photoView').empty();

    let youtube_temp_html = '';
    let namuwiki_temp_html = '';
    let photo_temp_html = '';
    if(youtubeIndex == -1){
        youtube_temp_html = `<div>##유트브 링크 없음.##</div>`;
    } else {
        youtubeIndexOfValue.forEach(function(youtube){
            youtube_temp_html += `<div><a href="${addresses[youtube]}">${addresses[youtube]}</a></div>`;

        // 유트브 내보내기
        var str = addresses[youtube];
        var address = str.split('v=');

        // 유트브 추가
        let Youtub_new = `
        <div> <iframe width="855" height="480" src="https://youtube.com/embed/${address[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>;</div>`
            $('#youtubeView').append(Youtub_new);

        })
    }
    if(namuwikiIndex == -1){
        namuwiki_temp_html = `<div>##나무위키 링크 없음.##</div>`;
    } else {
        namuwikiIndexOfValue.forEach(function(namu){
            namuwiki_temp_html += `<div><a href="${addresses[namu]}">${addresses[namu]}</a></div>`;
        })
    }
    if(photoIndex == -1){
        photo_temp_html = `<div>##사진 없음.##</div>`;
    } else {
        photoIndexOfValue.forEach(function(photo){
            photo_temp_html += `<div class="img_box"><img src="${addresses[photo]}"></img><a href="${addresses[photo]}"></a></div>`;
        })
    }
    $('#youtubeView').append(youtube_temp_html);
    $('#namuwikiView').append(namuwiki_temp_html);
    $('#photoView').append(photo_temp_html);
});









