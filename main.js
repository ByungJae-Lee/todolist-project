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
let tabs = document.querySelectorAll(".task-tabs div"); // querySelectorAll는 조건에 만족하는 모든 것을 가져온다는 것
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];
let doneList = [];

taskInput.addEventListener("keyup", validate); // input 입력시 add버튼 활성화

// 언더바 이벤트
tabs.forEach((menu) =>
  menu.addEventListener("click", (e) => underlineIndicator(e))
);

// enter 입력이벤트
taskInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault(); // 기존의 enter의 효과무효화, enter자체만 누른걸로 만들어줌
    addButton.click(); // 하단 add버튼의 click 실행되는 것과 같게 해줌
  }
});
addButton.addEventListener("click", addTask); // add버튼 클릭이벤트

for (let i = 1; i <= tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);
// add버튼 클릭 후 함수
function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
  taskInput.value = "";
  validate();
}
// render 함수
function render() {
  // 1. 내가 선택한 탭에 따라
  // 2. 리스트를 다르게 보여준다
  // all -> taskList / ongoing, done -> filterList
  let list = [];

  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  let resultHTML = "";
  // 할일 생성됬을 시, 나타나는 Tab
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      // 체크버튼 클릭했을 때 Tab
      resultHTML += `<div class="done-task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')" ><i class="fa-solid fa-rotate-right"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
    } else {
      // 체크버튼 클릭하지 않은 Tab
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
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
// 삭제버튼 함수
function deleteTask(id) {
  // all내에 id를 찾아 삭제
  if (mode === "all") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === id) {
        taskList.splice(i, 1);
        break;
      }
    }
    console.log(taskList);
    render();
  } else if (mode === "ongoing" || mode === "done") {
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].id === id) {
        filterList.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === id) {
        taskList.splice(i, 1);
        break;
      }
    }
  }
  render();

  // console.log(taskList); // 잘동작하는지 console.log에서 체크
}
// filter함수
function filter(event) {
  // console.log("filter", event.target.id); tabs의 모두,진행중, 끝남 클릭 시 id 잘 들어오는지 확인
  mode = event.target.id;
  filterList = [];
  // all일때 -> 전체리스트를 보여준다 -> render를 보여주면 됨
  // ongoing일때 -> 진행중인 items를 보여준다 -> task.isComplete = false
  // done일때 -> 끝난 items를 보여준다 -> task.isComplete = true
  // 모두를 클릭시 나타나는 로직
  if (mode === "all") {
    render();
    // 진행중 클릭시 나타나는 로직
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log(filterList);
    // 끝남 클릭시 나타나는 로직
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    console.log(filterList);
    render();
  }
}

// input입력시 add버튼 활성여부 함수
function validate() {
  if (taskInput.value === "") {
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }
}

// under-line 이동하는 함수
function underlineIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top = e.currentTarget.offsetHeight + "px";
}

// 랜덤ID생성기
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
