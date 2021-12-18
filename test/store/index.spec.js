import { mutations, actions, getters } from '@/store/index'

const tasks = [
  { id: 1, title: '食器を洗う', completed: true, important: true },
  { id: 2, title: '洗濯物をする', completed: false, important: false }
]

describe('getters', () => {
  const importantTasks = [tasks[0]]
  const incompletedTasks = [tasks[1]]
  const completedTasks = [tasks[0]]

  it('findTaskById', () => {
    const result = getters.findTaskById({ tasks })(1)
    expect(result).toEqual(tasks[0])
  })

  it('filteredTasks', () => {
    let result

    result = getters.filteredTasks({ tasks, tabNumber: 0 }, { importantTasks, incompletedTasks, completedTasks })
    expect(result).toEqual(tasks)

    result = getters.filteredTasks({ tasks, tabNumber: 1 }, { importantTasks, incompletedTasks, completedTasks })
    expect(result).toEqual(tasks.filter(t => t.important))

    result = getters.filteredTasks({ tasks, tabNumber: 2 }, { importantTasks, incompletedTasks, completedTasks })
    expect(result).toEqual(tasks.filter(t => !t.completed))

    result = getters.filteredTasks({ tasks, tabNumber: 3 }, { importantTasks, incompletedTasks, completedTasks })
    expect(result).toEqual(tasks.filter(t => t.completed))

    result = getters.filteredTasks({ tasks, tabNumber: 100 }, { importantTasks, incompletedTasks, completedTasks })
    expect(result).toEqual(tasks)
  })

  it('importantTasks', () => {
    const result = getters.importantTasks({ tasks })
    expect(result).toEqual(importantTasks)
  })

  it('incompletedTasks', () => {
    const result = getters.incompletedTasks({ tasks })
    expect(result).toEqual(incompletedTasks)
  })

  it('completedTasks', () => {
    const result = getters.completedTasks({ tasks })
    expect(result).toEqual(completedTasks)
  })
})

describe('mutations', () => {
  const state = () => ({
    tasks: [
      { id: 1, title: '食器を洗う', completed: true, important: true },
      { id: 2, title: '洗濯物をする', completed: false, important: false }
    ],
    tabNumber: 0,
    currentId: 2
  })

  let _state
  let toggleTask

  beforeEach(() => {
    _state = state()
    toggleTask = _state.tasks[0]
  })

  it('addTask', () => {
    const task = { title: 'test', completed: false, important: false }
    mutations.addTask(_state, { task })
    expect(_state.tasks.pop()).toEqual(Object.assign(task, { id: 3 }))
  })

  it('toggleCompleted', () => {
    mutations.toggleCompleted(_state, { task: toggleTask })
    expect(_state.tasks[0].completed).toEqual(false)
  })

  it('toggleImportant', () => {
    mutations.toggleImportant(_state, { task: toggleTask })
    expect(_state.tasks[0].important).toEqual(false)
  })

  it('setTabNumber', () => {
    mutations.setTabNumber(_state, { tabNumber: 5 })
    expect(_state.tabNumber).toEqual(5)
  })
})

describe('actions', () => {
  const toggleTask = { id: 1, title: '食器を洗う', completed: true, important: true }

  it('addTask', () => {
    const commit = jest.fn()
    const payload = 'payload'
    actions.addTask({ commit }, payload)
    expect(commit).toHaveBeenCalledWith('addTask', payload)
  })

  it('toggleCompleted', () => {
    const commit = jest.fn()
    const _getters = { findTaskById: jest.fn(id => toggleTask) }
    actions.toggleCompleted({ commit, getters: _getters }, { id: 1 })
    expect(commit).toHaveBeenCalledWith('toggleCompleted', { task: toggleTask })
  })

  it('toggleImportant', () => {
    const commit = jest.fn()
    const _getters = { findTaskById: jest.fn(id => toggleTask) }
    actions.toggleImportant({ commit, getters: _getters }, { id: 1 })
    expect(commit).toHaveBeenCalledWith('toggleImportant', { task: toggleTask })
  })

  it('setTabNumber', () => {
    const commit = jest.fn()
    const payload = { tabNumber: 10 }
    actions.setTabNumber({ commit }, payload)
    expect(commit).toHaveBeenCalledWith('setTabNumber', payload)
  })
})
