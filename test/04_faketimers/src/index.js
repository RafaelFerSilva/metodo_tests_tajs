import Task from "./task.js";

const oneSecound = 1000
const runInSec = new Date(Date.now() + oneSecound)
const runInTwSec = new Date(Date.now() + oneSecound * 2)
const runInThreeSec = new Date(Date.now() + oneSecound * 3)

const task = new Task()

task.save({
  name: 'Task 1',
  dueAt: runInSec,
  fn: () => console.log('task1 executed')
})

task.save({
  name: 'Task 2',
  dueAt: runInTwSec,
  fn: () => console.log('task2 executed')
})

task.save({
  name: 'Task 3',
  dueAt: runInThreeSec,
  fn: () => console.log('task3 executed')
})

task.run(oneSecound)