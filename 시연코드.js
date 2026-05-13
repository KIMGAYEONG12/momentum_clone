/**
 * ================================================
 *  자바스크립트 타이머 — 시연 코드 (Demo)
 *  주제: setTimeout / setInterval
 * ================================================
 *  사용법: 브라우저 콘솔(F12) 또는 Node.js에서 실행
 *  각 단계를 읽고, console.log 결과를 확인해보세요.
 *  ⚠️ 타이머는 비동기(async)로 동작하므로
 *     결과가 코드 순서와 다르게 출력될 수 있습니다!
 * ================================================
 */


// ════════════════════════════════
// ── 1단계: setTimeout 기본 사용법 ──
// ════════════════════════════════

// setTimeout(함수, 지연시간ms) — 지정한 시간 뒤에 함수를 딱 한 번 실행
// 1000ms = 1초

console.log("1️⃣ 시작!");                          // → 출력: 1️⃣ 시작!

setTimeout(function() {
  console.log("1초 뒤에 실행됩니다!");              // → 출력: 1초 뒤에 실행됩니다!
}, 1000);

// 💡 화살표 함수로도 쓸 수 있어요
setTimeout(() => {
  console.log("2초 뒤에 실행됩니다!");              // → 출력: 2초 뒤에 실행됩니다!
}, 2000);

console.log("1️⃣ 끝! (타이머는 아직 기다리는 중)"); // → 출력: 1️⃣ 끝! (타이머는 아직 기다리는 중)
// ⚠️ "시작! → 끝! → 1초 뒤... → 2초 뒤..." 순서로 출력됩니다.
//    setTimeout은 코드를 멈추지 않고 "나중에 실행"만 예약합니다.
// 📌 핵심: setTimeout은 비동기 — 코드 흐름을 멈추지 않고 나중에 실행을 예약함


// ════════════════════════════════
// ── 2단계: clearTimeout으로 타이머 취소 ──
// ════════════════════════════════

// setTimeout은 반환값(타이머 ID)을 변수에 저장하면 나중에 취소할 수 있습니다.

let timerId = setTimeout(() => {
  console.log("이 메시지는 출력되지 않습니다.");    // → 출력: (없음 — 취소됨)
}, 3000);

// clearTimeout(타이머ID) — 실행 전에 취소!
clearTimeout(timerId);
console.log("2️⃣ 타이머를 취소했습니다!");          // → 출력: 2️⃣ 타이머를 취소했습니다!

// 💡 이미 실행된 타이머에 clearTimeout을 써도 오류는 나지 않지만 아무 효과 없음
// 📌 핵심: setTimeout의 반환값(ID)을 저장해 두면 clearTimeout으로 언제든 취소 가능


// ════════════════════════════════
// ── 3단계: setInterval 기본 사용법 ──
// ════════════════════════════════

// setInterval(함수, 간격ms) — 지정한 간격마다 함수를 계속 반복 실행
// clearInterval로 멈추지 않으면 영원히 실행됩니다!

let count = 0;

let intervalId = setInterval(() => {
  count++;
  console.log(`3️⃣ ${count}번째 실행 (매 0.5초마다)`); // → 출력: 3️⃣ 1번째 실행 (매 0.5초마다)
                                                        //         3️⃣ 2번째 실행 (매 0.5초마다)
                                                        //         3️⃣ 3번째 실행 (매 0.5초마다)
}, 500);

// 3번 실행 후 자동으로 멈추도록 설정
setTimeout(() => {
  clearInterval(intervalId);
  console.log("3️⃣ 3번 실행 후 인터벌을 멈췄습니다!"); // → 출력: 3️⃣ 3번 실행 후 인터벌을 멈췄습니다!
}, 1600); // 0.5 * 3 = 1.5초 + 여유 0.1초

// 📌 핵심: setInterval은 clearInterval을 호출하기 전까지 계속 반복 실행됨


// ════════════════════════════════
// ── 4단계: clearInterval로 반복 중지 ──
// ════════════════════════════════

// 조건에 따라 인터벌을 멈추는 패턴 — 실무에서 자주 씀!

let seconds = 0;
let stopwatch = setInterval(() => {
  seconds++;
  console.log(`4️⃣ 스톱워치: ${seconds}초`);        // → 출력: 4️⃣ 스톱워치: 1초
                                                     //         4️⃣ 스톱워치: 2초
                                                     //         4️⃣ 스톱워치: 3초

  // seconds가 3이 되면 자동으로 멈춤
  seconds === 3 ? (clearInterval(stopwatch), console.log("4️⃣ 스톱워치 정지!")) : null;
  //                                                  // → 출력: 4️⃣ 스톱워치 정지!
}, 1000);

// 💡 clearInterval은 setInterval 내부에서 호출해도 됩니다
// 📌 핵심: 인터벌 내부에서 조건을 체크해 clearInterval로 스스로 멈출 수 있음


// ════════════════════════════════
// ── 5단계: setTimeout vs setInterval 비교 ──
// ════════════════════════════════

// [방법 A] setInterval 사용 — 정확히 매 1초마다 실행
let intervalCount = 0;
let methodA = setInterval(() => {
  intervalCount++;
  console.log(`5️⃣ [setInterval] ${intervalCount}번째`); // → 출력: 5️⃣ [setInterval] 1번째
  intervalCount === 3 ? clearInterval(methodA) : null;   //         5️⃣ [setInterval] 2번째
}, 1000);                                                 //         5️⃣ [setInterval] 3번째

// [방법 B] setTimeout 재귀 호출 — 이전 실행이 끝난 후 1초 뒤 실행
let timeoutCount = 0;
const repeatWithTimeout = () => {
  timeoutCount++;
  console.log(`5️⃣ [setTimeout 재귀] ${timeoutCount}번째`); // → 출력: 5️⃣ [setTimeout 재귀] 1번째
  timeoutCount < 3 ? setTimeout(repeatWithTimeout, 1000) : null;
};
setTimeout(repeatWithTimeout, 1000);

// ⚠️ setInterval: 함수 실행 시간과 무관하게 간격을 유지 (겹칠 수 있음)
//    setTimeout 재귀: 이전 실행 완료 후 다음을 예약 (더 안전)
// 💡 실행 시간이 긴 작업은 setTimeout 재귀 패턴이 더 안정적입니다
// 📌 핵심: setInterval은 간격 고정, setTimeout 재귀는 이전 실행 완료 후 다음 예약


// ════════════════════════════════
// ── 6단계: 종합 도전 — 카운트다운 타이머 ──
// ════════════════════════════════

// 5초부터 0초까지 카운트다운 후 "🚀 발사!" 출력

let countdown = 5;

const countdownTimer = setInterval(() => {
  console.log(`6️⃣ 카운트다운: ${countdown}초`);    // → 출력: 6️⃣ 카운트다운: 5초
                                                     //         6️⃣ 카운트다운: 4초
                                                     //         6️⃣ 카운트다운: 3초
                                                     //         6️⃣ 카운트다운: 2초
                                                     //         6️⃣ 카운트다운: 1초
  countdown--;

  countdown < 0
    ? (clearInterval(countdownTimer), console.log("6️⃣ 🚀 발사!")) // → 출력: 6️⃣ 🚀 발사!
    : null;
}, 1000);

// 📌 핵심: setInterval + 조건 체크 + clearInterval 조합으로 카운트다운 구현 가능