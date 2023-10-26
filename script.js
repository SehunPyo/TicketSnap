const contents = [
                  '오늘 가장 많은 대화를 나누는 사람에게 치킨 쏘는 날'
                , '뜸했던 친구에게 전화해 대화를 리드하면서 10분 이상 통화하는 날'
                , '숨겨왔던 비밀을 고백하는 날'
                , '어색한 사람과 조금 더 친해지는 날'
                , '밤 11시 넘어서 누우면 내일 뾰루지 생기는 날'
                , '저녁으로 보쌈, 족발, 곱창, 떡볶이 중 하나 먹는 날'
                , '마스크팩 하면서 영화 한편 보고 자는 날'
                , '그동안 꾸준히 떠오르던 사람에게 용기내서 말 걸어보는 날'
                , '이번 주 주말의 야외 활동 계획을 짜는 날 (집에있으면 뾰루지 남)'
                , '간식 잔뜩 사서 넷플릭스, 디즈니+, 쿠팡플레이 등 OTT하루 종일 보는 날'
                , '미안했던 사람에게 먼저 사과하고 다시 가까워지는 날'
                , '색다른 누군가와 함께 저녁을 먹는 날'
                , '오후 내내 아무 것도 안하고 집에서 쉬어야 하는 날'
                , '가장 친한 친구와 가장 가까운 장소에 물멍하러 가는 날'
                , '가장 친한 친구와 스파클링 폭죽 하나씩 들고 공원이나 운동장 천천히 돌면서 수다 떠는 날'
                , '아무나 사람 두명 이상을 모아 함께 저녁을 먹는 날'
                , '편의점에서 가장 비싼 초콜렛을 사먹는 날'
                , '간식으로 계란 두개 이상과 캔사이다를 마시는 날'
                , '"등" 하는 날'
                , '"이두" 하는 날'
                , '"삼두" 하는 날'
                , '"엉덩이" 하는 날'
                , '"허벅지" 하는 날'
                , '플레이 리스트에서 자주 듣는 음악을 제외하고 모두 정리하는 날'
                , '가장 가까운 시장에 방문해서 가장 맛있어 보이는 시장음식 포장해서 집에 가는 날'
                , '휴대폰에서 안쓰는 어플 정리하는 날'
                , '눈썹 정리하는 날'
                , '친구들의 별명을 새로 지어서 휴대폰에 저장된 이름을 새로운 별명으로 바꾸는 날'
                , '물 1L 이상 마시기 챌린지 하는 날'
                , '사진첩에 쓸모없는 사진 정리하는 날'
                , '옷장 정리하는 날'
                , '직장 동료 또는 가장 활발한 단톡방 멤버들에게 커피쏘는 날'
                , '주말에 같이 찜질방 갈 사람 찾아보는 날 (없으면 혼자서라도 가야함)'
                , '김밥 재료를 사고 김밥을 말아서 갑자기 생각나는 사람과 함께 벤치에 앉아서 먹는 날'
                  ];



let adminModeActive = false;

// adminCode에서 엔터키 이벤트를 감지
document.getElementById('adminCode').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) { // 13은 엔터키의 코드
        checkAdminMode();
    }
});

function checkAdminMode() {
    if (document.getElementById('adminCode').value === "adminMode") {
        adminModeActive = true;
        setTimeout(() => {
            localStorage.setItem("stateCD", "0");
            adminModeActive = false;
        }, 30000); // 30초 후 adminModeActive를 false로 설정
    }
}

function generateFortune() {
    var storedFortune = localStorage.getItem("todayFortune");
    var currentState = localStorage.getItem("stateCD");
    var displayFortune;

    // adminMode가 활성화되어 있으면 무조건 랜덤 선택
    if (adminModeActive) {
        const randomIndex = Math.floor(Math.random() * contents.length);
        displayFortune = contents[randomIndex];
    } 
    // 처음 호출될 때, localStorage에 저장된 오늘의 버킷 값이 없을 경우
    else if (!storedFortune) {
        const randomIndex = Math.floor(Math.random() * contents.length);
        displayFortune = contents[randomIndex];
        localStorage.setItem("todayFortune", displayFortune);
    } 
    else {
        displayFortune = storedFortune;
    }

    if (!adminModeActive && currentState === "1") {
        document.getElementById('Contents').value = "오늘의 버킷을 이미 획득했습니다."
        document.getElementById('SubContents').value = "오늘 획득한 버킷 : " + '"' + displayFortune + '"'; 
    } else {
        document.getElementById('Contents').value = displayFortune;
        if (!adminModeActive) {
            localStorage.setItem("stateCD", "1");
        }
    }
}


// 로컬 스토리지를 초기화하는 함수
function clearLocalStorageAtMidnight() {
    const now = new Date();
    const then = new Date(now);
    then.setHours(24, 0, 0, 0); // 다음날 0시 0분 0초를 설정
    const timeToMidnight = then.getTime() - now.getTime(); // 0시까지 남은 시간 계산

    setTimeout(function() {
        localStorage.clear(); // 로컬 스토리지 초기화
        clearLocalStorageAtMidnight(); // 다음날 0시를 위해 재귀 호출
    }, timeToMidnight);
}

clearLocalStorageAtMidnight(); // 초기 로드 시 함수 실행
