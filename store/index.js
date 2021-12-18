export const state = () => ({
  tasks: [
    { id: 1, title: '食器を洗う', completed: true, important: true },
    { id: 2, title: '洗濯物をする', completed: false, important: false }
  ],
  tabNumber: 0
})

export const getters = {
  tasks (state) {
    return state.tasks
  },
  findTaskById (state) {
    return id => state.tasks.find(t => t.id === id)
  },
  filteredTasks (state) {
    switch (state.tabNumber) {
      case 0:
        return state.tasks
      case 1:
        return state.tasks.filter(t => t.important)
      case 2:
        return state.tasks.filter(t => !t.completed)
      case 3:
        return state.tasks.filter(t => t.completed)
      default:
        return state.tasks
    }
  }
}

export const mutations = {
  addTask (state, { task }) {
    state.tasks.push(Object.assign(task, { id: ++state.currentId }))
  },
  toggleCompleted (state, { task }) {
    task.completed = !task.completed
  },
  toggleImportant (state, { task }) {
    task.important = !task.important
  },
  setTabNumber (state, { tabNumber }) {
    state.tabNumber = tabNumber
  }
}

export const actions = {
  addTask ({ commit }, payload) {
    commit('addTask', payload)
  },
  toggleCompleted ({ commit, getters }, { id }) {
    const task = getters.findTaskById(id)
    commit('toggleCompleted', { task })
  },
  toggleImportant ({ commit, getters }, { id }) {
    const task = getters.findTaskById(id)
    commit('toggleImportant', { task })
  },
  setTabNumber ({ commit }, payload) {
    commit('setTabNumber', payload)
  }
}
