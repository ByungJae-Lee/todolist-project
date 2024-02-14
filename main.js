// 유저가 값을 입력한다
// +버튼 클릭시, 할일 추가됨
// delete버튼 클릭시, 할일 삭제됨
// check버튼 클릭시, 할일이 끝나고 밑줄쳐짐
// 1. check 버튼을 클릭하는 순간 false -> true
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 -> 끝난 아이템만, 진행중탭은 -> 진행중인 아이템만
// 전체탭누르면 -> 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  // 할일 생성됬을 시, 나타나는 Tab
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete === true) {
      // 체크버튼 클릭했을 대 Tab
      resultHTML += `<div class="done-task">
      <div class="task-done">${taskList[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${taskList[i].id}')" ><i class="fa-solid fa-rotate-right"></i></button>
        <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
    } else {
      // 체크버튼 클릭하지 않은 Tab
      resultHTML += `<div class="task">
    <div>${taskList[i].taskContent}</div>
    <div>
      <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}
// 할일을 체크했을때 동작하는함수
function toggleComplete(id) {
  // task tab들을 모두순회하며 id를비교
  // 클릭한 id와 일치하는 id를 찾으면
  // isComplete 상태를 반전시킨다 true -> false로
  // break은 반복문을 빠져나온다
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}
// 삭제버튼 클릭시 로직
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
  // console.log(taskList); // 잘동작하는지 console.log에서 체크
}
// 랜덤ID생성기
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
