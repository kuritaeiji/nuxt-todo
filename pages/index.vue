<template>
  <v-container>
    <v-tabs v-model="tab" background-color="grey lighten-4" centered class="grey--text mb-5">
      <v-tab v-for="t of tabs" :key="t.name">
        {{ t.name }}
      </v-tab>
    </v-tabs>

    <v-card flat tile width="700" class="d-flex mx-auto mb-4">
      <v-card-actions class="py-0">
        <v-icon color="primary" @click="addTaskTemplate">
          mdi-plus
        </v-icon>
      </v-card-actions>

      <v-card-text class="py-0">
        <v-form ref="form" v-model="valid" @submit.prevent>
          <v-text-field v-model="taskTitle" label="タスクを追加する" :rules="rules" @keyup.enter="addTaskTemplate" />
        </v-form>
      </v-card-text>
    </v-card>

    <v-card
      v-for="task of filteredTasks(tab)"
      :key="task.title"
      flat
      tile
      width="700"
      class="d-flex mb-4 mx-auto"
    >
      <v-card-actions>
        <v-icon v-if="task.completed" color="green accent-4" class="c-p" @click="toggleCompletedTemplate(task)">
          mdi-checkbox-marked
        </v-icon>
        <v-icon v-else color="green accent-4" class="c-p" @click="toggleCompletedTemplate(task)">
          mdi-checkbox-blank-outline
        </v-icon>
      </v-card-actions>

      <v-card-title class="text-truncate font-weight-bold text-subtitle-2">
        {{ task.title }}
      </v-card-title>

      <v-spacer />

      <v-card-actions class="text-right">
        <v-icon v-if="task.important" color="red" class="c-p" @click="toggleImportantTemplate(task)">
          mdi-heart
        </v-icon>
        <v-icon v-else color="red" class="c-p" @click="toggleImportantTemplate(task)">
          mdi-heart-outline
        </v-icon>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      tab: 0,
      valid: false,
      rules: [
        v => !!v || 'タスク名を入力して下さい',
        v => v.length <= 20 || '20文字以内で入力して下さい'
      ],
      taskTitle: '',
      tabs: [
        { name: '全て' },
        { name: '重要' },
        { name: '未完了' },
        { name: '完了' }
      ]
    }
  },
  computed: mapGetters(['tasks', 'filteredTasks']),
  methods: {
    ...mapActions(['addTask', 'toggleCompleted', 'toggleImportant']),
    addTaskTemplate () {
      const form = this.$refs.form
      if (form.validate()) {
        this.addTask({
          task: { title: this.taskTitle, completed: false, important: false }
        })
        this.taskTitle = ''
      }
    },
    toggleCompletedTemplate (task) {
      this.toggleCompleted({ id: task.id })
    },
    toggleImportantTemplate (task) {
      this.toggleImportant({ id: task.id })
    }
  }
}
</script>
