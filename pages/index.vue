<template>
  <v-container>
    <v-tabs v-model="tab" background-color="grey lighten-4" centered class="grey--text mb-5">
      <v-tab v-for="t of tabs" :key="t.name">
        {{ t.name }}
      </v-tab>
    </v-tabs>

    <v-card flat tile width="700" class="d-flex mx-auto mb-4">
      <v-card-actions class="py-0">
        <v-icon color="primary" @click="addTask">
          mdi-plus
        </v-icon>
      </v-card-actions>

      <v-card-text class="py-0">
        <v-form ref="form" v-model="valid" @submit.prevent>
          <v-text-field v-model="taskTitle" label="タスクを追加する" :rules="rules" @keyup.enter="addTask" />
        </v-form>
      </v-card-text>
    </v-card>

    <v-card
      v-for="task of filteredTasks"
      :key="task.title"
      flat
      tile
      width="700"
      class="d-flex mb-4 mx-auto"
    >
      <v-card-actions>
        <v-icon v-if="task.completed" color="green accent-4" class="c-p">
          mdi-checkbox-marked
        </v-icon>
        <v-icon v-else color="green accent-4" class="c-p">
          mdi-checkbox-blank-outline
        </v-icon>
      </v-card-actions>

      <v-card-title class="text-truncate font-weight-bold text-subtitle-2">
        {{ task.title }}
      </v-card-title>

      <v-spacer />

      <v-card-actions class="text-right">
        <v-icon v-if="task.important" color="red" class="c-p">
          mdi-heart
        </v-icon>
        <v-icon v-else color="red" class="c-p">
          mdi-heart-outline
        </v-icon>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
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
      ],
      tasks: [
        { title: '食器を洗う', completed: true, important: true },
        { title: '洗濯物をする', completed: false, important: false }
      ]
    }
  },
  computed: {
    filteredTasks () {
      switch (this.tab) {
        case 0:
          return this.tasks
        case 1:
          return this.tasks.filter(t => t.important)
        case 2:
          return this.tasks.filter(t => !t.completed)
        case 3:
          return this.tasks.filter(t => t.completed)
      }
      return this.tasks
    }
  },

  methods: {
    addTask () {
      const form = this.$refs.form
      if (form.validate()) {
        this.tasks.push({ title: this.taskTitle, completed: false, important: false })
        this.taskTitle = ''
        this.valid = true
      }
    }
  }
}
</script>
